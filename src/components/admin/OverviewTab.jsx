import { Clock, Calendar, Users, DollarSign } from 'lucide-react'
import DashboardCard from '../DashboardCard'
import api from '../../utils/api'
import { formatPrice } from '../../utils/helpers'
import useApiData from './useApiData'
import { ErrorBanner, Spinner, StatusBadge, formatDay, timeAgo } from './ui'

export default function OverviewTab({ onOpenPending }) {
  const { data, error, loading, reload } = useApiData(() => api.stats(), [])

  if (loading && !data) return <Spinner />
  if (!data) return <ErrorBanner error={error} onRetry={reload} />

  const { totals, popularServices, recent } = data

  return (
    <div className="space-y-8">
      <ErrorBanner error={error} onRetry={reload} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <button type="button" onClick={onOpenPending} className="text-left">
          <DashboardCard
            title="Awaiting Confirmation"
            value={totals.pending}
            subtitle={totals.pending ? 'Tap to review' : 'All caught up'}
            icon={Clock}
            accent="gold"
          />
        </button>
        <DashboardCard
          title="Appointments Today"
          value={totals.today}
          subtitle={`${totals.upcomingWeek} in the next 7 days`}
          icon={Calendar}
        />
        <DashboardCard
          title="Customers"
          value={totals.customers}
          subtitle={`${totals.bookings} bookings in total`}
          icon={Users}
        />
        <DashboardCard
          title="Revenue This Month"
          value={formatPrice(totals.revenueThisMonth)}
          subtitle="From completed appointments"
          icon={DollarSign}
          accent="gold"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-luxury p-6">
          <h3 className="font-heading text-lg text-charcoal">Latest Bookings</h3>
          <div className="mt-4 space-y-3">
            {recent.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between gap-4 border-b border-beige-dark/50 pb-3 text-sm last:border-0"
              >
                <div>
                  <p className="font-medium text-charcoal">{a.fullName}</p>
                  <p className="text-xs text-charcoal-light">
                    {a.serviceName} · {formatDay(a.preferredDate)} {a.preferredTime}
                  </p>
                  <p className="text-[11px] text-charcoal-light/80">Booked {timeAgo(a.createdAt)}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
            {recent.length === 0 && (
              <p className="text-sm text-charcoal-light">
                No bookings yet. They’ll appear here as soon as customers book on the website.
              </p>
            )}
          </div>
        </div>
        <div className="card-luxury p-6">
          <h3 className="font-heading text-lg text-charcoal">Popular Services</h3>
          <p className="text-xs text-charcoal-light">Last 90 days</p>
          <div className="mt-4 space-y-3">
            {popularServices.length === 0 && (
              <p className="text-sm text-charcoal-light">No bookings in the last 90 days.</p>
            )}
            {popularServices.map(({ name, count }) => (
              <div key={name} className="flex justify-between text-sm">
                <span className="text-charcoal">{name}</span>
                <span className="font-medium text-olive">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
