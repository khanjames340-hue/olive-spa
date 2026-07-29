import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  LogOut,
  LayoutDashboard,
  Scissors,
  Tag,
  FileText,
  Check,
  X,
} from 'lucide-react'
import SEO from '../components/SEO'
import DashboardCard from '../components/DashboardCard'
import { useAuth } from '../context/AuthContext'
import { services } from '../data/services'
import { promotions } from '../data/promotions'
import { blogPosts } from '../data/blog'
import { formatDate, formatPrice } from '../utils/helpers'

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'services', label: 'Services', icon: Scissors },
  { id: 'promotions', label: 'Promotions', icon: Tag },
  { id: 'blog', label: 'Blog', icon: FileText },
]

export default function AdminDashboard() {
  const { user, logout, appointments, updateAppointmentStatus, getCustomers } = useAuth()
  const [tab, setTab] = useState('overview')
  const customers = getCustomers()

  const today = new Date().toISOString().split('T')[0]
  const todayAppointments = appointments.filter(
    (a) => a.preferredDate === today && a.status !== 'cancelled'
  )
  const monthlyRevenue = appointments
    .filter((a) => a.status !== 'cancelled')
    .reduce((sum, a) => sum + (a.price || 0), 0)

  const popularServices = useMemo(() => {
    const counts = {}
    appointments.forEach((a) => {
      if (a.serviceName) counts[a.serviceName] = (counts[a.serviceName] || 0) + 1
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
  }, [appointments])

  const [promoForm, setPromoForm] = useState({
    title: '',
    description: '',
    expiryDate: '',
  })
  const [localPromos, setLocalPromos] = useState(promotions)
  const [localPosts] = useState(blogPosts)

  const addPromo = (e) => {
    e.preventDefault()
    if (!promoForm.title.trim()) return
    setLocalPromos((prev) => [
      {
        id: `promo-${Date.now()}`,
        ...promoForm,
        active: true,
        code: promoForm.title.slice(0, 8).toUpperCase().replace(/\s/g, ''),
        image: promotions[0].image,
      },
      ...prev,
    ])
    setPromoForm({ title: '', description: '', expiryDate: '' })
  }

  return (
    <>
      <SEO title="Admin Dashboard" path="/admin" />
      <div className="flex min-h-screen bg-beige">
        <aside className="hidden w-64 shrink-0 border-r border-beige-dark/60 bg-olive-dark text-beige lg:block">
          <div className="p-6">
            <Link to="/" className="font-heading text-2xl text-white">
              Olive Spa
            </Link>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-gold">Admin</p>
          </div>
          <nav className="space-y-1 px-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  tab === t.id
                    ? 'bg-white/10 text-gold'
                    : 'text-beige/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <t.icon size={18} />
                {t.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={logout}
            className="absolute bottom-6 left-6 flex items-center gap-2 text-sm text-beige/60 hover:text-white"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </aside>

        <div className="flex-1">
          <header className="border-b border-beige-dark/60 bg-white">
            <div className="flex h-16 items-center justify-between px-5 lg:px-8">
              <div>
                <h1 className="font-heading text-xl text-charcoal capitalize lg:text-2xl">
                  {tab}
                </h1>
                <p className="text-xs text-charcoal-light">Signed in as {user?.email}</p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="text-sm text-charcoal-light hover:text-olive lg:hidden"
              >
                Sign Out
              </button>
            </div>
            <div className="flex gap-1 overflow-x-auto px-3 pb-3 lg:hidden">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium ${
                    tab === t.id ? 'bg-olive text-white' : 'bg-beige text-charcoal-light'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </header>

          <div className="p-5 lg:p-8">
            {tab === 'overview' && (
              <div className="space-y-8">
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  <DashboardCard
                    title="Total Customers"
                    value={customers.length}
                    icon={Users}
                  />
                  <DashboardCard
                    title="Appointments Today"
                    value={todayAppointments.length}
                    icon={Calendar}
                    accent="gold"
                  />
                  <DashboardCard
                    title="Monthly Revenue"
                    value={formatPrice(monthlyRevenue)}
                    subtitle="From booked appointments"
                    icon={DollarSign}
                  />
                  <DashboardCard
                    title="Popular Services"
                    value={popularServices[0]?.[0]?.split(' ')[0] || '—'}
                    subtitle={
                      popularServices[0]
                        ? `${popularServices[0][1]} bookings`
                        : 'No data yet'
                    }
                    icon={TrendingUp}
                    accent="gold"
                  />
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="card-luxury p-6">
                    <h3 className="font-heading text-lg text-charcoal">
                      Recent Appointments
                    </h3>
                    <div className="mt-4 space-y-3">
                      {appointments.slice(0, 5).map((a) => (
                        <div
                          key={a.id}
                          className="flex items-center justify-between border-b border-beige-dark/50 pb-3 text-sm last:border-0"
                        >
                          <div>
                            <p className="font-medium text-charcoal">{a.fullName}</p>
                            <p className="text-xs text-charcoal-light">
                              {a.serviceName} · {a.preferredDate}
                            </p>
                          </div>
                          <span className="text-xs capitalize text-olive">{a.status}</span>
                        </div>
                      ))}
                      {appointments.length === 0 && (
                        <p className="text-sm text-charcoal-light">No appointments yet.</p>
                      )}
                    </div>
                  </div>
                  <div className="card-luxury p-6">
                    <h3 className="font-heading text-lg text-charcoal">
                      Service Popularity
                    </h3>
                    <div className="mt-4 space-y-3">
                      {popularServices.length === 0 && (
                        <p className="text-sm text-charcoal-light">
                          Bookings will appear here once customers schedule.
                        </p>
                      )}
                      {popularServices.map(([name, count]) => (
                        <div key={name} className="flex justify-between text-sm">
                          <span className="text-charcoal">{name}</span>
                          <span className="font-medium text-olive">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'appointments' && (
              <div className="card-luxury overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-left text-sm">
                    <thead className="bg-beige text-xs uppercase tracking-wider text-charcoal-light">
                      <tr>
                        <th className="px-5 py-4">Guest</th>
                        <th className="px-5 py-4">Service</th>
                        <th className="px-5 py-4">Date / Time</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((a) => (
                        <tr key={a.id} className="border-t border-beige-dark/50">
                          <td className="px-5 py-4">
                            <p className="font-medium text-charcoal">{a.fullName}</p>
                            <p className="text-xs text-charcoal-light">{a.phone}</p>
                          </td>
                          <td className="px-5 py-4">{a.serviceName}</td>
                          <td className="px-5 py-4">
                            {formatDate(a.preferredDate)}
                            <br />
                            <span className="text-xs text-charcoal-light">
                              {a.preferredTime}
                            </span>
                          </td>
                          <td className="px-5 py-4 capitalize">{a.status}</td>
                          <td className="px-5 py-4">
                            <div className="flex gap-2">
                              {a.status === 'pending' && (
                                <button
                                  type="button"
                                  onClick={() => updateAppointmentStatus(a.id, 'confirmed')}
                                  className="rounded-lg bg-olive/10 p-2 text-olive hover:bg-olive/20"
                                  title="Confirm"
                                >
                                  <Check size={16} />
                                </button>
                              )}
                              {a.status !== 'cancelled' && (
                                <button
                                  type="button"
                                  onClick={() => updateAppointmentStatus(a.id, 'cancelled')}
                                  className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                                  title="Cancel"
                                >
                                  <X size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {appointments.length === 0 && (
                    <p className="p-8 text-center text-sm text-charcoal-light">
                      No appointments to manage.
                    </p>
                  )}
                </div>
              </div>
            )}

            {tab === 'customers' && (
              <div className="card-luxury overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-left text-sm">
                    <thead className="bg-beige text-xs uppercase tracking-wider text-charcoal-light">
                      <tr>
                        <th className="px-5 py-4">Name</th>
                        <th className="px-5 py-4">Contact</th>
                        <th className="px-5 py-4">Membership</th>
                        <th className="px-5 py-4">Points</th>
                        <th className="px-5 py-4">Spending</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((c) => (
                        <tr key={c.id} className="border-t border-beige-dark/50">
                          <td className="px-5 py-4 font-medium text-charcoal">{c.name}</td>
                          <td className="px-5 py-4">
                            <p>{c.email}</p>
                            <p className="text-xs text-charcoal-light">{c.phone}</p>
                          </td>
                          <td className="px-5 py-4 capitalize">
                            {c.membership?.replace('olive-', '') || '—'}
                          </td>
                          <td className="px-5 py-4">{c.loyaltyPoints || 0}</td>
                          <td className="px-5 py-4">
                            {formatPrice(c.totalSpending || 0)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === 'services' && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {services.map((s) => (
                  <div key={s.id} className="card-luxury flex gap-4 p-4">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                    <div>
                      <p className="font-medium text-charcoal">{s.name}</p>
                      <p className="text-xs text-charcoal-light">{s.category}</p>
                      <p className="mt-1 text-sm text-olive">
                        {formatPrice(s.price)} · {s.duration} min
                      </p>
                      <span
                        className={`mt-1 inline-block text-[11px] ${
                          s.availability ? 'text-olive' : 'text-red-600'
                        }`}
                      >
                        {s.availability ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'promotions' && (
              <div className="grid gap-8 lg:grid-cols-2">
                <form onSubmit={addPromo} className="card-luxury space-y-4 p-6">
                  <h3 className="font-heading text-lg text-charcoal">Create Promotion</h3>
                  <div>
                    <label className="label-field">Title</label>
                    <input
                      className="input-field"
                      value={promoForm.title}
                      onChange={(e) =>
                        setPromoForm({ ...promoForm, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="label-field">Description</label>
                    <textarea
                      className="input-field resize-none"
                      rows={3}
                      value={promoForm.description}
                      onChange={(e) =>
                        setPromoForm({ ...promoForm, description: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="label-field">Expiry Date</label>
                    <input
                      type="date"
                      className="input-field"
                      value={promoForm.expiryDate}
                      onChange={(e) =>
                        setPromoForm({ ...promoForm, expiryDate: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn-primary">
                    Create Promotion
                  </button>
                </form>
                <div className="space-y-4">
                  {localPromos.map((p) => (
                    <div key={p.id} className="card-luxury p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-charcoal">{p.title}</p>
                          <p className="mt-1 text-sm text-charcoal-light">{p.description}</p>
                          <p className="mt-2 text-xs text-gold-dark">Code: {p.code}</p>
                        </div>
                        <span className="text-[11px] text-charcoal-light">
                          Exp: {p.expiryDate || '—'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'blog' && (
              <div className="space-y-4">
                {localPosts.map((post) => (
                  <div
                    key={post.id}
                    className="card-luxury flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-20 w-full rounded-xl object-cover sm:w-28"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-charcoal">{post.title}</p>
                      <p className="text-xs text-charcoal-light">
                        {post.category} · {formatDate(post.date)} · {post.author}
                      </p>
                    </div>
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-sm text-olive hover:underline"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
