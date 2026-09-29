const express = require('express')
const bcrypt = require('bcryptjs')
const rateLimit = require('express-rate-limit')
const { pool } = require('../db')
const { signToken, requireAdmin } = require('../auth')

const router = express.Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { message: 'Too many sign-in attempts. Please wait 15 minutes and try again.' },
})

// Compared against when the email is unknown, so response time doesn't reveal which emails exist
const DUMMY_HASH = bcrypt.hashSync('olive-spa-dummy-password', 12)

function publicAdmin(row) {
  return { id: row.id, email: row.email, name: row.name }
}

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
    const password = typeof req.body.password === 'string' ? req.body.password : ''

    const [rows] = await pool.query('SELECT * FROM admins WHERE email = ? LIMIT 1', [email])
    const admin = rows[0]
    const valid = await bcrypt.compare(password, admin ? admin.password_hash : DUMMY_HASH)
    if (!admin || !valid) {
      return res.status(401).json({ message: 'Incorrect email or password.' })
    }

    await pool.query('UPDATE admins SET last_login_at = NOW() WHERE id = ?', [admin.id])
    res.json({ token: signToken(admin), admin: publicAdmin(admin) })
  } catch (err) {
    next(err)
  }
})

router.get('/me', requireAdmin, async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT id, email, name FROM admins WHERE id = ?', [req.adminId])
    if (!rows[0]) return res.status(401).json({ message: 'Please sign in.' })
    res.json({ admin: publicAdmin(rows[0]) })
  } catch (err) {
    next(err)
  }
})

router.post('/change-password', requireAdmin, loginLimiter, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    if (typeof newPassword !== 'string' || newPassword.length < 10) {
      return res.status(400).json({ message: 'The new password must be at least 10 characters.' })
    }

    const [rows] = await pool.query('SELECT * FROM admins WHERE id = ?', [req.adminId])
    const admin = rows[0]
    if (!admin || !(await bcrypt.compare(String(currentPassword || ''), admin.password_hash))) {
      return res.status(400).json({ message: 'Your current password is incorrect.' })
    }

    const hash = await bcrypt.hash(newPassword, 12)
    await pool.query('UPDATE admins SET password_hash = ? WHERE id = ?', [hash, admin.id])
    res.json({ message: 'Password updated.' })
  } catch (err) {
    next(err)
  }
})

module.exports = router
