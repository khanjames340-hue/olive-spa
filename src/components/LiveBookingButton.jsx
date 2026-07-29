import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

export default function LiveBookingButton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed bottom-24 right-6 z-40 hidden sm:block"
    >
      <Link
        to="/booking"
        className="inline-flex items-center gap-2 rounded-full bg-olive px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-elevated)] transition hover:bg-olive-dark"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
        </span>
        <Calendar size={16} />
        Live Booking
      </Link>
    </motion.div>
  )
}
