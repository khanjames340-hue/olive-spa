import { useSearchParams } from 'react-router-dom'
import { Phone, Mail, MessageCircle } from 'lucide-react'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import BookingForm from '../components/BookingForm'
import { SPA_PHONE, SPA_EMAIL } from '../data/constants'
import { openWhatsApp, WHATSAPP_TEMPLATES } from '../utils/helpers'

export default function Booking() {
  const [params] = useSearchParams()
  const defaultService = params.get('service') || ''

  return (
    <>
      <SEO
        title="Book Appointment"
        description="Book your Olive Spa appointment online — massage, facial, beauty treatments in Juba."
        path="/booking"
      />
      <Hero
        title="Book Your Visit"
        subtitle="Reserve your preferred treatment. We will confirm via WhatsApp and email."
        image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80"
        showCtas={false}
        height="half"
        brandFirst={false}
      />

      <section className="section-padding bg-beige">
        <div className="container-luxury grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <BookingForm defaultServiceId={defaultService} />
          </div>
          <aside className="space-y-6 lg:col-span-2">
            <div className="card-luxury p-7">
              <h3 className="font-heading text-xl text-charcoal">Prefer to chat?</h3>
              <p className="mt-2 text-sm text-charcoal-light">
                Message us on WhatsApp for quick booking assistance and availability checks.
              </p>
              <button
                type="button"
                onClick={() => openWhatsApp(WHATSAPP_TEMPLATES.book)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-white hover:brightness-95"
              >
                <MessageCircle size={18} />
                WhatsApp Booking
              </button>
            </div>
            <div className="card-luxury space-y-4 p-7">
              <h3 className="font-heading text-xl text-charcoal">Contact</h3>
              <a
                href={`tel:${SPA_PHONE}`}
                className="flex items-center gap-3 text-sm text-charcoal-light hover:text-olive"
              >
                <Phone size={16} className="text-olive" />
                {SPA_PHONE}
              </a>
              <a
                href={`mailto:${SPA_EMAIL}`}
                className="flex items-center gap-3 text-sm text-charcoal-light hover:text-olive"
              >
                <Mail size={16} className="text-olive" />
                {SPA_EMAIL}
              </a>
            </div>
            <div className="rounded-2xl bg-olive p-7 text-white">
              <p className="font-heading text-xl">New here?</p>
              <p className="mt-2 text-sm text-beige/80">
                Enjoy 20% off your first service with code <strong>WELCOME20</strong>.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
