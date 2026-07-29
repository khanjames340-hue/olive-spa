import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import { blogPosts } from '../data/blog'
import { formatDate } from '../utils/helpers'

export default function Blog() {
  return (
    <>
      <SEO
        title="Blog"
        description="Skincare tips, beauty advice, wellness insights, and spa lifestyle from Olive Spa Juba."
        path="/blog"
      />
      <Hero
        title="Journal"
        subtitle="Skincare tips, wellness wisdom, and the Olive Spa lifestyle."
        image="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=80"
        showCtas={false}
        height="half"
        brandFirst={false}
      />

      <section className="section-padding bg-beige">
        <div className="container-luxury grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="card-luxury flex flex-col overflow-hidden"
            >
              <Link to={`/blog/${post.id}`} className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[11px] font-medium uppercase tracking-widest text-gold-dark">
                  {post.category}
                </p>
                <Link to={`/blog/${post.id}`}>
                  <h2 className="mt-2 font-heading text-xl text-charcoal transition hover:text-olive">
                    {post.title}
                  </h2>
                </Link>
                <p className="mt-3 flex-1 text-sm text-charcoal-light">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between border-t border-beige-dark/70 pt-4 text-xs text-charcoal-light">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime} min · {formatDate(post.date)}
                  </span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 font-medium text-olive"
                  >
                    Read
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  )
}
