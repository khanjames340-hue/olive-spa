import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Crown } from 'lucide-react'
import { formatPrice } from '../utils/helpers'

export default function MembershipCard({ plan, index = 0, onSubscribe }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col rounded-2xl p-8 transition-shadow duration-500 ${
        plan.featured
          ? 'bg-olive text-white shadow-[var(--shadow-elevated)] ring-2 ring-gold'
          : 'card-luxury bg-white'
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gold px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-charcoal">
          <Crown size={12} />
          Most Popular
        </span>
      )}
      <div>
        <h3
          className={`font-heading text-2xl ${plan.featured ? 'text-white' : 'text-charcoal'}`}
        >
          {plan.name}
        </h3>
        <p
          className={`mt-2 text-sm ${plan.featured ? 'text-beige/80' : 'text-charcoal-light'}`}
        >
          {plan.tagline}
        </p>
      </div>
      <div className="mt-6 flex items-baseline gap-1">
        <span className={`font-heading text-4xl ${plan.featured ? 'text-gold' : 'text-olive'}`}>
          {formatPrice(plan.price, plan.currency)}
        </span>
        <span className={`text-sm ${plan.featured ? 'text-beige/70' : 'text-charcoal-light'}`}>
          /{plan.period}
        </span>
      </div>
      <ul className="mt-8 flex-1 space-y-3">
        {plan.benefits.map((benefit) => (
          <li key={benefit} className="flex gap-3 text-sm">
            <Check
              size={18}
              className={`mt-0.5 shrink-0 ${plan.featured ? 'text-gold' : 'text-olive'}`}
            />
            <span className={plan.featured ? 'text-beige/90' : 'text-charcoal-light'}>
              {benefit}
            </span>
          </li>
        ))}
      </ul>
      {onSubscribe ? (
        <button
          type="button"
          onClick={() => onSubscribe(plan)}
          className={`mt-8 w-full rounded-full py-3.5 text-sm font-medium transition-all ${
            plan.featured
              ? 'bg-gold text-charcoal hover:bg-gold-light'
              : 'bg-olive text-white hover:bg-olive-dark'
          }`}
        >
          Subscribe
        </button>
      ) : (
        <Link
          to={`/membership?plan=${plan.id}`}
          className={`mt-8 block w-full rounded-full py-3.5 text-center text-sm font-medium transition-all ${
            plan.featured
              ? 'bg-gold text-charcoal hover:bg-gold-light'
              : 'bg-olive text-white hover:bg-olive-dark'
          }`}
        >
          Subscribe
        </Link>
      )}
    </motion.article>
  )
}
