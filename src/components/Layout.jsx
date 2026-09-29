import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import LiveBookingButton from './LiveBookingButton'

export default function Layout() {
  const { pathname } = useLocation()
  const isDashboard = pathname === '/admin' || pathname === '/admin/login'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      {!isDashboard && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isDashboard && (
        <>
          <Footer />
          <WhatsAppButton />
          <LiveBookingButton />
        </>
      )}
    </div>
  )
}
