'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import Navbar from '@/components/bolo-buddy/Navbar'
import { createClient } from '@/lib/supabase/client'

function getPasswordStrength(password: string): { label: string; color: string; width: string } | null {
  if (password.length === 0) return null
  if (password.length < 6) return { label: 'Too short', color: 'bg-red-400', width: 'w-1/4' }
  if (password.length < 8) return { label: 'Weak', color: 'bg-orange-400', width: 'w-2/4' }
  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return { label: 'Fair', color: 'bg-yellow-400', width: 'w-3/4' }
  return { label: 'Strong', color: 'bg-green-400', width: 'w-full' }
}

function SignupContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const oauthError = searchParams.get('error')

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (ref) sessionStorage.setItem('ref_code', ref)
  }, [searchParams])

  async function handleGoogleSignIn() {
    setGoogleLoading(true)
    setError(null)
    const supabase = createClient()
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    })
    if (err) {
      setError(err.message)
    }
    setGoogleLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const refCode = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ref_code') : null
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
          fullName: fullName.trim(),
          ref: refCode ?? undefined,
        }),
      })
      const result = await res.json().catch(() => ({}))
      if (result.error) {
        setError(result.error)
        setLoading(false)
        return
      }
      if (result.requiresConfirmation) {
        router.push(`/bolo-buddy/signup/verify-email?email=${encodeURIComponent(email.trim())}`)
        setLoading(false)
        return
      }
      router.push('/bolo-buddy/onboarding')
      router.refresh()
    } catch (err) {
      setError("Couldn't reach the server. Check your connection and try again.")
      setLoading(false)
    }
  }

  const oauthErrorMessage =
    oauthError === 'oauth_failed'
      ? 'Google sign-in nahi ho paya. Dobara try karein.'
      : oauthError === 'session_failed'
        ? 'Kuch gadbad ho gayi. Email se sign up karein.'
        : oauthError === 'no_user'
          ? 'User nahi mila. Dobara try karein ya email se sign up karein.'
          : null

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar variant="light" pill />
      <main className="pt-[104px] flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-4xl mb-6 mt-8">🌙</div>

        <div className="w-full max-w-md">
          <h1 className="font-nunito text-3xl font-extrabold text-[#2D2D2D] mb-2 text-center">
            Create your free account
          </h1>
          <p className="text-[#8A7B6F] text-sm text-center mb-1">
            No credit card needed.
          </p>
          <p className="text-[#8A7B6F] text-sm text-center mb-8">
            Join 50+ families already making bedtime special
          </p>

          {oauthErrorMessage && (
            <div className="bg-amber-50 border border-amber-200 rounded-[12px] px-4 py-3 mb-4">
              <p className="text-amber-700 text-sm font-semibold">{oauthErrorMessage}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="
              w-full flex items-center justify-center gap-3
              bg-white border-2 border-[#2D2D2D]/10
              rounded-[100px] px-6 py-4 min-h-[56px]
              font-bold text-[#2D2D2D] text-sm
              hover:border-[#FF6B35] hover:shadow-[0_4px_16px_rgba(255,107,53,0.15)]
              active:scale-[0.98]
              transition-all duration-200
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {googleLoading ? (
              <span className="text-[#8A7B6F]">Ek second...</span>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-[#2D2D2D]/10" />
            <span className="text-[#8A7B6F] text-xs font-semibold">ya email se</span>
            <div className="flex-1 h-px bg-[#2D2D2D]/10" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-bold text-[#8A7B6F] uppercase tracking-wide mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Aapka naam"
                required
                className="
                  w-full px-4 py-3.5 rounded-[16px] border-2 border-[#2D2D2D]/10
                  bg-white text-[#2D2D2D] font-semibold text-sm
                  focus:outline-none focus:border-[#7B2FBE]
                  transition-colors duration-200 min-h-[56px]
                "
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#8A7B6F] uppercase tracking-wide mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="aapka@email.com"
                required
                className="
                  w-full px-4 py-3.5 rounded-[16px] border-2 border-[#2D2D2D]/10
                  bg-white text-[#2D2D2D] font-semibold text-sm
                  focus:outline-none focus:border-[#7B2FBE]
                  transition-colors duration-200 min-h-[56px]
                "
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#8A7B6F] uppercase tracking-wide mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="8+ characters"
                required
                minLength={6}
                className="
                  w-full px-4 py-3.5 rounded-[16px] border-2 border-[#2D2D2D]/10
                  bg-white text-[#2D2D2D] font-semibold text-sm
                  focus:outline-none focus:border-[#7B2FBE]
                  transition-colors duration-200 min-h-[56px]
                "
              />
              {password && (() => {
                const strength = getPasswordStrength(password)
                return strength ? (
                  <div className="mt-1">
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-1 rounded-full transition-all ${strength.color} ${strength.width}`} />
                    </div>
                    <p className="text-xs text-[#8A7B6F] mt-0.5">{strength.label}</p>
                  </div>
                ) : null
              })()}
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-[12px] px-4 py-3">
                <p className="text-red-600 text-sm font-semibold">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full bg-[#FF6B35] text-white
                rounded-[100px] px-6 py-4 min-h-[56px]
                font-bold text-base
                hover:bg-[#e55c25]
                shadow-[0_8px_32px_rgba(255,107,53,0.25)]
                hover:shadow-[0_12px_40px_rgba(255,107,53,0.35)]
                active:scale-[0.98]
                transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? 'Ek second...' : 'Create account'}
            </button>
          </form>

          <p className="text-[#8A7B6F] text-xs text-center mt-4">
            By signing up, you agree to our{' '}
            <Link href="/bolo-buddy/terms" className="text-[#7B2FBE] underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/bolo-buddy/privacy" className="text-[#7B2FBE] underline">Privacy Policy</Link>.
          </p>

          <p className="text-[#2D2D2D] text-sm text-center font-semibold mt-4">
            Already have an account?{' '}
            <Link href="/bolo-buddy/signin" className="text-[#FF6B35] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-12 mb-8 text-center">
          <p className="text-[#8A7B6F] text-xs">
            🔒 We never share your data. Children&apos;s privacy protected.
          </p>
          <p className="text-[#8A7B6F] text-xs mt-2">
            Made with care by Raghvendra — a parent, a designer, a storyteller.
          </p>
        </div>
      </main>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">Loading…</div>}>
      <SignupContent />
    </Suspense>
  )
}
