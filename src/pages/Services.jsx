import { useMemo, useState } from 'react'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import ServiceCard from '../components/ServiceCard'
import { services, serviceCategories } from '../data/services'

export default function Services() {
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    if (category === 'All') return services
    return services.filter((s) => s.category === category)
  }, [category])

  return (
    <>
      <SEO
        title="Services"
        description="Explore massage therapy, facials, body treatments, and beauty services at Olive Spa Juba."
        path="/services"
      />
      <Hero
        title="Our Services"
        subtitle="Premium treatments crafted for restoration, radiance, and lasting wellness."
        image="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1600&q=80"
        showCtas={false}
        height="half"
        brandFirst={false}
      />

      <section className="section-padding bg-beige">
        <div className="container-luxury">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-olive text-white shadow-md'
                    : 'bg-white text-charcoal-light hover:bg-olive/10 hover:text-olive'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
