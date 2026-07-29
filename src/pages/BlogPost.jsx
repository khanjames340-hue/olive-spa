import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import SEO from '../components/SEO'
import { getPostById } from '../data/blog'
import { formatDate } from '../utils/helpers'

export default function BlogPost() {
  const { id } = useParams()
  const post = getPostById(id)

  if (!post) return <Navigate to="/blog" replace />

  return (
    <>
      <SEO title={post.title} description={post.excerpt} path={`/blog/${post.id}`} />
      <article className="bg-beige pb-24 pt-28 md:pt-32">
        <div className="container-luxury max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-olive hover:text-olive-dark"
          >
            <ArrowLeft size={16} />
            Back to Journal
          </Link>
          <p className="mt-8 text-[11px] font-medium uppercase tracking-widest text-gold-dark">
            {post.category}
          </p>
          <h1 className="mt-3 font-heading text-3xl text-charcoal md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-charcoal-light">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={14} />
              {post.readTime} min read
            </span>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl">
            <img src={post.image} alt={post.title} className="aspect-[16/9] w-full object-cover" />
          </div>
          <div className="prose-olive mt-10 space-y-5 text-base leading-relaxed text-charcoal-light">
            {post.content.split('\n\n').map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
          <div className="mt-12 rounded-2xl bg-olive p-8 text-center text-white">
            <p className="font-heading text-2xl">Ready to experience Olive Spa?</p>
            <Link to="/booking" className="btn-gold mt-5 inline-flex">
              Book Appointment
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
