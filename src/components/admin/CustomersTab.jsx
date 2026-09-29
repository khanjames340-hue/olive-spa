import { useState } from 'react'
import { Search, MessageCircle } from 'lucide-react'
import api from '../../utils/api'
import { formatPrice } from '../../utils/helpers'
import useApiData, { useDebouncedValue } from './useApiData'
import { ErrorBanner, Spinner, formatDay, whatsappLink } from './ui'

export default function CustomersTab() {
  const [search, setSearch] = useState('')
  const q = useDebouncedValue(search.trim())
  const { data, error, loading, reload } = useApiData(() => api.customers({ q }), [q])

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-charcoal-light">
          Guests are grouped by phone number. Visits and spending count completed appointments.
        </p>
        <label className="relative block">
          <span className="sr-only">Search customers</span>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
          <input
            className="input-field py-2.5 pl-9 sm:w-64"
            placeholder="Name, phone, email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      <ErrorBanner error={error} onRetry={reload} />

      <div className="card-luxury overflow-hidden">
        {loading && !data ? (
          <Spinner />
        ) : (
          <div className={`overflow-x-auto transition-opacity ${loading ? 'opacity-60' : ''}`}>
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-beige text-xs uppercase tracking-wider text-charcoal-light">
                <tr>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Contact</th>
                  <th className="px-5 py-4">Bookings</th>
                  <th className="px-5 py-4">Visits</th>
                  <th className="px-5 py-4">Spent</th>
                  <th className="px-5 py-4">Latest Appointment</th>
                </tr>
              </thead>
              <tbody>
                {data?.items.map((c) => (
                  <tr key={c.key} className="border-t border-beige-dark/50">
                    <td className="px-5 py-4 font-medium text-charcoal">{c.name}</td>
                    <td className="px-5 py-4">
                      <a
                        href={whatsappLink(c.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-olive"
                      >
                        <MessageCircle size={12} />
                        {c.phone}
                      </a>
                      {c.email && <p className="text-xs text-charcoal-light">{c.email}</p>}
                    </td>
                    <td className="px-5 py-4">{c.bookings}</td>
                    <td className="px-5 py-4">{c.visits}</td>
                    <td className="px-5 py-4">{formatPrice(c.spent)}</td>
                    <td className="px-5 py-4">{formatDay(c.lastDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data?.items.length === 0 && (
              <p className="p-8 text-center text-sm text-charcoal-light">
                {q ? 'No customers match your search.' : 'No customers yet.'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
