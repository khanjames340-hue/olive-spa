import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api, { TOKEN_KEY } from '../utils/api'

const AuthContext = createContext(null)

function readToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

function writeToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    // Storage unavailable (private mode); the session just won't survive a reload
  }
}

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(() => !!readToken())

  const logout = useCallback(() => {
    writeToken(null)
    setAdmin(null)
  }, [])

  // Restore an existing session
  useEffect(() => {
    if (!readToken()) return
    let cancelled = false
    api
      .me()
      .then(({ admin }) => !cancelled && setAdmin(admin))
      .catch(() => !cancelled && logout())
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [logout])

  // Any 401 from the API (expired session) signs the admin out
  useEffect(() => {
    window.addEventListener('olive:unauthorized', logout)
    return () => window.removeEventListener('olive:unauthorized', logout)
  }, [logout])

  const login = useCallback(async ({ email, password }) => {
    const { token, admin } = await api.login({ email, password })
    writeToken(token)
    setAdmin(admin)
    return admin
  }, [])

  const value = {
    admin,
    loading,
    isAdmin: !!admin,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
