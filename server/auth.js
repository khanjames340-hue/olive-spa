const jwt = require('jsonwebtoken')
const config = require('./config')

function signToken(admin) {
  return jwt.sign({ sub: String(admin.id), email: admin.email }, config.jwtSecret, {
    algorithm: 'HS256',
    expiresIn: config.jwtExpiresIn,
  })
}

function requireAdmin(req, res, next) {
  const header = req.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Please sign in.' })

  try {
    const payload = jwt.verify(token, config.jwtSecret, { algorithms: ['HS256'] })
    req.adminId = Number(payload.sub)
    next()
  } catch {
    res.status(401).json({ message: 'Your session has expired. Please sign in again.' })
  }
}

module.exports = { signToken, requireAdmin }
