import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-beige">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-olive border-t-transparent" />
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return children
}
