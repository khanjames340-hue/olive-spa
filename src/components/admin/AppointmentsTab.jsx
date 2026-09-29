import { useState } from 'react'
import { Check, CheckCheck, X, RotateCcw, Search, Phone, MessageCircle } from 'lucide-react'
import api from '../../utils/api'
import { formatPrice } from '../../utils/helpers'
import useApiData, { useDebouncedValue } from './useApiData'
import { ErrorBanner, Spinner, StatusBadge, formatDay, timeAgo, whatsappLink } from './ui'

const FILTERS = [
  { id: '', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
]

// Which status changes are offered for each status
const ACTIONS = {
  pending: [
    { to: 'confirmed', label: 'Confirm', icon: Check, style: 'bg-olive/10 text-olive hover:bg-olive/20' },
    { to: 'cancelled', label: 'Cancel', icon: X, style: 'bg-red-50 text-red-600 hover:bg-red-100' },
  ],
  confirmed: [
    { to: 'completed', label: 'Mark completed', icon: CheckCheck, style: 'bg-olive/10 text-olive hover:bg-olive/20' },
    { to: 'cancelled', label: 'Cancel', icon: X, style: 'bg-red-50 text-red-600 hover:bg-red-100' },
  ],
  completed: [],
  cancelled: [
    { to: 'pending', label: 'Reopen', icon: RotateCcw, style: 'bg-beige text-charcoal hover:bg-beige-dark' },
  ],
}

function GuestDetails({ a }) {
  return (
    <>
      <p className="font-medium text-charcoal">{a.fullName}</p>
      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-charcoal-light">
        <a href={`tel:${a.phone}`} className="flex items-center gap-1 hover:text-olive">
          <Phone size={12} />
          {a.phone}
        </a>
        <a
          href={whatsappLink(a.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-olive"
          title="Message on WhatsApp"
        >
          <MessageCircle size={12} />
          WhatsApp
        </a>
      </div>
      {a.email && <p className="text-xs text-charcoal-light">{a.email}</p>}
      <p className="mt-1 text-[11px] tracking-wider text-charcoal-light/80">
        {a.reference} · booked {timeAgo(a.createdAt)}
      </p>
    </>
  )
}

function Notes({ notes }) {
  if (!notes) return null
  return (
    <p className="mt-1 max-w-xs whitespace-pre-line text-xs italic text-charcoal-light">
      “{notes}”
    </p>
  )
}

function StatusActions({ a, busy, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ACTIONS[a.status].map(({ to, label, icon: Icon, style }) => (
        <button
          key={to}
          type="button"
          disabled={busy}
          onClick={() => onChange(a, to)}
          className={`flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition disabled:opacity-50 ${style}`}
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  )
}

export default function AppointmentsTab({ initialStatus = '' }) {
  const [status, setStatus] = useState(initialStatus)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [busyId, setBusyId] = useState(null)
  const [actionError, setActionError] = useState(null)
  const q = useDebouncedValue(search.trim())

  const { data, error, loading, reload, setData } = useApiData(
    () => api.appointments({ status, q, sort: sort === 'date' ? 'date' : '', page }),
    [status, q, sort, page]
  )

  const changeFilter = (setter) => (value) => {
    setter(value)
    setPage(1)
  }

  const updateStatus = async (appointment, to) => {
    if (to === 'cancelled' && !window.confirm(`Cancel ${appointment.fullName}'s booking?`)) return
    setBusyId(appointment.id)
    setActionError(null)
    try {
      const { appointment: updated } = await api.updateAppointmentStatus(appointment.id, to)
      setData((d) => ({ ...d, items: d.items.map((a) => (a.id === updated.id ? updated : a)) }))
    } catch (err) {
      setActionError(err)
    } finally {
      setBusyId(null)
    }
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-1 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => changeFilter(setStatus)(f.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
                status === f.id ? 'bg-olive text-white' : 'bg-white text-charcoal-light hover:text-olive'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative block">
            <span className="sr-only">Search bookings</span>
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
            <input
              className="input-field py-2.5 pl-9 sm:w-64"
              placeholder="Name, phone, reference…"
              value={search}
              onChange={(e) => changeFilter(setSearch)(e.target.value)}
            />
          </label>
          <select
            className="input-field py-2.5 sm:w-44"
            value={sort}
            onChange={(e) => changeFilter(setSort)(e.target.value)}
            aria-label="Sort bookings"
          >
            <option value="newest">Newest first</option>
            <option value="date">By visit date</option>
          </select>
        </div>
      </div>

      <ErrorBanner error={error} onRetry={reload} />
      <ErrorBanner error={actionError} />

      <div className="card-luxury overflow-hidden">
        {loading && !data ? (
          <Spinner />
        ) : (
          <div className={`transition-opacity ${loading ? 'opacity-60' : ''}`}>
            <ul className="divide-y divide-beige-dark/50 md:hidden">
              {data?.items.map((a) => (
                <li key={a.id} className="space-y-3 p-5 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <GuestDetails a={a} />
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                  <div className="rounded-xl bg-beige/70 p-3">
                    <p className="font-medium text-charcoal">{a.serviceName}</p>
                    <p className="text-xs text-charcoal-light">
                      {formatDay(a.preferredDate)} · {a.preferredTime} · {formatPrice(a.price)}
                    </p>
                    <Notes notes={a.notes} />
                  </div>
                  <StatusActions a={a} busy={busyId === a.id} onChange={updateStatus} />
                </li>
              ))}
            </ul>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="bg-beige text-xs uppercase tracking-wider text-charcoal-light">
                  <tr>
                    <th className="px-5 py-4">Guest</th>
                    <th className="px-5 py-4">Service</th>
                    <th className="px-5 py-4">Appointment</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.items.map((a) => (
                    <tr key={a.id} className="border-t border-beige-dark/50 align-top">
                      <td className="px-5 py-4">
                        <GuestDetails a={a} />
                      </td>
                      <td className="px-5 py-4">
                        <p>{a.serviceName}</p>
                        <p className="text-xs text-charcoal-light">{formatPrice(a.price)}</p>
                        <Notes notes={a.notes} />
                      </td>
                      <td className="px-5 py-4">
                        {formatDay(a.preferredDate)}
                        <br />
                        <span className="text-xs text-charcoal-light">{a.preferredTime}</span>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={a.status} />
                      </td>
                      <td className="px-5 py-4">
                        <StatusActions a={a} busy={busyId === a.id} onChange={updateStatus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data?.items.length === 0 && (
              <p className="p-8 text-center text-sm text-charcoal-light">
                {q || status ? 'No bookings match these filters.' : 'No bookings yet.'}
              </p>
            )}
          </div>
        )}
      </div>

      {data && data.total > data.pageSize && (
        <div className="flex items-center justify-between text-sm text-charcoal-light">
          <span>
            {data.total} bookings · page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn-secondary px-4 py-2 disabled:opacity-40"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn-secondary px-4 py-2 disabled:opacity-40"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
