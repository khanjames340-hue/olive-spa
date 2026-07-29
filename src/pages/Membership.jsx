import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard } from 'lucide-react'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import MembershipCard from '../components/MembershipCard'
import { memberships } from '../data/memberships'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../utils/helpers'

export default function Membership() {
  const [params] = useSearchParams()
  const highlight = params.get('plan')
  const { updateUser, isAuthenticated } = useAuth()
  const [selected, setSelected] = useState(
    () => memberships.find((m) => m.id === highlight) || null
  )
  const [paid, setPaid] = useState(false)

  const handleSubscribe = (plan) => {
    setSelected(plan)
    setPaid(false)
  }

  const handlePaymentPlaceholder = () => {
    if (isAuthenticated) {
      updateUser({ membership: selected.id })
    }
    setPaid(true)
  }

  return (
    <>
      <SEO
        title="Membership"
        description="Join Olive Essential, Premium, or VIP membership — luxury spa benefits every month in Juba."
        path="/membership"
      />
      <Hero
        title="Membership"
        subtitle="Belong to a community of wellness. Monthly rituals, priority booking, exclusive care."
        image="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1600&q=80"
        showCtas={false}
        height="half"
        brandFirst={false}
      />

      <section className="section-padding bg-beige">
        <div className="container-luxury">
          <div className="grid gap-8 lg:grid-cols-3">
            {memberships.map((plan, i) => (
              <MembershipCard
                key={plan.id}
                plan={plan}
                index={i}
                onSubscribe={handleSubscribe}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/60 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-[var(--shadow-elevated)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                className="absolute right-4 top-4 text-charcoal-light hover:text-charcoal"
                onClick={() => setSelected(null)}
              >
                <X size={20} />
              </button>

              {!paid ? (
                <>
                  <h3 className="font-heading text-2xl text-charcoal">
                    Subscribe to {selected.name}
                  </h3>
                  <p className="mt-2 text-sm text-charcoal-light">
                    {formatPrice(selected.price)}/{selected.period} — payment integration
                    placeholder
                  </p>
                  <div className="mt-6 space-y-3">
                    <input className="input-field" placeholder="Card number" disabled />
                    <div className="grid grid-cols-2 gap-3">
                      <input className="input-field" placeholder="MM/YY" disabled />
                      <input className="input-field" placeholder="CVC" disabled />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handlePaymentPlaceholder}
                    className="btn-primary mt-6 w-full"
                  >
                    <CreditCard size={16} />
                    Complete Subscription
                  </button>
                  <p className="mt-3 text-center text-xs text-charcoal-light">
                    Demo mode — no real payment processed.
                    {!isAuthenticated && (
                      <>
                        {' '}
                        <Link to="/login" className="text-olive underline">
                          Sign in
                        </Link>{' '}
                        to save membership to your account.
                      </>
                    )}
                  </p>
                </>
              ) : (
                <div className="text-center">
                  <p className="font-heading text-2xl text-olive">Welcome to {selected.name}</p>
                  <p className="mt-3 text-sm text-charcoal-light">
                    Your membership is active. Enjoy priority booking and exclusive benefits.
                  </p>
                  <Link to="/dashboard" className="btn-primary mt-6 inline-flex">
                    Go to Dashboard
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
