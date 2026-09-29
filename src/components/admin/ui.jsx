import { AlertCircle, RefreshCw } from 'lucide-react'

export const STATUS_STYLES = {
  pending: 'bg-gold/15 text-gold-dark',
  confirmed: 'bg-olive/10 text-olive',
  completed: 'bg-charcoal/10 text-charcoal',
  cancelled: 'bg-red-50 text-red-600',
}

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${
        STATUS_STYLES[status] || 'bg-beige text-charcoal-light'
      }`}
    >
      {status}
    </span>
  )
}

export function ErrorBanner({ error, onRetry }) {
  if (!error) return null
  return (
    <div
      className="flex items-center justify-between gap-4 rounded-xl bg-red-50 p-4 text-sm text-red-700"
      role="alert"
    >
      <span className="flex items-center gap-2">
        <AlertCircle size={16} />
        {error.message}
      </span>
      {onRetry && (
        <button type="button" onClick={onRetry} className="flex items-center gap-1 font-medium">
          <RefreshCw size={14} />
          Retry
        </button>
      )}
    </div>
  )
}

export function Spinner() {
  return (
    <div className="flex justify-center p-10">
      <span className="h-7 w-7 animate-spin rounded-full border-2 border-olive border-t-transparent" />
    </div>
  )
}

// "2026-10-05" -> "Mon, Oct 5, 2026" without timezone shifts
export function formatDay(dateStr) {
  if (!dateStr) return '—'
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function timeAgo(iso) {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const units = [
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [unit, size] of units) {
    const n = Math.floor(seconds / size)
    if (n >= 1) return `${n} ${unit}${n > 1 ? 's' : ''} ago`
  }
  return 'just now'
}

export function whatsappLink(phone) {
  return `https://wa.me/${phone.replace(/\D/g, '')}`
}
