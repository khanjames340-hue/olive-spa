import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Calendar, LogOut, LayoutDashboard, Settings, ExternalLink } from 'lucide-react'
import SEO from '../components/SEO'
import { useAuth } from '../context/AuthContext'
import OverviewTab from '../components/admin/OverviewTab'
import AppointmentsTab from '../components/admin/AppointmentsTab'
import CustomersTab from '../components/admin/CustomersTab'
import SettingsTab from '../components/admin/SettingsTab'

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function AdminDashboard() {
  const { admin, logout } = useAuth()
  const [tab, setTab] = useState('overview')
  // Lets the overview's "Awaiting confirmation" card open the appointments tab pre-filtered
  const [appointmentFilter, setAppointmentFilter] = useState('')

  const openTab = (id, filter = '') => {
    setAppointmentFilter(filter)
    setTab(id)
  }

  const current = tabs.find((t) => t.id === tab)

  return (
    <>
      <SEO title="Admin Dashboard" path="/admin" />
      <div className="flex min-h-screen bg-beige">
        <aside className="relative hidden w-64 shrink-0 border-r border-beige-dark/60 bg-olive-dark text-beige lg:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <div className="p-6">
              <Link to="/" className="font-heading text-2xl text-white">
                Olive Spa
              </Link>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-gold">Admin</p>
            </div>
            <nav className="space-y-1 px-3">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => openTab(t.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                    tab === t.id
                      ? 'bg-white/10 text-gold'
                      : 'text-beige/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <t.icon size={18} />
                  {t.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto space-y-3 p-6 text-sm">
              <Link
                to="/"
                target="_blank"
                className="flex items-center gap-2 text-beige/60 hover:text-white"
              >
                <ExternalLink size={16} />
                View website
              </Link>
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-2 text-beige/60 hover:text-white"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="border-b border-beige-dark/60 bg-white">
            <div className="flex h-16 items-center justify-between px-5 lg:px-8">
              <div>
                <h1 className="font-heading text-xl text-charcoal lg:text-2xl">{current.label}</h1>
                <p className="text-xs text-charcoal-light">Signed in as {admin?.email}</p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="text-sm text-charcoal-light hover:text-olive lg:hidden"
              >
                Sign Out
              </button>
            </div>
            <div className="flex gap-1 overflow-x-auto px-3 pb-3 lg:hidden">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => openTab(t.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium ${
                    tab === t.id ? 'bg-olive text-white' : 'bg-beige text-charcoal-light'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </header>

          <div className="p-5 lg:p-8">
            {tab === 'overview' && (
              <OverviewTab onOpenPending={() => openTab('appointments', 'pending')} />
            )}
            {tab === 'appointments' && (
              <AppointmentsTab key={appointmentFilter} initialStatus={appointmentFilter} />
            )}
            {tab === 'customers' && <CustomersTab />}
            {tab === 'settings' && <SettingsTab admin={admin} />}
          </div>
        </div>
      </div>
    </>
  )
}
