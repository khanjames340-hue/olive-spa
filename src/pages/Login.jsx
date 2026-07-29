import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { useAuth } from '../context/AuthContext'
import { validateEmail } from '../utils/helpers'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })
  const [error, setError] = useState('')
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/dashboard'

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(form.email) || form.password.length < 6) {
      setError('Enter a valid email and password (min 6 characters).')
      return
    }

    if (mode === 'login') {
      const result = login({ email: form.email, password: form.password })
      if (!result.success) {
        setError(result.error)
        return
      }
      navigate(result.user.role === 'admin' ? '/admin' : from)
    } else {
      if (!form.name.trim() || !form.phone.trim()) {
        setError('Please provide your name and phone number.')
        return
      }
      const result = register(form)
      if (!result.success) {
        setError(result.error)
        return
      }
      navigate('/dashboard')
    }
  }

  return (
    <>
      <SEO title={mode === 'login' ? 'Sign In' : 'Create Account'} path="/login" />
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
            <h1 className="mt-6 text-center font-heading text-2xl text-charcoal">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="mt-2 text-center text-sm text-charcoal-light">
              Manage bookings, membership & loyalty points
            </p>

            <div className="mt-6 flex rounded-full bg-beige p-1">
              <button
                type="button"
                onClick={() => {
                  setMode('login')
                  setError('')
                }}
                className={`flex-1 rounded-full py-2.5 text-sm font-medium transition ${
                  mode === 'login' ? 'bg-olive text-white' : 'text-charcoal-light'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register')
                  setError('')
                }}
                className={`flex-1 rounded-full py-2.5 text-sm font-medium transition ${
                  mode === 'register' ? 'bg-olive text-white' : 'text-charcoal-light'
                }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              {mode === 'register' && (
                <>
                  <div>
                    <label className="label-field" htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      className="input-field"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-field" htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      className="input-field"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </>
              )}
              <div>
                <label className="label-field" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className="input-field"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
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
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
              </div>
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button type="submit" className="btn-primary w-full">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 rounded-xl bg-beige p-4 text-xs text-charcoal-light">
              <p className="font-medium text-charcoal">Demo accounts</p>
              <p className="mt-1">Customer: amina@example.com / customer123</p>
              <p>Admin: admin@olivespa.ss / admin123</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
