import { useState } from 'react'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { useAuth } from '../context/AuthContext'
import { validateEmail } from '../utils/helpers'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login, isAdmin, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.startsWith('/admin') ? location.state.from : '/admin'

  if (!loading && isAdmin) return <Navigate to={from} replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(form.email) || !form.password) {
      setError('Enter your email and password.')
      return
    }

    setSubmitting(true)
    try {
      await login(form)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEO title="Staff Sign In" path="/admin/login" />
      <section className="flex min-h-screen items-center bg-beige py-28">
        <div className="container-luxury mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-luxury p-8 md:p-10"
          >
            <Link to="/" className="block text-center">
              <span className="font-heading text-3xl text-olive">Olive Spa</span>
            </Link>
            <h1 className="mt-6 text-center font-heading text-2xl text-charcoal">Staff sign in</h1>
            <p className="mt-2 text-center text-sm text-charcoal-light">
              Manage bookings and customers
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
              <div>
                <label className="label-field" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className="input-field"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="label-field" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="input-field"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  autoComplete="current-password"
                />
              </div>
              {error && (
                <p className="text-xs text-red-600" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                {submitting ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-charcoal-light">
              <Link to="/" className="hover:text-olive">
                ← Back to the website
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
