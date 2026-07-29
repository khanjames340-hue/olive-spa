import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Calendar, List, DollarSign, MapPin } from 'lucide-react'
import { openWhatsApp, WHATSAPP_TEMPLATES } from '../utils/helpers'

const quickActions = [
  { label: 'Book Appointment', icon: Calendar, message: WHATSAPP_TEMPLATES.book },
  { label: 'View Services', icon: List, message: WHATSAPP_TEMPLATES.services },
  { label: 'Ask About Prices', icon: DollarSign, message: WHATSAPP_TEMPLATES.prices },
  { label: 'Location', icon: MapPin, message: WHATSAPP_TEMPLATES.location },
]

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="w-72 overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-elevated)] sm:w-80"
          >
            <div className="bg-[#075E54] px-4 py-4 text-white">
              <p className="font-heading text-lg">Olive Spa</p>
              <p className="mt-1 text-xs text-white/80">Typically replies within minutes</p>
            </div>
            <div className="space-y-2 bg-[#ECE5DD] p-3">
              <div className="rounded-lg rounded-tl-none bg-white p-3 text-xs leading-relaxed text-charcoal shadow-sm whitespace-pre-line">
                {WHATSAPP_TEMPLATES.welcome}
              </div>
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => {
                    openWhatsApp(action.message)
                    setOpen(false)
                  }}
                  className="flex w-full items-center gap-3 rounded-xl bg-white px-3 py-2.5 text-left text-sm text-charcoal shadow-sm transition hover:bg-beige"
                >
                  <action.icon size={16} className="text-[#25D366]" />
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
      >
        {open ? <X size={24} /> : <MessageCircle size={26} />}
      </motion.button>
    </div>
  )
}
