import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Check, ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import { packages } from '../data/memberships'
import { formatPrice } from '../utils/helpers'

export default function Packages() {
  return (
    <>
      <SEO
        title="Packages"
        description="Discover curated spa packages at Olive Spa Juba — bridal, weekend escape, executive reset, and couples retreat."
        path="/packages"
      />
      <Hero
        title="Spa Packages"
        subtitle="Curated experiences designed for celebration, recovery, and shared moments of calm."
        image="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"
        showCtas={false}
        height="half"
        brandFirst={false}
      />

      <section className="section-padding bg-beige">
        <div className="container-luxury grid gap-10 md:grid-cols-2">
          {packages.map((pkg, i) => (
            <motion.article
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-luxury flex flex-col overflow-hidden sm:flex-row"
            >
              <div className="aspect-[4/3] sm:aspect-auto sm:w-2/5">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <h3 className="font-heading text-2xl text-charcoal">{pkg.name}</h3>
                <p className="mt-2 text-sm text-charcoal-light">{pkg.description}</p>
                <ul className="mt-5 space-y-2">
                  {pkg.services.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-charcoal">
                      <Check size={16} className="text-olive" />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-end justify-between border-t border-beige-dark/70 pt-5">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-charcoal-light">
                      <Clock size={12} />
                      {pkg.duration} min
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-heading text-2xl text-olive">
                        {formatPrice(pkg.price)}
                      </span>
                      <span className="text-sm text-charcoal-light line-through">
                        {formatPrice(pkg.originalPrice)}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/booking?service=${pkg.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-gold-dark hover:text-olive"
                  >
                    Book
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  )
}
