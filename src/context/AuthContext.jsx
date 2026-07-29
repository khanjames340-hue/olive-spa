import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { generateId } from '../utils/helpers'

const AuthContext = createContext(null)

const STORAGE_KEYS = {
  user: 'olive_spa_user',
  users: 'olive_spa_users',
  appointments: 'olive_spa_appointments',
  customers: 'olive_spa_customers',
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

const DEMO_ADMIN = {
  id: 'admin-1',
  name: 'Olive Admin',
  email: 'admin@olivespa.ss',
  password: 'admin123',
  role: 'admin',
  phone: '+211 912 345 678',
  membership: null,
  loyaltyPoints: 0,
  visitHistory: [],
  totalSpending: 0,
}

const DEMO_CUSTOMER = {
  id: 'customer-1',
  name: 'Amina Okello',
  email: 'amina@example.com',
  password: 'customer123',
  role: 'customer',
  phone: '+211 911 222 333',
  membership: 'olive-premium',
  loyaltyPoints: 350,
  visitHistory: [
    { service: 'Glow Facial', date: '2026-06-10', amount: 55 },
    { service: 'Swedish Massage', date: '2026-05-20', amount: 45 },
  ],
  totalSpending: 100,
  lastAppointment: '2026-06-10',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadJSON(STORAGE_KEYS.user, null))
  const [appointments, setAppointments] = useState(() =>
    loadJSON(STORAGE_KEYS.appointments, [])
  )

  useEffect(() => {
    const users = loadJSON(STORAGE_KEYS.users, null)
    if (!users) {
      saveJSON(STORAGE_KEYS.users, [DEMO_ADMIN, DEMO_CUSTOMER])
    }
  }, [])

  useEffect(() => {
    if (user) saveJSON(STORAGE_KEYS.user, user)
    else localStorage.removeItem(STORAGE_KEYS.user)
  }, [user])

  useEffect(() => {
    saveJSON(STORAGE_KEYS.appointments, appointments)
  }, [appointments])

  const register = useCallback(({ name, email, phone, password }) => {
    const users = loadJSON(STORAGE_KEYS.users, [])
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' }
    }
    const newUser = {
      id: generateId(),
      name,
      email,
      phone,
      password,
      role: 'customer',
      membership: null,
      loyaltyPoints: 0,
      visitHistory: [],
      totalSpending: 0,
      lastAppointment: null,
    }
    users.push(newUser)
    saveJSON(STORAGE_KEYS.users, users)
    const { password: _, ...safe } = newUser
    setUser(safe)
    return { success: true, user: safe }
  }, [])

  const login = useCallback(({ email, password }) => {
    const users = loadJSON(STORAGE_KEYS.users, [])
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) {
      return { success: false, error: 'Invalid email or password.' }
    }
    const { password: _, ...safe } = found
    setUser(safe)
    return { success: true, user: safe }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...updates }
      const users = loadJSON(STORAGE_KEYS.users, [])
      const idx = users.findIndex((u) => u.id === prev.id)
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...updates }
        saveJSON(STORAGE_KEYS.users, users)
      }
      return next
    })
  }, [])

  const createAppointment = useCallback((data) => {
    const appointment = {
      id: generateId(),
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
      pointsEarned: 50,
    }
    setAppointments((prev) => [appointment, ...prev])
    return appointment
  }, [])

  const cancelAppointment = useCallback((id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
    )
  }, [])

  const updateAppointmentStatus = useCallback((id, status) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    )
  }, [])

  const getCustomers = useCallback(() => {
    return loadJSON(STORAGE_KEYS.users, []).filter((u) => u.role === 'customer')
  }, [])

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    appointments,
    register,
    login,
    logout,
    updateUser,
    createAppointment,
    cancelAppointment,
    updateAppointmentStatus,
    getCustomers,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
