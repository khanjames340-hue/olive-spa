import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { formatDate } from '../utils/helpers'

export default function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-luxury relative flex h-full flex-col p-7"
    >
      <Quote size={28} className="mb-4 text-gold/40" />
      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < testimonial.rating ? 'fill-gold text-gold' : 'text-beige-dark'}
          />
        ))}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-charcoal-light">
        &ldquo;{testimonial.review}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-beige-dark/70 pt-5">
        <img
          src={testimonial.photo}
          alt={testimonial.name}
          className="h-11 w-11 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <p className="text-sm font-medium text-charcoal">{testimonial.name}</p>
          <p className="text-xs text-charcoal-light">
            {testimonial.service} · {formatDate(testimonial.date)}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
