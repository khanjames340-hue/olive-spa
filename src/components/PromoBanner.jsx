import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Tag, ArrowRight } from 'lucide-react'
import { promotions } from '../data/promotions'

export default function PromoBanner({ promo = promotions[0] }) {
  if (!promo?.active) return null

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden bg-olive"
    >
      <div className="container-luxury flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center md:py-12">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-gold/20 p-3">
            <Tag size={22} className="text-gold" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Limited Offer · Code {promo.code}
            </p>
            <h2 className="mt-1 font-heading text-2xl text-white md:text-3xl">
              {promo.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-beige/80">{promo.description}</p>
          </div>
        </div>
        <Link
          to="/booking"
          className="btn-gold inline-flex shrink-0 items-center gap-2 !px-6"
        >
          Claim Offer
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.section>
  )
}
