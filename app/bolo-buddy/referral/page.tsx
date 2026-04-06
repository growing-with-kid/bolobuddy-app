'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { nanoid } from 'nanoid'
import { createClient } from '@/lib/supabase/client'
import BoloFooter from '@/components/bolo-buddy/Footer'

const APP_URL =
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_APP_URL
    ? process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')
    : ''

export default function ReferralPage() {
  const router = useRouter()
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [bonusStories, setBonusStories] = useState<number>(0)
  const [referralCount, setReferralCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (cancelled || !user) {
        if (!user) router.replace('/bolo-buddy/signup')
        setLoading(false)
        return
      }
      const meta = (user.user_metadata as Record<string, unknown>) ?? {}
      let code = meta.referral_code as string | undefined
      if (!code) {
        code = nanoid(8)
        await supabase.auth.updateUser({
          data: { ...meta, referral_code: code },
        })
        if (cancelled) return
      }
      setReferralCode(code)
      setBonusStories((meta.bonus_stories as number) ?? 0)
      const { count } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_id', user.id)
      if (!cancelled) setReferralCount(count ?? 0)
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [router])

  const referralUrl = referralCode && APP_URL ? `${APP_URL}/bolo-buddy/signup?ref=${encodeURIComponent(referralCode)}` : ''
  const whatsappText = `Mere bacche ko Bolo Buddy bahut pasand hai 🌙 Tumhare bacche ke liye bhi free mein try karo: ${referralUrl}`
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`

  async function handleCopy() {
    if (!referralUrl) return
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal flex items-center justify-center">
        <p className="text-gray-600">Loading…</p>
      </div>
    )
  }

  if (!referralCode) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal">
      <div className="mx-auto max-w-md px-4 py-8">
        <Link
          href="/bolo-buddy/dashboard"
          className="mb-6 inline-block text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back
        </Link>
        <h1 className="font-serif text-2xl font-semibold text-gray-900 sm:text-3xl">
          Dosto ko share karo 🌙
        </h1>
        <p className="mt-2 text-gray-600">
          Har referral ke baad 1 free kahani bonus milegi
        </p>

        <div className="mt-6 flex gap-2">
          <input
            type="text"
            readOnly
            value={referralUrl}
            className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 text-sm"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-lg bg-cta-orange px-4 py-3 text-sm font-medium text-white hover:opacity-90 whitespace-nowrap"
          >
            {copied ? 'Copied! ✓' : 'Copy'}
          </button>
        </div>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-medium text-white hover:opacity-90"
          style={{ backgroundColor: '#25D366' }}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.387.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Share on WhatsApp
        </a>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-2xl p-4" style={{ backgroundColor: '#FFD166' }}>
            <p className="text-sm font-medium text-[#2D2D2D]">
              {referralCount} dosto ne join kiya
            </p>
          </div>
          <div className="rounded-2xl p-4" style={{ backgroundColor: '#FFD166' }}>
            <p className="text-sm font-medium text-[#2D2D2D]">
              {bonusStories} bonus kahaniyaan mili
            </p>
          </div>
        </div>
      </div>
      <BoloFooter />
    </div>
  )
}
