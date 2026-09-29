const express = require('express')
const config = require('./config')
const { pool, initSchema, bootstrapAdmin } = require('./db')

const app = express()
app.disable('x-powered-by')
// Behind cPanel's web server: trust its X-Forwarded-For so rate limits see the visitor's IP
app.set('trust proxy', 1)
app.use(express.json({ limit: '20kb' }))
app.use((req, res, next) => {
  res.set({
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
  })
  next()
})

const api = express.Router()
api.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ status: 'ok' })
  } catch {
    res.status(503).json({ status: 'database unavailable' })
  }
})
api.use('/appointments', require('./routes/appointments'))
api.use('/auth', require('./routes/auth'))
api.use('/admin', require('./routes/admin'))
api.use((req, res) => res.status(404).json({ message: 'Not found.' }))

// cPanel mounts the app at /api; depending on the server it may or may not strip that prefix
app.use('/api', api)
app.use('/', api)

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed' || err.type === 'entity.too.large') {
    return res.status(400).json({ message: 'Invalid request.' })
  }
  console.error('[olive-api]', err)
  res.status(500).json({ message: 'Something went wrong. Please try again.' })
})

async function start() {
  await initSchema()
  await bootstrapAdmin()
  app.listen(config.port, () => {
    console.log(`[olive-api] Listening on port ${config.port}`)
  })
}

// cPanel loads this file through its own wrapper, so start unconditionally (except under tests)
if (process.env.NODE_ENV !== 'test') {
  start().catch((err) => {
    console.error('[olive-api] Failed to start:', err)
    process.exit(1)
  })
}

module.exports = app
