import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Packages from './pages/Packages'
import Gallery from './pages/Gallery'
import Booking from './pages/Booking'
import BookingConfirmation from './pages/BookingConfirmation'
import Membership from './pages/Membership'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="packages" element={<Packages />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="booking" element={<Booking />} />
              <Route path="booking/confirmation" element={<BookingConfirmation />} />
              <Route path="membership" element={<Membership />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<BlogPost />} />
              <Route path="contact" element={<Contact />} />
              <Route path="admin/login" element={<AdminLogin />} />
              <Route
                path="admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="login" element={<Navigate to="/admin/login" replace />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  )
}
