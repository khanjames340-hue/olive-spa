const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

function text(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

// Today's date (YYYY-MM-DD) in the spa's timezone
function todayIn(timezone, now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

function addDays(dateStr, days) {
  const d = new Date(`${dateStr}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

function isRealDate(dateStr) {
  if (!DATE_RE.test(dateStr)) return false
  const d = new Date(`${dateStr}T00:00:00Z`)
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === dateStr
}

function validateBooking(body, today) {
  const errors = {}
  const data = {
    fullName: text(body.fullName, 120),
    phone: text(body.phone, 30),
    email: text(body.email, 190),
    serviceId: text(body.serviceId, 80),
    serviceName: text(body.serviceName, 120),
    preferredDate: text(body.preferredDate, 10),
    preferredTime: text(body.preferredTime, 20),
    notes: text(body.notes, 1000),
    price: Number(body.price),
  }

  if (data.fullName.length < 2) errors.fullName = 'Please enter your full name.'
  if (!PHONE_RE.test(data.phone)) errors.phone = 'Please enter a valid phone number.'
  if (data.email && !EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email.'
  if (!data.serviceId || !data.serviceName) errors.serviceId = 'Please choose a service.'
  if (!data.preferredTime) errors.preferredTime = 'Please choose a time.'
  if (!isRealDate(data.preferredDate)) {
    errors.preferredDate = 'Please choose a date.'
  } else if (data.preferredDate < today) {
    errors.preferredDate = 'Please choose today or a future date.'
  } else if (data.preferredDate > addDays(today, 366)) {
    errors.preferredDate = 'Please choose a date within the next year.'
  }
  if (!Number.isFinite(data.price) || data.price < 0 || data.price > 10000) data.price = 0

  data.phoneKey = data.phone.replace(/\D/g, '')
  return { data, errors }
}

module.exports = { STATUSES, EMAIL_RE, validateBooking, todayIn, addDays, isRealDate }
