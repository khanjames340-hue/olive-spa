import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Calendar, ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import { formatDate } from '../utils/helpers'

export default function BookingConfirmation() {
  const { state } = useLocation()
  const appointment = state?.appointment

  return (
    <>
      <SEO title="Booking Confirmed" path="/booking/confirmation" />
      <section className="flex min-h-screen items-center bg-beige py-28">
        <div className="container-luxury mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-luxury p-8 text-center md:p-12"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-olive/10 text-olive">
              <CheckCircle size={36} />
            </div>
            <h1 className="font-heading text-3xl text-charcoal md:text-4xl">
              Booking Received
            </h1>
            <p className="mt-4 text-charcoal-light">
              Thank you for choosing Olive Spa. Your request has been sent via WhatsApp and
              queued for email confirmation. Our team will confirm shortly.
            </p>

            {appointment && (
              <div className="mt-8 rounded-xl bg-beige p-6 text-left text-sm">
                <div className="mb-3 flex items-center gap-2 font-medium text-olive">
                  <Calendar size={16} />
                  Appointment Details
                </div>
                <dl className="space-y-2 text-charcoal-light">
                  <div className="flex justify-between gap-4">
                    <dt>Name</dt>
                    <dd className="font-medium text-charcoal">{appointment.fullName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Service</dt>
                    <dd className="font-medium text-charcoal">{appointment.serviceName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Date</dt>
                    <dd className="font-medium text-charcoal">
                      {formatDate(appointment.preferredDate)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Time</dt>
                    <dd className="font-medium text-charcoal">{appointment.preferredTime}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Status</dt>
                    <dd className="font-medium capitalize text-gold-dark">
                      {appointment.status}
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/services" className="btn-primary">
                Explore Services
              </Link>
              <Link to="/" className="btn-secondary">
                Back Home
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
