'use client'

import { useState } from 'react'

export function PapaKiAwaazWaitlistForm({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'duplicate' } | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    if (!email.trim() || !email.includes('@')) {
      setMessage({ text: 'Valid email chahiye.', type: 'error' })
      return
    }
    setIsPending(true)
    try {
      const res = await fetch('/api/waitlist-papa-ki-awaaz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json().catch(() => ({}))
      if (data.type === 'success' || data.type === 'duplicate') {
        setShowSuccess(true)
        setMessage({ text: data.message ?? "You're on the list!", type: data.type })
        setEmail('')
      } else {
        setMessage({ text: data.message ?? 'Kuch gadbad hui. Dobara try karo.', type: 'error' })
      }
    } catch {
      setMessage({ text: "Couldn't reach the server. Try again.", type: 'error' })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mt-8">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tumhara email daalein..."
          autoComplete="email"
          disabled={isPending}
          className={`flex-1 min-w-[220px] h-14 rounded-full border-2 border-[#7B2FBE]/20 px-6 text-[15px] font-[inherit] text-[#2D2D2D] bg-[#FFF8F0] placeholder:text-[#2D2D2D]/40 focus:border-[#7B2FBE] focus:outline-none disabled:opacity-60 transition-opacity ${showSuccess ? 'hidden' : ''}`}
        />
        <button
          type="submit"
          disabled={isPending}
          className={`h-14 rounded-full text-white font-extrabold text-[15px] px-7 border-0 cursor-pointer transition-all active:scale-[0.98] whitespace-nowrap font-[Nunito,sans-serif] disabled:opacity-65 disabled:cursor-default ${
            showSuccess ? 'bg-[#16a34a]' : 'bg-[#FF6B35] hover:bg-[#e55a28]'
          }`}
        >
          {isPending ? 'Ek second... 🌙' : showSuccess ? '✓ Ho Gaya' : 'Mujhe Batao 🌙'}
        </button>
      </form>
      {showSuccess && (
        <div className="mt-5 rounded-2xl border border-green-500/25 bg-green-500/7 px-6 py-4 text-[15px] text-green-800 text-center">
          🌙 &nbsp; Shukriya! Hum tumhe yaad rakhenge. Jab Papa Ki Awaaz launch hogi, tum pehle jaanoge.
        </div>
      )}
      {message && message.type === 'error' && (
        <p className={`mt-3 text-sm ${variant === 'dark' ? 'text-red-300' : 'text-red-600'}`}>{message.text}</p>
      )}
      <p className={`text-xs mt-3.5 leading-[1.7] ${variant === 'dark' ? 'text-white/50' : 'text-[#2D2D2D]/40'}`}>
        🔒 Sirf launch notification. Koi ad, koi spam nahi kabhi.<br />
        Unsubscribe karo ek click mein — hamesha.
      </p>
    </>
  )
}
