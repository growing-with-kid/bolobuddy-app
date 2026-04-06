'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import BoloFooter from '@/components/bolo-buddy/Footer'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      const supabase = createClient()
      const { error: err } = await supabase.auth.updateUser({ password })
      if (err) {
        setError(err.message)
        setLoading(false)
        return
      }
      router.push('/bolo-buddy/signin')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal">
      <div className="mx-auto max-w-md px-4 py-8">
        <Link
          href="/bolo-buddy/signin"
          className="mb-6 inline-block text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back to sign in
        </Link>
        <h1 className="font-serif text-2xl font-semibold text-gray-900 sm:text-3xl">
          Set new password
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-cta-orange/40"
              required
              minLength={6}
            />
          </div>
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-cta-orange/40"
              required
              minLength={6}
            />
          </div>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full min-h-[56px] bg-[#FF6B35] hover:bg-[#e55a25] py-3.5 text-base font-medium text-white transition-colors disabled:opacity-70"
          >
            {loading ? 'Updating…' : 'Update password'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/bolo-buddy/signin" className="font-medium text-gray-700 hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
      <BoloFooter />
    </div>
  )
}
