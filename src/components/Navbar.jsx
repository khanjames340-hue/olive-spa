import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Calendar } from 'lucide-react'
import { NAV_LINKS } from '../data/constants'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { user, isAdmin } = useAuth()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const solid = scrolled || !isHome || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-beige/95 shadow-[var(--shadow-soft)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-luxury flex h-20 items-center justify-between lg:h-24">
        <Link to="/" className="group relative z-10 flex flex-col">
          <span
            className={`font-heading text-2xl tracking-wide transition-colors duration-300 lg:text-3xl ${
              solid ? 'text-olive' : 'text-white'
            }`}
          >
            Olive Spa
          </span>
          <span
            className={`text-[10px] font-light uppercase tracking-[0.35em] transition-colors duration-300 ${
              solid ? 'text-gold-dark' : 'text-gold-light'
            }`}
          >
            Juba
          </span>
        </Link>

        <div className="hidden items-center gap-8 xl:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive
                    ? solid
                      ? 'text-olive'
                      : 'text-gold-light'
                    : solid
                      ? 'text-charcoal-light hover:text-olive'
                      : 'text-white/85 hover:text-white'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          {user ? (
            <Link
              to={isAdmin ? '/admin' : '/dashboard'}
              className={`text-sm font-medium transition-colors ${
                solid ? 'text-olive hover:text-olive-dark' : 'text-white hover:text-gold-light'
              }`}
            >
              {isAdmin ? 'Admin' : 'My Account'}
            </Link>
          ) : (
            <Link
              to="/login"
              className={`text-sm font-medium transition-colors ${
                solid ? 'text-olive hover:text-olive-dark' : 'text-white hover:text-gold-light'
              }`}
            >
              Sign In
            </Link>
          )}
          <Link
            to="/booking"
            className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
              solid
                ? 'bg-olive text-white hover:bg-olive-dark'
                : 'bg-white/15 text-white backdrop-blur-sm hover:bg-white/25'
            }`}
          >
            <Calendar size={16} />
            Book Now
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={`relative z-10 rounded-full p-2 xl:hidden ${
            solid ? 'text-olive' : 'text-white'
          }`}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-full border-t border-beige-dark/60 bg-beige/98 backdrop-blur-lg xl:hidden"
          >
            <div className="container-luxury flex flex-col gap-1 py-6">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-base font-medium ${
                      isActive ? 'bg-olive/10 text-olive' : 'text-charcoal hover:bg-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="mt-4 flex flex-col gap-3 border-t border-beige-dark/60 pt-4">
                <Link to="/booking" className="btn-primary w-full">
                  <Calendar size={16} />
                  Book Appointment
                </Link>
                <Link
                  to={user ? (isAdmin ? '/admin' : '/dashboard') : '/login'}
                  className="btn-secondary w-full"
                >
                  {user ? (isAdmin ? 'Admin Dashboard' : 'My Account') : 'Sign In'}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
