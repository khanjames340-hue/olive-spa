import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react'
import {
  SPA_ADDRESS,
  SPA_PHONE,
  SPA_EMAIL,
  SPA_INSTAGRAM,
  OPENING_HOURS,
  NAV_LINKS,
} from '../data/constants'

export default function Footer() {
  return (
    <footer className="bg-olive-dark text-beige">
      <div className="container-luxury section-padding !pb-12 !pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-heading text-3xl text-white">Olive Spa</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.35em] text-gold">
                Luxury · Wellness · Juba
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-beige/70">
              Premium beauty treatments and wellness therapies designed to refresh your body,
              mind, and soul in the heart of Juba.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg text-white">Explore</h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-beige/70 transition-colors hover:text-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg text-white">Visit Us</h4>
            <ul className="mt-5 space-y-4 text-sm text-beige/70">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
                <span>{SPA_ADDRESS}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-gold" />
                <a href={`tel:${SPA_PHONE}`} className="hover:text-gold">
                  {SPA_PHONE}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-gold" />
                <a href={`mailto:${SPA_EMAIL}`} className="hover:text-gold">
                  {SPA_EMAIL}
                </a>
              </li>
              <li className="flex gap-3">
                <Instagram size={18} className="mt-0.5 shrink-0 text-gold" />
                <a
                  href={SPA_INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  @olivespajuba
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg text-white">Hours</h4>
            <ul className="mt-5 space-y-3 text-sm text-beige/70">
              {OPENING_HOURS.map((item) => (
                <li key={item.day} className="flex gap-3">
                  <Clock size={18} className="mt-0.5 shrink-0 text-gold" />
                  <div>
                    <p className="text-beige/90">{item.day}</p>
                    <p>{item.hours}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/booking" className="btn-gold mt-8 inline-flex !px-6 !py-2.5 !text-xs">
              Book Appointment
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-beige/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Olive Spa. All rights reserved.</p>
          <p>Luxury Beauty & Wellness · Juba, South Sudan</p>
        </div>
      </div>
    </footer>
  )
}
