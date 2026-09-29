const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

function required(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable ${name}`)
  return value
}

const jwtSecret = required('JWT_SECRET')
if (jwtSecret.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters long')
}

module.exports = {
  port: Number(process.env.PORT) || 5000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: required('DB_USER'),
    password: process.env.DB_PASSWORD || '',
    database: required('DB_NAME'),
  },
  jwtSecret,
  jwtExpiresIn: '12h',
  bootstrapAdmin: {
    email: process.env.ADMIN_EMAIL || '',
    password: process.env.ADMIN_PASSWORD || '',
    name: process.env.ADMIN_NAME || 'Olive Spa Admin',
  },
  timezone: process.env.SPA_TIMEZONE || 'Africa/Juba',
}
