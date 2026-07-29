import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { formatPrice } from '../utils/helpers'

export default function ServiceCard({ service, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-luxury group flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-olive backdrop-blur-sm">
          {service.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-xl text-charcoal">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-light">
          {service.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-beige-dark/80 pt-5">
          <div className="flex items-center gap-4 text-sm text-charcoal-light">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} className="text-olive" />
              {service.duration} min
            </span>
            <span className="font-medium text-olive">
              {formatPrice(service.price, service.currency)}
            </span>
          </div>
          <Link
            to={`/booking?service=${service.id}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-gold-dark transition-colors hover:text-olive"
          >
            Book Now
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
