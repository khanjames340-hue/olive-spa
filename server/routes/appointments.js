const express = require('express')
const crypto = require('crypto')
const rateLimit = require('express-rate-limit')
const { pool } = require('../db')
const config = require('../config')
const { validateBooking, todayIn } = require('../validation')

const router = express.Router()

const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many bookings from this device. Please contact us on WhatsApp.' },
})

// Short, unambiguous booking reference, e.g. OS-7K4QX2
function newReference() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = crypto.randomBytes(6)
  let ref = 'OS-'
  for (const b of bytes) ref += alphabet[b % alphabet.length]
  return ref
}

router.post('/', bookingLimiter, async (req, res, next) => {
  try {
    // Honeypot field: real visitors never see or fill it
    if (req.body.website) {
      return res.status(201).json({ appointment: { reference: newReference(), status: 'pending' } })
    }

    const { data, errors } = validateBooking(req.body, todayIn(config.timezone))
    if (Object.keys(errors).length) {
      return res.status(400).json({ message: 'Please check the booking details.', errors })
    }

    for (let attempt = 0; attempt < 3; attempt++) {
      const reference = newReference()
      try {
        await pool.query(
          `INSERT INTO appointments
            (reference, full_name, phone, phone_key, email, service_id, service_name, price,
             preferred_date, preferred_time, notes)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            reference,
            data.fullName,
            data.phone,
            data.phoneKey,
            data.email || null,
            data.serviceId,
            data.serviceName,
            data.price,
            data.preferredDate,
            data.preferredTime,
            data.notes || null,
          ]
        )
        return res.status(201).json({
          appointment: {
            reference,
            fullName: data.fullName,
            serviceName: data.serviceName,
            preferredDate: data.preferredDate,
            preferredTime: data.preferredTime,
            status: 'pending',
          },
        })
      } catch (err) {
        if (err.code !== 'ER_DUP_ENTRY') throw err
      }
    }
    throw new Error('Could not generate a unique booking reference')
  } catch (err) {
    next(err)
  }
})

module.exports = router
