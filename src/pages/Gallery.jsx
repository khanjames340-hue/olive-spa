import { useMemo, useState, useCallback } from 'react'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import GalleryCard from '../components/GalleryCard'
import Lightbox from '../components/Lightbox'
import { galleryItems, galleryCategories } from '../data/gallery'

export default function Gallery() {
  const [category, setCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered = useMemo(() => {
    if (category === 'All') return galleryItems
    return galleryItems.filter((g) => g.category === category)
  }, [category])

  const openLightbox = (item) => {
    const idx = filtered.findIndex((g) => g.id === item.id)
    setLightboxIndex(idx)
  }

  const navigate = useCallback(
    (dir) => {
      setLightboxIndex((prev) => {
        if (prev === null) return prev
        const next = prev + dir
        if (next < 0) return filtered.length - 1
        if (next >= filtered.length) return 0
        return next
      })
    },
    [filtered.length]
  )

  return (
    <>
      <SEO
        title="Gallery"
        description="Explore Olive Spa's interiors, treatments, products, team, and results — luxury wellness in Juba."
        path="/gallery"
      />
      <Hero
        title="Gallery"
        subtitle="A glimpse into our serene spaces, expert hands, and radiant results."
        image="https://images.unsplash.com/photo-1596178060883-df480d500b3f?w=1600&q=80"
        showCtas={false}
        height="half"
        brandFirst={false}
      />

      <section className="section-padding bg-beige">
        <div className="container-luxury">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-olive text-white'
                    : 'bg-white text-charcoal-light hover:bg-olive/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {filtered.map((item, i) => (
              <GalleryCard key={item.id} item={item} index={i} onClick={openLightbox} />
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={navigate}
        />
      )}
    </>
  )
}
