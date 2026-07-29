import { motion } from 'framer-motion'

export default function GalleryCard({ item, index = 0, onClick }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
      onClick={() => onClick?.(item)}
      className="group relative aspect-square overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-olive"
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-[11px] uppercase tracking-widest text-gold">{item.category}</p>
        <p className="font-heading text-lg text-white">{item.title}</p>
      </div>
    </motion.button>
  )
}
