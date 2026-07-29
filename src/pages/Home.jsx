import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Leaf, Heart, Shield } from 'lucide-react'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import ServiceCard from '../components/ServiceCard'
import TestimonialCard from '../components/TestimonialCard'
import MembershipCard from '../components/MembershipCard'
import PromoBanner from '../components/PromoBanner'
import { services } from '../data/services'
import { testimonials } from '../data/testimonials'
import { memberships } from '../data/memberships'
import { SPA_INSTAGRAM } from '../data/constants'

const features = [
  {
    icon: Leaf,
    title: 'Premium Treatments',
    text: 'Curated rituals using professional techniques and luxury products.',
  },
  {
    icon: Heart,
    title: 'Personalized Care',
    text: 'Every visit is tailored to your skin, body, and wellness goals.',
  },
  {
    icon: Shield,
    title: 'Trusted Experts',
    text: 'Skilled therapists dedicated to safety, comfort, and results.',
  },
  {
    icon: Sparkles,
    title: 'Five-Star Atmosphere',
    text: 'A serene sanctuary designed for deep rest and renewal.',
  },
]

const instagramPreview = [
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&q=80',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80',
]

export default function Home() {
  const featured = services.slice(0, 4)

  return (
    <>
      <SEO path="/" />
      <Hero />

      <PromoBanner />

      <section className="section-padding bg-beige">
        <div className="container-luxury">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
              The Olive Experience
            </p>
            <h2 className="mt-3 font-heading text-3xl text-charcoal md:text-4xl lg:text-5xl">
              Luxury wellness in the heart of Juba
            </h2>
            <p className="mt-5 text-charcoal-light">
              At Olive Spa, we believe self-care is essential. Step into a calm, elegant space
              where every detail is crafted for your restoration.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-olive/10 text-olive">
                  <f.icon size={24} />
                </div>
                <h3 className="font-heading text-xl text-charcoal">{f.title}</h3>
                <p className="mt-2 text-sm text-charcoal-light">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
                Signature Services
              </p>
              <h2 className="mt-3 font-heading text-3xl text-charcoal md:text-4xl">
                Treatments that restore
              </h2>
            </div>
            <Link to="/services" className="btn-secondary">
              All Services
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28 md:py-36">
        <img
          src="https://images.unsplash.com/photo-1596178060883-df480d500b3f?w=1600&q=80"
          alt="Olive Spa sanctuary"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-olive-dark/75" />
        <div className="container-luxury relative z-10 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-heading text-3xl text-gold md:text-4xl lg:text-5xl">
              &ldquo;Self-care is essential.&rdquo;
            </p>
            <p className="mt-6 text-beige/80">
              Exceptional beauty and wellness experiences through professional treatments,
              premium products, and personalized attention.
            </p>
            <Link to="/about" className="btn-gold mt-10 inline-flex">
              Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-beige">
        <div className="container-luxury">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
              Membership
            </p>
            <h2 className="mt-3 font-heading text-3xl text-charcoal md:text-4xl">
              Belong to Olive
            </h2>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {memberships.map((plan, i) => (
              <MembershipCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
              Guest Stories
            </p>
            <h2 className="mt-3 font-heading text-3xl text-charcoal md:text-4xl">
              Loved by our community
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-beige">
        <div className="container-luxury">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
                Instagram
              </p>
              <h2 className="mt-3 font-heading text-3xl text-charcoal md:text-4xl">
                @olivespajuba
              </h2>
            </div>
            <a
              href={SPA_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Follow Us
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {instagramPreview.map((src, i) => (
              <motion.a
                key={src}
                href={SPA_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="aspect-square overflow-hidden rounded-xl"
              >
                <img
                  src={src}
                  alt={`Olive Spa Instagram ${i + 1}`}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-olive py-20 text-center">
        <div className="container-luxury">
          <h2 className="font-heading text-3xl text-white md:text-4xl">
            Ready to restore yourself?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-beige/80">
            Book your appointment online or message us on WhatsApp — we make it effortless.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="btn-gold">
              Book Appointment
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full border border-white/30 px-8 py-3.5 text-sm font-medium text-white hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
