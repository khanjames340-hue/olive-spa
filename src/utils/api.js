const API_URL = import.meta.env.VITE_API_URL || '/api'
export const TOKEN_KEY = 'olive_spa_admin_token'

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message)
    this.status = status
    this.errors = errors
  }
}

function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

async function request(path, { body, ...options } = {}) {
  const token = getToken()
  const headers = {
    ...(body ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  let res
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('Could not reach the server. Check your connection and try again.', 0)
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    if (res.status === 401 && token) {
      window.dispatchEvent(new Event('olive:unauthorized'))
    }
    throw new ApiError(data.message || 'Request failed', res.status, data.errors)
  }
  return data
}

function query(params) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  ).toString()
  return search ? `?${search}` : ''
}

export const api = {
  health: () => request('/health'),
  createBooking: (booking) => request('/appointments', { method: 'POST', body: booking }),

  login: (credentials) => request('/auth/login', { method: 'POST', body: credentials }),
  me: () => request('/auth/me'),
  changePassword: (body) => request('/auth/change-password', { method: 'POST', body }),

  stats: () => request('/admin/stats'),
  appointments: (params = {}) => request(`/admin/appointments${query(params)}`),
  updateAppointmentStatus: (id, status) =>
    request(`/admin/appointments/${id}`, { method: 'PATCH', body: { status } }),
  customers: (params = {}) => request(`/admin/customers${query(params)}`),
}

export default api
