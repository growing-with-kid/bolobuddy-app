'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { nanoid } from 'nanoid'
import { createClient } from '@/lib/supabase/client'
import { upsertChildProfile } from '@/app/bolo-buddy/actions'

const AGE_GROUPS = ['3–4', '5–6', '7–8'] as const
const LANGUAGES = [
  { id: 'en', scriptLabel: 'English' },
  { id: 'hi', scriptLabel: 'हिंदी' },
  { id: 'hinglish', scriptLabel: 'Hinglish' },
  { id: 'ta', scriptLabel: 'தமிழ்' },
] as const

export default function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [ageGroup, setAgeGroup] = useState<string>('5–6')
  const [language, setLanguage] = useState('en')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleComplete() {
    setError(null)
    setLoading(true)
    const phoneTrimmed = phone.trim()
    if (phoneTrimmed) {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const existing = (user.user_metadata as Record<string, unknown>) ?? {}
          await supabase.auth.updateUser({
            data: { ...existing, phone: phoneTrimmed },
          })
        }
      } catch {
        // Optional field — do not block onboarding
      }
    }
    const result = await upsertChildProfile({
      name: name.trim() || 'Your child',
      age_group: ageGroup,
      preferred_language: language,
    })
    setLoading(false)
    if (result.atLimit) {
      setError('You’ve reached the maximum number of profiles.')
      return
    }
    if (result.error) {
      setError(result.error)
      return
    }
    if (phoneTrimmed) {
      fetch('/api/notifications/whatsapp-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneTrimmed,
          childName: name.trim() || 'Your child',
        }),
      }).catch(() => {})
    }
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const existing = (user.user_metadata as Record<string, unknown>) ?? {}
      if (!existing.referral_code) {
        const referralCode = nanoid(8)
        await supabase.auth.updateUser({
          data: { ...existing, referral_code: referralCode },
        })
      }
    }
    router.push('/bolo-buddy/stories')
  }

  function handleSkip() {
    if (step < 3) {
      setStep(step + 1)
    } else {
      router.push('/bolo-buddy/stories')
    }
  }

  if (step === 1) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="font-serif text-xl font-semibold text-gray-900 sm:text-2xl">
            What&apos;s your child&apos;s name?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We&apos;ll use this to make the story feel like it was made just for them.
          </p>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Riya"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-cta-orange/40"
          autoFocus
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="flex-1 rounded-full bg-cta-orange py-3.5 text-base font-medium text-white hover:opacity-90"
          >
            Next
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="rounded-full border border-gray-200 py-3.5 text-base font-medium text-gray-600 hover:bg-gray-50"
          >
            Skip
          </button>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="font-serif text-xl font-semibold text-gray-900 sm:text-2xl">
            How old are they?
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {AGE_GROUPS.map((age) => (
            <button
              key={age}
              type="button"
              onClick={() => setAgeGroup(age)}
              className={`rounded-full px-6 py-3 text-base font-medium transition-colors ${
                ageGroup === age
                  ? 'bg-cta-orange text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {age}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setStep(3)}
            className="flex-1 rounded-full bg-cta-orange py-3.5 text-base font-medium text-white hover:opacity-90"
          >
            Next
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="rounded-full border border-gray-200 py-3.5 text-base font-medium text-gray-600 hover:bg-gray-50"
          >
            Skip
          </button>
        </div>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="font-serif text-xl font-semibold text-gray-900 sm:text-2xl">
            Which language feels most like home?
          </h2>
          <p className="mt-2 text-sm text-gray-500">In the script your child knows.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {LANGUAGES.map(({ id, scriptLabel }) => (
            <button
              key={id}
              type="button"
              onClick={() => setLanguage(id)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                language === id
                  ? 'bg-cta-orange text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {scriptLabel}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setStep(4)
            }}
            className="flex-1 rounded-full bg-cta-orange py-3.5 text-base font-medium text-white hover:opacity-90"
          >
            Next
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="rounded-full border border-gray-200 py-3.5 text-base font-medium text-gray-600 hover:bg-gray-50"
          >
            Skip
          </button>
        </div>
      </div>
    )
  }

  // Step 4: completion
  const displayName = name.trim() || 'Your child'
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-xl font-semibold text-gray-900 sm:text-2xl">
          You&apos;re ready.
        </h2>
        <p className="mt-2 text-gray-600">
          {displayName}&apos;s first story is waiting.
        </p>
      </div>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="onboarding-phone" className="block text-sm font-medium text-gray-700 mb-1">
          WhatsApp number (reminders ke liye) <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="onboarding-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 98765 43210"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-cta-orange/40"
        />
      </div>
      <button
        type="button"
        onClick={handleComplete}
        disabled={loading}
        className="w-full rounded-full bg-cta-orange py-3.5 text-base font-medium text-white hover:opacity-90 disabled:opacity-70"
      >
        {loading ? 'Saving…' : 'Pick tonight\'s story'}
      </button>
    </div>
  )
}
