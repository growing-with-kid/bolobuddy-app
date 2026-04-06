'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] })

const waveformHeights = [10, 20, 30, 16, 24]
const waveformDelays = ['0s', '0.15s', '0.3s', '0.45s', '0.6s']

// PapaKiAwaazSection — home page waitlist CTA for Papa Ki Awaaz
export function PapaKiAwaazSection() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<{
    text: string
    type: 'success' | 'error' | 'duplicate'
  } | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setIsPending(true)

    try {
      const res = await fetch('/api/waitlist-papa-ki-awaaz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json().catch(() => ({}))

      if (data.type === 'success' || data.type === 'duplicate') {
        setMessage({
          text: data.message ?? "Ho gaya! Launch pe batayenge. 🌙",
          type: data.type,
        })
        setSubmitted(true)
        setEmail('')
      } else {
        setMessage({
          text: data.message ?? 'Kuch gadbad hui. Dobara try karo.',
          type: 'error',
        })
      }
    } catch {
      setMessage({
        text: "Server tak nahi pahuncha. Dobara try karo.",
        type: 'error',
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <section className="bg-[#FFF8F0] py-16 px-6 relative z-10">
      <div className="max-w-[780px] mx-auto rounded-[28px] overflow-hidden shadow-[0_16px_64px_rgba(45,27,107,0.15)]">
        {/* Top strip */}
        <div
          className="p-12 flex items-center gap-10 flex-wrap sm:flex-nowrap"
          style={{ background: 'linear-gradient(135deg, #1a0a3c, #2D1B6B)' }}
        >
          {/* Left icon box — waveform bars */}
          <div
            className="flex-shrink-0 w-20 h-20 rounded-[22px] flex items-center justify-center gap-0.5"
            style={{
              backgroundColor: 'rgba(255,209,102,0.15)',
              border: '1px solid rgba(255,209,102,0.25)',
            }}
          >
            {waveformHeights.map((h, i) => (
              <div
                key={i}
                className="rounded-[2px] bg-[#FFD166]"
                style={{
                  width: 3,
                  height: h,
                  animation: 'pkaWave 1.4s ease-in-out infinite',
                  animationDelay: waveformDelays[i],
                }}
              />
            ))}
          </div>
          {/* Right text block */}
          <div className="flex-1 min-w-0 text-left">
            <span
              className="inline-block rounded-full px-3 py-1 mb-3 text-[10px] font-extrabold tracking-[1.5px] uppercase"
              style={{
                backgroundColor: 'rgba(255,209,102,0.12)',
                border: '1px solid rgba(255,209,102,0.25)',
                color: '#FFD166',
              }}
            >
              ✨ Jald aa raha hai
            </span>
            <h2 className={`${nunito.className} text-[28px] font-black text-white leading-tight mb-0`}>
              Papa Ki <span className="text-[#FFD166]">Awaaz</span>
            </h2>
          </div>
        </div>

        {/* Body — tagline, form, link */}
        <div className="bg-white p-10 text-center">
          <p className="text-[#8A7B6F] text-base max-w-md mx-auto mb-8">
            Record papa&apos;s voice once. Bolo Buddy tells your child a bedtime story
            in his voice — even when he&apos;s not home.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center max-w-sm mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Apna email likhein"
                required
                disabled={isPending}
                className="flex-1 min-w-0 px-5 py-4 rounded-[100px] border-2 border-[#7B2FBE]/20 bg-white text-[#2D2D2D] font-semibold text-sm focus:outline-none focus:border-[#7B2FBE] transition-colors duration-200 min-h-[56px] disabled:opacity-60 placeholder:text-[#8A7B6F]/70"
              />
              <button
                type="submit"
                disabled={isPending}
                className="shrink-0 bg-[#FF6B35] text-white px-6 py-4 rounded-[100px] font-bold text-sm whitespace-nowrap hover:bg-[#e55c25] transition-colors min-h-[56px] disabled:opacity-60"
              >
                {isPending ? 'Ek second…' : 'Notify Me'}
              </button>
            </form>
          ) : (
            <div
              className="max-w-md mx-auto rounded-2xl px-6 py-4 text-sm font-medium bg-[#7B2FBE]/10 border border-[#7B2FBE]/20 text-[#3B1F6E]"
            >
              {message?.text ?? 'Ho gaya! Launch pe pehle jaanoge. 🌙'}
            </div>
          )}

          {message?.type === 'error' && (
            <p className="mt-3 text-sm font-medium text-red-600">{message.text}</p>
          )}

          <p className="mt-6">
            <Link
              href="/bolo-buddy/papa-ki-awaaz"
              className="text-sm font-semibold text-[#7B2FBE] hover:text-[#FF6B35] transition-colors no-underline"
            >
              Poori kahani padhein →
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
