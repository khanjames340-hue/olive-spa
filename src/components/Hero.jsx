import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero({
  title = 'Relax. Restore. Rejuvenate.',
  subtitle = 'Experience premium beauty treatments and wellness therapies designed to refresh your body, mind, and soul.',
  image = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80',
  showCtas = true,
  height = 'fullscreen',
  brandFirst = true,
}) {
  const heightClass =
    height === 'fullscreen' ? 'min-h-screen' : 'min-h-[55vh] md:min-h-[60vh]'

  return (
    <section className={`relative flex ${heightClass} items-end overflow-hidden`}>
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Olive Spa luxury wellness"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="gradient-overlay absolute inset-0" />
      </div>

      <div className="container-luxury relative z-10 pb-20 pt-32 md:pb-28 lg:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {brandFirst && (
            <p className="mb-4 font-heading text-3xl text-gold-light md:text-4xl lg:text-5xl">
              Olive Spa
            </p>
          )}
          <h1 className="font-heading text-4xl leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            {subtitle}
          </p>
          {showCtas && (
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/booking" className="btn-gold">
                Book Appointment
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-3.5 text-sm font-medium tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                View Services
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
