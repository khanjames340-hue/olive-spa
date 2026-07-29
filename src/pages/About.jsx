import { motion } from 'framer-motion'
import { Target, Eye, Heart, Award, Users, Leaf } from 'lucide-react'
import SEO from '../components/SEO'
import Hero from '../components/Hero'

const values = [
  {
    icon: Heart,
    title: 'Care',
    text: 'Every guest is treated with warmth, respect, and genuine attention.',
  },
  {
    icon: Award,
    title: 'Excellence',
    text: 'We uphold international standards in every treatment and touchpoint.',
  },
  {
    icon: Leaf,
    title: 'Wellness',
    text: 'True beauty begins with balance — body, mind, and spirit.',
  },
  {
    icon: Users,
    title: 'Trust',
    text: 'Professionalism and discretion form the foundation of our relationships.',
  },
]

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Discover the story, mission, and values behind Olive Spa — Juba's luxury beauty and wellness destination."
        path="/about"
      />
      <Hero
        title="Our Story"
        subtitle="A sanctuary of elegance and restoration in the heart of Juba."
        image="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1600&q=80"
        showCtas={false}
        height="half"
        brandFirst={false}
      />

      <section className="section-padding bg-beige">
        <div className="container-luxury grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
              Who We Are
            </p>
            <h2 className="mt-3 font-heading text-3xl text-charcoal md:text-4xl">
              Olive Spa
            </h2>
            <p className="mt-6 leading-relaxed text-charcoal-light">
              At Olive Spa, we believe self-care is essential. Our goal is to provide exceptional
              beauty and wellness experiences through professional treatments, premium products,
              and personalized attention.
            </p>
            <p className="mt-4 leading-relaxed text-charcoal-light">
              Inspired by the world&apos;s finest spas in Dubai, Bali, and Europe, we bring that
              same standard of luxury to South Sudan — elegant spaces, skilled therapists, and
              rituals that leave you renewed.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
          >
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80"
              alt="Olive Spa interior"
              className="aspect-[4/3] w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-luxury grid gap-10 md:grid-cols-2">
          <div className="card-luxury p-8 md:p-10">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-olive/10 text-olive">
              <Target size={22} />
            </div>
            <h3 className="font-heading text-2xl text-charcoal">Mission</h3>
            <p className="mt-4 leading-relaxed text-charcoal-light">
              To deliver premium beauty and wellness experiences that restore body, mind, and
              soul — making world-class self-care accessible in Juba with warmth, skill, and
              integrity.
            </p>
          </div>
          <div className="card-luxury p-8 md:p-10">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
              <Eye size={22} />
            </div>
            <h3 className="font-heading text-2xl text-charcoal">Vision</h3>
            <p className="mt-4 leading-relaxed text-charcoal-light">
              To be East Africa&apos;s most trusted luxury spa brand — a destination where
              professionals, brides, travelers, and wellness seekers find lasting transformation.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-beige">
        <div className="container-luxury">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
              What Guides Us
            </p>
            <h2 className="mt-3 font-heading text-3xl text-charcoal md:text-4xl">Our Values</h2>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-olive shadow-[var(--shadow-soft)]">
                  <v.icon size={24} />
                </div>
                <h3 className="font-heading text-xl text-charcoal">{v.title}</h3>
                <p className="mt-2 text-sm text-charcoal-light">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
