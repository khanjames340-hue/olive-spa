import { useState } from 'react'
import api from '../../utils/api'

const empty = { currentPassword: '', newPassword: '', confirmPassword: '' }

export default function SettingsTab({ admin }) {
  const [form, setForm] = useState(empty)
  const [message, setMessage] = useState(null)
  const [saving, setSaving] = useState(false)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.newPassword.length < 10) {
      setMessage({ type: 'error', text: 'The new password must be at least 10 characters.' })
      return
    }
    if (form.newPassword !== form.confirmPassword) {
      setMessage({ type: 'error', text: 'The new passwords don’t match.' })
      return
    }

    setSaving(true)
    setMessage(null)
    try {
      await api.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
      setForm(empty)
      setMessage({ type: 'success', text: 'Password updated.' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="card-luxury space-y-4 p-6" noValidate>
        <div>
          <h3 className="font-heading text-lg text-charcoal">Change Password</h3>
          <p className="text-xs text-charcoal-light">Signed in as {admin?.email}</p>
        </div>
        <div>
          <label className="label-field" htmlFor="currentPassword">Current password</label>
          <input
            id="currentPassword"
            type="password"
            className="input-field"
            value={form.currentPassword}
            onChange={update('currentPassword')}
            autoComplete="current-password"
          />
        </div>
        <div>
          <label className="label-field" htmlFor="newPassword">New password</label>
          <input
            id="newPassword"
            type="password"
            className="input-field"
            value={form.newPassword}
            onChange={update('newPassword')}
            autoComplete="new-password"
          />
          <p className="mt-1 text-xs text-charcoal-light">At least 10 characters.</p>
        </div>
        <div>
          <label className="label-field" htmlFor="confirmPassword">Confirm new password</label>
          <input
            id="confirmPassword"
            type="password"
            className="input-field"
            value={form.confirmPassword}
            onChange={update('confirmPassword')}
            autoComplete="new-password"
          />
        </div>
        {message && (
          <p
            className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-olive'}`}
            role={message.type === 'error' ? 'alert' : 'status'}
          >
            {message.text}
          </p>
        )}
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? 'Saving…' : 'Update Password'}
        </button>
      </form>
    </div>
  )
}
