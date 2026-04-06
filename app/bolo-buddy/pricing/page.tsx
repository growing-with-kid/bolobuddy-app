'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type UserState = {
  id: string
  name: string
  email: string
  isPremium: boolean
} | null

declare global {
  interface Window {
    Razorpay: new (options: {
      key: string
      amount: number
      currency: string
      order_id: string
      name: string
      description: string
      image?: string
      prefill?: { name?: string; email?: string }
      theme?: { color: string }
      handler: (response: {
        razorpay_order_id: string
        razorpay_payment_id: string
        razorpay_signature: string
      }) => void
      modal?: { ondismiss?: () => void }
    }) => {
      open: () => void
      on: (event: string, handler: () => void) => void
    }
  }
}

export default function PricingPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserState>(null)
  const [loading, setLoading] = useState(true)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [paymentLoading, setPaymentLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        router.replace('/bolo-buddy/signin')
        return
      }
      const plan = session.user.user_metadata?.plan as string | undefined
      const name =
        (session.user.user_metadata?.full_name as string)?.trim() ||
        (session.user.user_metadata?.name as string)?.trim() ||
        session.user.email?.split('@')[0] ||
        ''
      setUser({
        id: session.user.id,
        name,
        email: session.user.email ?? '',
        isPremium: plan === 'premium',
      })
      setLoading(false)
    })
  }, [router])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      setScriptLoaded(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => setScriptLoaded(true)
    document.body.appendChild(script)
  }, [])

  async function handlePremiumClick() {
    if (!user || user.isPremium || !scriptLoaded) return
    setPaymentError(null)
    setPaymentLoading(true)

    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token
    if (!token) {
      setPaymentError('Session expired. Please sign in again.')
      setPaymentLoading(false)
      return
    }

    try {
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const orderData = await orderRes.json().catch(() => ({}))
      if (!orderRes.ok) {
        setPaymentError(orderData?.error ?? 'Could not create order.')
        setPaymentLoading(false)
        return
      }

      const { orderId, amount, currency, keyId } = orderData
      const options = {
        key: keyId,
        amount,
        currency,
        order_id: orderId,
        name: 'Bolo Buddy',
        description: 'Unlimited bedtime stories for your child',
        image: '/images/logo.png',
        prefill: { name: user.name, email: user.email },
        theme: { color: '#FF6B35' },
        handler: async (response: {
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
        }) => {
          try {
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: user.id,
              }),
            })
            const verifyData = await verifyRes.json().catch(() => ({}))
            if (verifyRes.ok && verifyData.success) {
              if (typeof window !== 'undefined' && window.history?.replaceState) {
                window.history.replaceState(null, '', window.location.pathname)
              }
              router.replace('/bolo-buddy/dashboard?upgraded=true')
            } else {
              setPaymentError('Payment nahi hua, dobara try karein 🌙')
            }
          } catch {
            setPaymentError('Payment nahi hua, dobara try karein 🌙')
          } finally {
            setPaymentLoading(false)
          }
        },
        modal: {
          ondismiss: () => setPaymentLoading(false),
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', () => {
        setPaymentError('Payment nahi hua, dobara try karein 🌙')
        setPaymentLoading(false)
      })
      rzp.open()
    } catch {
      setPaymentError('Something went wrong. Please try again.')
      setPaymentLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <Link
            href="/bolo-buddy/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="font-serif text-2xl font-semibold text-gray-900 sm:text-3xl mb-2">
          Pricing
        </h1>
        <p className="text-subtext-grey mb-8 text-sm sm:text-base">
          Choose your plan. Cancel anytime.
        </p>

        {paymentError && (
          <div
            className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            {paymentError}
          </div>
        )}

        <div className="grid gap-8 sm:grid-cols-2 max-w-4xl">
          {/* Free plan */}
          <div
            className="rounded-3xl border-2 border-[#E5E5E5] bg-white p-6 shadow-sm sm:p-8 flex flex-col"
            style={{ boxShadow: '0px 4px 20px rgba(0,0,0,0.08)' }}
          >
            <p className="text-body-charcoal mb-2 text-sm font-semibold uppercase tracking-wide">
              Free
            </p>
            <p className="text-body-charcoal mb-1 font-serif text-4xl font-bold">₹0</p>
            <p className="text-subtext-grey mb-4 text-sm">Per month</p>
            <ul className="text-subtext-grey mb-6 mt-2 list-disc space-y-2 pl-5 text-sm">
              <li>3 kahaniyaan/month</li>
              <li>Hindi, English, Hinglish, Tamil</li>
              <li>Save and replay favorites</li>
            </ul>
            {user && !user.isPremium && (
              <span className="mt-auto inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                Current plan
              </span>
            )}
          </div>

          {/* Premium plan */}
          <div
            className="relative flex flex-col overflow-hidden rounded-3xl p-6 shadow-sm sm:p-8"
            style={{
              background: 'linear-gradient(180deg, #FF6B35 0%, #FF8C42 100%)',
            }}
          >
            <p className="text-white mb-2 text-sm font-semibold uppercase tracking-wide">
              Premium
            </p>
            <p className="font-serif text-4xl font-bold text-white">₹299</p>
            <p className="text-white/90 mb-4 text-sm">Per month</p>
            <ul className="text-white/95 mb-6 mt-2 list-disc space-y-2 pl-5 text-sm">
              <li>Unlimited kahaniyaan</li>
              <li>Hindi, English, Hinglish, Tamil</li>
              <li>Cancel anytime</li>
            </ul>
            <div className="mt-auto">
              {user?.isPremium ? (
                <p className="rounded-full bg-white/20 px-4 py-3 text-center text-sm font-medium text-white">
                  Aap already Premium hain 🌙
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handlePremiumClick}
                  disabled={!scriptLoaded || paymentLoading}
                  className="w-full rounded-full bg-white px-6 py-3.5 text-center text-base font-medium text-[#FF6B35] transition-opacity hover:opacity-90 disabled:opacity-70"
                >
                  {paymentLoading ? 'Opening...' : 'Premium Shuru Karein'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
