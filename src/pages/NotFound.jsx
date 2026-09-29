import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" path="/404" />
      <section className="flex min-h-[70vh] items-center bg-beige pt-24">
        <div className="container-luxury text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-dark">404</p>
          <h1 className="mt-4 font-heading text-4xl text-charcoal md:text-5xl">
            This page has drifted away
          </h1>
          <p className="mx-auto mt-4 max-w-md text-charcoal-light">
            The page you’re looking for doesn’t exist or has moved.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn-primary">
              Back Home
            </Link>
            <Link to="/services" className="btn-secondary">
              View Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
