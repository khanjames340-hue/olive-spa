import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Send } from 'lucide-react'
import { services } from '../data/services'
import { TIME_SLOTS } from '../data/constants'
import api from '../utils/api'
import {
  validateEmail,
  validatePhone,
  bookingWhatsAppMessage,
  openWhatsApp,
} from '../utils/helpers'

const initial = {
  fullName: '',
  phone: '',
  email: '',
  serviceId: '',
  preferredDate: '',
  preferredTime: '',
  notes: '',
}

export default function BookingForm({ defaultServiceId = '' }) {
  const [form, setForm] = useState({ ...initial, serviceId: defaultServiceId })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [website, setWebsite] = useState('')
  const navigate = useNavigate()

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      next.fullName = 'Please enter your full name.'
    }
    if (!validatePhone(form.phone)) {
      next.phone = 'Please enter a valid phone number.'
    }
    if (!validateEmail(form.email)) {
      next.email = 'Please enter a valid email address.'
    }
    if (!form.serviceId) next.serviceId = 'Please select a service.'
    if (!form.preferredDate) next.preferredDate = 'Please select a date.'
    if (!form.preferredTime) next.preferredTime = 'Please select a time.'
    const selected = new Date(form.preferredDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (form.preferredDate && selected < today) {
      next.preferredDate = 'Please choose a future date.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    if (!validate()) return
    setSubmitting(true)

    const service = services.find((s) => s.id === form.serviceId)
    const booking = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      serviceId: form.serviceId,
      serviceName: service?.name || '',
      price: service?.price || 0,
      preferredDate: form.preferredDate,
      preferredTime: form.preferredTime,
      notes: form.notes.trim(),
      website,
    }

    let appointment
    try {
      ;({ appointment } = await api.createBooking(booking))
    } catch (err) {
      if (err.status === 400 || err.status === 429) {
        if (err.errors) setErrors(err.errors)
        setSubmitError(err.message)
        setSubmitting(false)
        return
      }
      // Booking server unavailable: WhatsApp alone still gets the request to the team
      appointment = {
        fullName: booking.fullName,
        serviceName: booking.serviceName,
        preferredDate: booking.preferredDate,
        preferredTime: booking.preferredTime,
        status: 'pending',
      }
    }

    const whatsappMessage = bookingWhatsAppMessage({
      name: booking.fullName,
      service: booking.serviceName,
      date: booking.preferredDate,
      time: booking.preferredTime,
      phone: booking.phone,
      reference: appointment.reference,
    })
    openWhatsApp(whatsappMessage)
    navigate('/booking/confirmation', { state: { appointment, whatsappMessage } })
  }

  const minDate = new Date().toISOString().split('T')[0]

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="card-luxury space-y-6 p-6 md:p-10"
      noValidate
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="label-field">
            Full Name
          </label>
          <input
            id="fullName"
            className="input-field"
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            placeholder="Your full name"
            autoComplete="name"
          />
          {errors.fullName && (
            <p className="mt-1.5 text-xs text-red-600">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="label-field">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className="input-field"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+211 XXX XXX XXX"
            autoComplete="tel"
          />
          {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className="label-field">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input-field"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="serviceId" className="label-field">
            Choose Service
          </label>
          <select
            id="serviceId"
            className="input-field"
            value={form.serviceId}
            onChange={(e) => update('serviceId', e.target.value)}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — ${s.price}
              </option>
            ))}
          </select>
          {errors.serviceId && (
            <p className="mt-1.5 text-xs text-red-600">{errors.serviceId}</p>
          )}
        </div>
        <div>
          <label htmlFor="preferredDate" className="label-field">
            Preferred Date
          </label>
          <input
            id="preferredDate"
            type="date"
            className="input-field"
            min={minDate}
            value={form.preferredDate}
            onChange={(e) => update('preferredDate', e.target.value)}
          />
          {errors.preferredDate && (
            <p className="mt-1.5 text-xs text-red-600">{errors.preferredDate}</p>
          )}
        </div>
        <div>
          <label htmlFor="preferredTime" className="label-field">
            Preferred Time
          </label>
          <select
            id="preferredTime"
            className="input-field"
            value={form.preferredTime}
            onChange={(e) => update('preferredTime', e.target.value)}
          >
            <option value="">Select a time</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.preferredTime && (
            <p className="mt-1.5 text-xs text-red-600">{errors.preferredTime}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="label-field">
          Additional Notes
        </label>
        <textarea
          id="notes"
          rows={4}
          className="input-field resize-none"
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder="Allergies, preferences, or special requests..."
        />
      </div>

      {/* Hidden from people; catches spam bots that fill every field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {submitError && (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert">
          {submitError}
        </p>
      )}

      <button type="submit" disabled={submitting} className="btn-primary w-full md:w-auto">
        {submitting ? (
          'Sending...'
        ) : (
          <>
            <Calendar size={16} />
            Confirm Booking
            <Send size={14} />
          </>
        )}
      </button>
      <p className="text-xs text-charcoal-light">
        Your booking is sent to our team, and WhatsApp opens so you can message us directly.
      </p>
    </motion.form>
  )
}
