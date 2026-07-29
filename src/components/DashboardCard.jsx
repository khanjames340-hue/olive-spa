import { motion } from 'framer-motion'

export default function DashboardCard({ title, value, subtitle, icon: Icon, accent = 'olive' }) {
  const accents = {
    olive: 'bg-olive/10 text-olive',
    gold: 'bg-gold/15 text-gold-dark',
    beige: 'bg-beige-dark text-charcoal',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-luxury flex items-start gap-4 p-6"
    >
      {Icon && (
        <div className={`rounded-xl p-3 ${accents[accent] || accents.olive}`}>
          <Icon size={22} />
        </div>
      )}
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-charcoal-light">
          {title}
        </p>
        <p className="mt-1 font-heading text-3xl text-charcoal">{value}</p>
        {subtitle && <p className="mt-1 text-xs text-charcoal-light">{subtitle}</p>}
      </div>
    </motion.div>
  )
}
