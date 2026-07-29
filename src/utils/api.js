const API_URL = import.meta.env.VITE_API_URL || '/api'

async function request(path, options = {}) {
  const token = localStorage.getItem('olive_spa_token')
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || 'Request failed')
  }
  return data
}

export const api = {
  health: () => request('/health'),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: (body) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  me: () => request('/auth/me'),
  createBooking: (body) =>
    request('/appointments', { method: 'POST', body: JSON.stringify(body) }),
  myAppointments: () => request('/appointments/mine'),
  services: (category) =>
    request(`/services${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  loyaltyBalance: () => request('/loyalty/balance'),
  analytics: () => request('/customers/analytics'),
}

export default api
