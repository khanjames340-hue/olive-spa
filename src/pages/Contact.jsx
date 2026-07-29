import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import TestimonialCard from '../components/TestimonialCard'
import {
  SPA_ADDRESS,
  SPA_PHONE,
  SPA_EMAIL,
  SPA_MAPS_EMBED,
  OPENING_HOURS,
} from '../data/constants'
import { testimonials } from '../data/testimonials'
import { openWhatsApp, WHATSAPP_TEMPLATES, validateEmail } from '../utils/helpers'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !validateEmail(form.email) || !form.message.trim()) {
      setError('Please fill in all fields with a valid email.')
      return
    }
    setError('')
    console.info('[Olive Spa] Contact form:', form)
    setSent(true)
  }

  return (
    <>
      <SEO
        title="Contact"
        description="Visit Olive Spa in Juba — location, opening hours, phone, and Google Maps. Get in touch today."
        path="/contact"
      />
      <Hero
        title="Contact"
        subtitle="We would love to welcome you. Reach out or visit us in Juba."
        image="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1600&q=80"
        showCtas={false}
        height="half"
        brandFirst={false}
      />

      <section className="section-padding bg-beige">
        <div className="container-luxury grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl text-charcoal">Get in Touch</h2>
            <ul className="mt-8 space-y-5">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 shrink-0 text-olive" size={20} />
                <div>
                  <p className="font-medium text-charcoal">Location</p>
                  <p className="text-sm text-charcoal-light">{SPA_ADDRESS}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-0.5 shrink-0 text-olive" size={20} />
                <div>
                  <p className="font-medium text-charcoal">Phone</p>
                  <a href={`tel:${SPA_PHONE}`} className="text-sm text-charcoal-light hover:text-olive">
                    {SPA_PHONE}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-0.5 shrink-0 text-olive" size={20} />
                <div>
                  <p className="font-medium text-charcoal">Email</p>
                  <a href={`mailto:${SPA_EMAIL}`} className="text-sm text-charcoal-light hover:text-olive">
                    {SPA_EMAIL}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-0.5 shrink-0 text-olive" size={20} />
                <div>
                  <p className="font-medium text-charcoal">Opening Hours</p>
                  {OPENING_HOURS.map((h) => (
                    <p key={h.day} className="text-sm text-charcoal-light">
                      {h.day}: {h.hours}
                    </p>
                  ))}
                </div>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => openWhatsApp(WHATSAPP_TEMPLATES.welcome)}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </button>
          </div>

          <div className="card-luxury p-7 md:p-9">
            {sent ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
                <p className="font-heading text-2xl text-olive">Message Sent</p>
                <p className="mt-3 text-sm text-charcoal-light">
                  Thank you — we will respond within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="c-name" className="label-field">Name</label>
                  <input
                    id="c-name"
                    className="input-field"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="label-field">Email</label>
                  <input
                    id="c-email"
                    type="email"
                    className="input-field"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="c-message" className="label-field">Message</label>
                  <textarea
                    id="c-message"
                    rows={5}
                    className="input-field resize-none"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                {error && <p className="text-xs text-red-600">{error}</p>}
                <button type="submit" className="btn-primary">
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white pb-20">
        <div className="container-luxury">
          <h2 className="mb-6 font-heading text-2xl text-charcoal">Find Us on the Map</h2>
          <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
            <iframe
              title="Olive Spa location map"
              src={SPA_MAPS_EMBED}
              className="h-80 w-full border-0 md:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="mt-3 text-xs text-charcoal-light">
            Google Business Profile ready — update the embed URL with your exact pin when live.
          </p>
        </div>
      </section>

      <section className="section-padding bg-beige">
        <div className="container-luxury">
          <h2 className="text-center font-heading text-3xl text-charcoal">Guest Reviews</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
