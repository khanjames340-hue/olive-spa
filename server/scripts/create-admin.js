// Create an admin, or reset an existing admin's password.
// Usage: node scripts/create-admin.js <email> <password> [name]
const bcrypt = require('bcryptjs')
const { pool, initSchema } = require('../db')
const { EMAIL_RE } = require('../validation')

async function main() {
  const [email, password, name = 'Olive Spa Admin'] = process.argv.slice(2)
  if (!email || !EMAIL_RE.test(email) || !password || password.length < 10) {
    console.error('Usage: node scripts/create-admin.js <email> <password (10+ characters)> [name]')
    process.exitCode = 1
    return
  }

  await initSchema()
  const hash = await bcrypt.hash(password, 12)
  await pool.query(
    `INSERT INTO admins (email, name, password_hash) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), name = VALUES(name)`,
    [email.trim().toLowerCase(), name, hash]
  )
  console.log(`Admin ${email} is ready.`)
}

main()
  .catch((err) => {
    console.error(err.message)
    process.exitCode = 1
  })
  .finally(() => pool.end())
