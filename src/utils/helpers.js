import { WHATSAPP_NUMBER } from '../data/constants'

export function buildWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}

export function bookingWhatsAppMessage({ name, service, date, time, phone }) {
  return `Hello Olive Spa, I would like to book an appointment.

Name: ${name}
Service: ${service}
Date: ${date}
Time: ${time}
Phone: ${phone}`
}

export function openWhatsApp(message) {
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
}

export const WHATSAPP_TEMPLATES = {
  welcome: `Welcome to Olive Spa 🌿

Thank you for contacting us.

How can we help you today?

1. Book Appointment
2. View Services
3. Ask About Prices
4. Location`,
  book: 'Hello Olive Spa, I would like to book an appointment. Please share available times.',
  services: 'Hello Olive Spa, I would like to view your services and treatments.',
  prices: 'Hello Olive Spa, could you please share your price list?',
  location: 'Hello Olive Spa, could you please share your location and opening hours?',
}

export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePhone(phone) {
  return /^[+]?[\d\s()-]{7,20}$/.test(phone)
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
