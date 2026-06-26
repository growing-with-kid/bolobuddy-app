'use client'

import Link from 'next/link'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/bolo-buddy/Navbar'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [newsletterOptIn, setNewsletterOptIn] = useState(false)
  const [newsletterDone, setNewsletterDone] = useState(false)

  async function handleNewsletterOptIn(checked: boolean) {
    setNewsletterOptIn(checked)
    if (!checked || !email || newsletterDone) return

    try {
      const res = await fetch('/api/newsletter/beehiiv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setNewsletterDone(true)
      } else {
        console.error(
          'GWK newsletter opt-in failed:',
          res.status,
          await res.text().catch(() => '')
        )
      }
    } catch (err) {
      console.error('GWK newsletter opt-in failed:', err)
    }
  }

  return (
    <main className="pt-[104px] flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="text-5xl mb-6">📬</div>
      <h1 className="font-nunito text-3xl font-extrabold text-[#2D2D2D] mb-3">
        Email check karein
      </h1>
      <p className="text-[#8A7B6F] text-base max-w-sm mb-2">
        Humne ek confirmation link bheja hai:
      </p>
      {email && (
        <p className="text-[#7B2FBE] font-bold text-base mb-6">{email}</p>
      )}
      <p className="text-[#8A7B6F] text-sm max-w-sm mb-8">
        Link pe click karein — aur aapka account ready ho jayega.
        Spam folder bhi check karein agar mail na aaye.
      </p>

      {email && (
        <div
          className="mb-6 w-full max-w-sm text-left"
          style={{
            backgroundColor: '#FFF3D6',
            border: '1px solid #FFD985',
            borderRadius: '12px',
            padding: '16px',
          }}
        >
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={newsletterOptIn}
              onChange={(e) => handleNewsletterOptIn(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#2D2D2D]/20 text-[#7B2FBE] focus:ring-[#7B2FBE]"
            />
            <span className="text-sm leading-snug text-[#5C534A]">
              <span className="mr-1 inline-block text-[16px] align-middle" aria-hidden>
                🌱
              </span>
              Also get the GWK newsletter — honest parenting stories, free activities, and
              real moments from Indian families. One email a week. No spam.
            </span>
          </label>
        </div>
      )}

      <Link
        href="/bolo-buddy/sample"
        className="inline-flex min-h-[48px] items-center justify-center rounded-[100px] bg-[#FF6B35] px-8 py-3 text-base font-bold text-white no-underline shadow-[0_8px_32px_rgba(255,107,53,0.25)] transition-all hover:bg-[#e55c25] active:scale-[0.98]"
      >
        Start your story
      </Link>
    </main>
  )
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar variant="light" pill />
      <Suspense fallback={null}>
        <VerifyEmailContent />
      </Suspense>
    </div>
  )
}
