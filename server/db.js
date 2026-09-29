const mysql = require('mysql2/promise')
const bcrypt = require('bcryptjs')
const config = require('./config')

const pool = mysql.createPool({
  ...config.db,
  waitForConnections: true,
  connectionLimit: 5,
  // Keep DATE/DATETIME values as plain strings so dates never shift with the server's timezone
  dateStrings: true,
  charset: 'utf8mb4',
})

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS admins (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(190) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login_at DATETIME NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS appointments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(12) NOT NULL UNIQUE,
    full_name VARCHAR(120) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    phone_key VARCHAR(30) NOT NULL,
    email VARCHAR(190) NULL,
    service_id VARCHAR(80) NOT NULL,
    service_name VARCHAR(120) NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    preferred_date DATE NOT NULL,
    preferred_time VARCHAR(20) NOT NULL,
    notes TEXT NULL,
    status ENUM('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_date (preferred_date),
    INDEX idx_phone_key (phone_key)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
]

async function initSchema() {
  for (const statement of SCHEMA) {
    await pool.query(statement)
  }
}

// Creates the first admin from ADMIN_EMAIL / ADMIN_PASSWORD, only while no admin exists
async function bootstrapAdmin() {
  const { email, password, name } = config.bootstrapAdmin
  const [[{ count }]] = await pool.query('SELECT COUNT(*) AS count FROM admins')
  if (count > 0) return
  if (!email || !password) {
    console.warn('[olive-api] No admin account exists. Set ADMIN_EMAIL and ADMIN_PASSWORD to create one.')
    return
  }
  if (password.length < 10) {
    console.warn('[olive-api] ADMIN_PASSWORD must be at least 10 characters; admin not created.')
    return
  }
  const hash = await bcrypt.hash(password, 12)
  await pool.query('INSERT INTO admins (email, name, password_hash) VALUES (?, ?, ?)', [
    email.trim().toLowerCase(),
    name,
    hash,
  ])
  console.log(`[olive-api] Created admin account ${email}`)
}

module.exports = { pool, initSchema, bootstrapAdmin }
