import { Link } from 'react-router-dom'
import {
  Calendar,
  Crown,
  Gift,
  LogOut,
  Plus,
  Star,
  User,
  XCircle,
} from 'lucide-react'
import SEO from '../components/SEO'
import DashboardCard from '../components/DashboardCard'
import { useAuth } from '../context/AuthContext'
import { memberships } from '../data/memberships'
import { loyaltyRewards } from '../data/promotions'
import { formatDate, formatPrice } from '../utils/helpers'

export default function CustomerDashboard() {
  const { user, logout, appointments, cancelAppointment } = useAuth()

  const myAppointments = appointments.filter(
    (a) => a.userId === user?.id || a.email === user?.email
  )
  const upcoming = myAppointments.filter((a) => a.status !== 'cancelled')
  const membership = memberships.find((m) => m.id === user?.membership)

  return (
    <>
      <SEO title="My Account" path="/dashboard" />
      <div className="min-h-screen bg-beige">
        <header className="border-b border-beige-dark/60 bg-white">
          <div className="container-luxury flex h-16 items-center justify-between">
            <Link to="/" className="font-heading text-xl text-olive">
              Olive Spa
            </Link>
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-charcoal-light sm:inline">
                {user?.name}
              </span>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 text-sm text-charcoal-light hover:text-olive"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <div className="container-luxury py-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="font-heading text-3xl text-charcoal">Welcome, {user?.name?.split(' ')[0]}</h1>
              <p className="mt-1 text-sm text-charcoal-light">
                Manage appointments, membership, and rewards
              </p>
            </div>
            <Link to="/booking" className="btn-primary">
              <Plus size={16} />
              Book Again
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Loyalty Points"
              value={user?.loyaltyPoints ?? 0}
              subtitle="Earn 50 pts per visit"
              icon={Star}
              accent="gold"
            />
            <DashboardCard
              title="Appointments"
              value={upcoming.length}
              subtitle="Active bookings"
              icon={Calendar}
            />
            <DashboardCard
              title="Membership"
              value={membership ? membership.name.replace('Olive ', '') : 'None'}
              subtitle={membership ? formatPrice(membership.price) + '/mo' : 'View plans'}
              icon={Crown}
              accent="gold"
            />
            <DashboardCard
              title="Total Spent"
              value={formatPrice(user?.totalSpending || 0)}
              subtitle="Lifetime"
              icon={User}
              accent="beige"
            />
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl text-charcoal">Your Appointments</h2>
              <div className="mt-5 space-y-4">
                {myAppointments.length === 0 ? (
                  <div className="card-luxury p-8 text-center text-sm text-charcoal-light">
                    No appointments yet.{' '}
                    <Link to="/booking" className="text-olive underline">
                      Book your first visit
                    </Link>
                  </div>
                ) : (
                  myAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="card-luxury flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-medium text-charcoal">{apt.serviceName}</p>
                        <p className="mt-1 text-sm text-charcoal-light">
                          {formatDate(apt.preferredDate)} at {apt.preferredTime}
                        </p>
                        <span
                          className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${
                            apt.status === 'cancelled'
                              ? 'bg-red-50 text-red-600'
                              : apt.status === 'confirmed'
                                ? 'bg-olive/10 text-olive'
                                : 'bg-gold/15 text-gold-dark'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </div>
                      {apt.status !== 'cancelled' && (
                        <button
                          type="button"
                          onClick={() => cancelAppointment(apt.id)}
                          className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700"
                        >
                          <XCircle size={16} />
                          Cancel
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl text-charcoal">Membership</h2>
                <div className="card-luxury mt-5 p-6">
                  {membership ? (
                    <>
                      <p className="font-heading text-xl text-olive">{membership.name}</p>
                      <p className="mt-2 text-sm text-charcoal-light">{membership.tagline}</p>
                      <ul className="mt-4 space-y-2 text-sm text-charcoal-light">
                        {membership.benefits.slice(0, 4).map((b) => (
                          <li key={b}>· {b}</li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-charcoal-light">
                        You are not on a membership plan yet.
                      </p>
                      <Link to="/membership" className="btn-primary mt-4 inline-flex !px-5 !py-2.5 !text-xs">
                        View Plans
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 font-heading text-2xl text-charcoal">
                  <Gift size={22} className="text-gold-dark" />
                  Rewards
                </h2>
                <div className="mt-5 space-y-3">
                  {loyaltyRewards.map((reward) => {
                    const canRedeem = (user?.loyaltyPoints || 0) >= reward.pointsRequired
                    return (
                      <div key={reward.id} className="card-luxury p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-charcoal">{reward.name}</p>
                            <p className="mt-1 text-xs text-charcoal-light">
                              {reward.description}
                            </p>
                          </div>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                              canRedeem
                                ? 'bg-olive/10 text-olive'
                                : 'bg-beige text-charcoal-light'
                            }`}
                          >
                            {reward.pointsRequired} pts
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
