'use client'

import Link from 'next/link'
import { useState } from 'react'
import BoloFooter from '@/components/bolo-buddy/Footer'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const supabase = createClient()
      const redirectTo = typeof window !== 'undefined'
        ? `${window.location.origin}/bolo-buddy/reset-password`
        : undefined
      const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectTo ?? undefined,
      })
      if (err) {
        setError(err.message)
        setLoading(false)
        return
      }
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
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
          Reset password
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter your email and we&apos;ll send you a link to set a new password.
        </p>

        {sent ? (
          <div className="mt-8 rounded-lg bg-green-50 p-4 text-sm text-green-800">
            Check your email for a link to reset your password. If you don&apos;t see it, check your spam folder.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-cta-orange/40"
                required
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
              {loading ? 'Sending…' : 'Send me the link'}
            </button>
            <p className="text-sm text-gray-400 text-center mt-3">
              Check your inbox — the link arrives in about a minute. If you don&apos;t see it, check your spam folder.
            </p>
          </form>
        )}

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
