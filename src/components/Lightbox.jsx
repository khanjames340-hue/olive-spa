import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ items, index, onClose, onNavigate }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate(-1)
      if (e.key === 'ArrowRight') onNavigate(1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onNavigate])

  if (index === null || !items[index]) return null
  const item = items[index]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <button
          type="button"
          aria-label="Close"
          className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X size={22} />
        </button>
        <button
          type="button"
          aria-label="Previous"
          className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 md:left-8"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(-1)
          }}
        >
          <ChevronLeft size={28} />
        </button>
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative max-h-[85vh] max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[80vh] w-auto rounded-xl object-contain"
          />
          <div className="mt-4 text-center text-white">
            <p className="text-xs uppercase tracking-widest text-gold">{item.category}</p>
            <p className="font-heading text-xl">{item.title}</p>
          </div>
        </motion.div>
        <button
          type="button"
          aria-label="Next"
          className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 md:right-8"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(1)
          }}
        >
          <ChevronRight size={28} />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
