const express = require('express')
const { pool } = require('../db')
const config = require('../config')
const { requireAdmin } = require('../auth')
const { STATUSES, todayIn, addDays, isRealDate } = require('../validation')

const router = express.Router()
router.use(requireAdmin)

const PAGE_SIZE = 25

function toAppointment(row) {
  return {
    id: row.id,
    reference: row.reference,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email,
    serviceId: row.service_id,
    serviceName: row.service_name,
    price: Number(row.price),
    preferredDate: row.preferred_date,
    preferredTime: row.preferred_time,
    notes: row.notes,
    status: row.status,
    // Epoch seconds from MySQL, so the time is correct whatever the server's timezone
    createdAt: new Date(Number(row.created_ts) * 1000).toISOString(),
  }
}

router.get('/stats', async (req, res, next) => {
  try {
    const today = todayIn(config.timezone)
    const monthStart = `${today.slice(0, 8)}01`
    const nextWeek = addDays(today, 7)

    const [[counts]] = await pool.query(
      `SELECT
         COUNT(*) AS total,
         COALESCE(SUM(status = 'pending'), 0) AS pending,
         COALESCE(SUM(preferred_date = ? AND status <> 'cancelled'), 0) AS today,
         COALESCE(SUM(preferred_date BETWEEN ? AND ? AND status IN ('pending','confirmed')), 0) AS upcoming,
         COUNT(DISTINCT phone_key) AS customers,
         COALESCE(SUM(CASE WHEN status = 'completed' AND preferred_date >= ? THEN price END), 0) AS revenue_month
       FROM appointments`,
      [today, today, nextWeek, monthStart]
    )

    const [popular] = await pool.query(
      `SELECT service_name AS name, COUNT(*) AS count
       FROM appointments
       WHERE status <> 'cancelled' AND created_at >= DATE_SUB(NOW(), INTERVAL 90 DAY)
       GROUP BY service_name
       ORDER BY count DESC
       LIMIT 5`
    )

    const [recent] = await pool.query('SELECT *, UNIX_TIMESTAMP(created_at) AS created_ts FROM appointments ORDER BY created_at DESC, id DESC LIMIT 5')

    res.json({
      today,
      totals: {
        bookings: Number(counts.total),
        pending: Number(counts.pending),
        today: Number(counts.today),
        upcomingWeek: Number(counts.upcoming),
        customers: Number(counts.customers),
        revenueThisMonth: Number(counts.revenue_month),
      },
      popularServices: popular.map((p) => ({ name: p.name, count: Number(p.count) })),
      recent: recent.map(toAppointment),
    })
  } catch (err) {
    next(err)
  }
})

router.get('/appointments', async (req, res, next) => {
  try {
    const where = []
    const params = []

    const status = String(req.query.status || '')
    if (STATUSES.includes(status)) {
      where.push('status = ?')
      params.push(status)
    }

    const q = String(req.query.q || '').trim().slice(0, 100)
    if (q) {
      const like = `%${q}%`
      where.push('(full_name LIKE ? OR phone LIKE ? OR email LIKE ? OR reference LIKE ? OR service_name LIKE ?)')
      params.push(like, like, like, like, like)
    }

    const date = String(req.query.date || '')
    if (isRealDate(date)) {
      where.push('preferred_date = ?')
      params.push(date)
    }

    const order =
      req.query.sort === 'date'
        ? 'preferred_date ASC, preferred_time ASC, id ASC'
        : 'created_at DESC, id DESC'
    const page = Math.max(1, Math.floor(Number(req.query.page)) || 1)
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : ''

    const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM appointments ${whereSql}`, params)
    const [rows] = await pool.query(
      `SELECT *, UNIX_TIMESTAMP(created_at) AS created_ts FROM appointments ${whereSql} ORDER BY ${order} LIMIT ? OFFSET ?`,
      [...params, PAGE_SIZE, (page - 1) * PAGE_SIZE]
    )

    res.json({ items: rows.map(toAppointment), total: Number(total), page, pageSize: PAGE_SIZE })
  } catch (err) {
    next(err)
  }
})

router.patch('/appointments/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { status } = req.body
    if (!Number.isInteger(id) || !STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Invalid appointment or status.' })
    }

    const [result] = await pool.query('UPDATE appointments SET status = ? WHERE id = ?', [status, id])
    if (!result.affectedRows) return res.status(404).json({ message: 'Appointment not found.' })

    const [rows] = await pool.query('SELECT *, UNIX_TIMESTAMP(created_at) AS created_ts FROM appointments WHERE id = ?', [id])
    res.json({ appointment: toAppointment(rows[0]) })
  } catch (err) {
    next(err)
  }
})

// Customers are grouped by phone number, since guests book without an account
router.get('/customers', async (req, res, next) => {
  try {
    const q = String(req.query.q || '').trim().slice(0, 100)
    const like = `%${q}%`
    const [rows] = await pool.query(
      `SELECT
         phone_key,
         SUBSTRING_INDEX(GROUP_CONCAT(full_name ORDER BY created_at DESC SEPARATOR '\\n'), '\\n', 1) AS name,
         SUBSTRING_INDEX(GROUP_CONCAT(phone ORDER BY created_at DESC SEPARATOR '\\n'), '\\n', 1) AS phone,
         SUBSTRING_INDEX(GROUP_CONCAT(email ORDER BY created_at DESC SEPARATOR '\\n'), '\\n', 1) AS email,
         COUNT(*) AS bookings,
         COALESCE(SUM(status = 'completed'), 0) AS visits,
         COALESCE(SUM(CASE WHEN status = 'completed' THEN price END), 0) AS spent,
         MAX(preferred_date) AS last_date
       FROM appointments
       ${q ? 'WHERE full_name LIKE ? OR phone LIKE ? OR email LIKE ?' : ''}
       GROUP BY phone_key
       ORDER BY MAX(created_at) DESC
       LIMIT 500`,
      q ? [like, like, like] : []
    )

    res.json({
      items: rows.map((r) => ({
        key: r.phone_key,
        name: r.name,
        phone: r.phone,
        email: r.email || null,
        bookings: Number(r.bookings),
        visits: Number(r.visits),
        spent: Number(r.spent),
        lastDate: r.last_date,
      })),
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
