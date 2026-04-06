'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getStoriesUsedThisMonth } from '@/app/bolo-buddy/actions'
import UpgradeModal from '@/components/bolo-buddy/UpgradeModal'

type ChildProfile = { id: string; name: string; age_group: string }

const MOODS = [
  { label: 'Bedtime', value: 'bedtime' as const },
  { label: 'Kindness', value: 'kindness' as const },
  { label: 'Courage', value: 'courage' as const },
  { label: 'Nature', value: 'nature' as const },
  { label: 'Mythology', value: 'mythology' as const },
]
const LANGUAGES = [
  { id: 'english' as const, scriptLabel: 'English' },
  { id: 'hindi' as const, scriptLabel: 'हिंदी' },
  { id: 'hinglish' as const, scriptLabel: 'Hinglish' },
  { id: 'tamil' as const, scriptLabel: 'தமிழ்' },
]

function parseAgeFromGroup(ageGroup: string): number {
  const num = parseInt(ageGroup.replace(/[^0-9]/g, ''), 10)
  return Number.isNaN(num) || num < 1 || num > 12 ? 6 : Math.min(12, Math.max(1, num))
}

type UsageState = { storiesUsed: number; limit: number; isPremium: boolean } | null

export default function StoriesPage() {
  const router = useRouter()
  const [profiles, setProfiles] = useState<ChildProfile[]>([])
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null)
  const [mood, setMood] = useState<'bedtime' | 'kindness' | 'courage' | 'nature' | 'mythology'>('bedtime')
  const [language, setLanguage] = useState<'hindi' | 'english' | 'hinglish' | 'tamil'>('english')
  const [loading, setLoading] = useState(false)
  const [loadingImageError, setLoadingImageError] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [usage, setUsage] = useState<UsageState>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace('/bolo-buddy/signup')
        return
      }
      setAuthChecked(true)
      const [profilesRes, usageRes] = await Promise.all([
        supabase
          .from('child_profiles')
          .select('id, name, age_group')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true }),
        getStoriesUsedThisMonth(),
      ])
      const list = (profilesRes.data ?? []) as ChildProfile[]
      setProfiles(list)
      setUsage(usageRes)
      if (list.length) {
        const activeId = user.user_metadata?.active_child_profile_id as string | undefined
        const initialId =
          activeId && list.some((p) => p.id === activeId) ? activeId : list[0].id
        setSelectedProfileId(initialId)
      }
    }
    load()
  }, [router])

  async function handleGenerate() {
    if (!selectedProfileId || !profiles.length) return
    const profile = profiles.find((p) => p.id === selectedProfileId)
    if (!profile) return

    // BUG-03: Pre-check free limit so paywall shows without API round trip
    if (usage && !usage.isPremium && usage.storiesUsed >= usage.limit) {
      setError('free_limit')
      return
    }

    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      router.replace('/bolo-buddy/signup')
      return
    }

    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/stories/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          childName: profile.name,
          childAge: parseAgeFromGroup(profile.age_group),
          childProfileId: profile.id,
          mood,
          language,
          userId: session.user.id,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        const isFreeLimit =
          res.status === 429 ||
          (res.status === 403 && data?.error?.toLowerCase?.().includes('limit'))
        setError(isFreeLimit ? 'free_limit' : (data?.error ?? 'Something went wrong'))
        return
      }
      const storyId = data.storyId
      if (storyId) {
        router.push(`/bolo-buddy/stories/generating?storyId=${storyId}&language=${encodeURIComponent(language)}&mood=${encodeURIComponent(mood)}`)
      } else {
        setError('No story ID returned')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate story')
    } finally {
      setLoading(false)
    }
  }

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF8F0]">
        <p className="text-body-charcoal">Loading…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Link
          href="/bolo-buddy"
          className="mb-6 inline-block text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back
        </Link>
        <h1 className="font-serif text-2xl font-semibold text-gray-900 sm:text-3xl">
          Tonight&apos;s Story
        </h1>
        <p className="mt-2 text-gray-600">
          Choose what your child is feeling right now.
        </p>

        {usage && !usage.isPremium && (
          <div
            className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3"
            role="status"
            aria-live="polite"
          >
            {usage.storiesUsed < usage.limit ? (
              usage.limit - usage.storiesUsed === 1 ? (
                <p className="text-sm font-medium text-amber-800">
                  Last free story this month!
                </p>
              ) : (
                <p className="text-sm text-amber-800">
                  {usage.limit - usage.storiesUsed} of {usage.limit} free stories left this month
                </p>
              )
            ) : (
              <p className="text-sm font-medium text-amber-900">
                No stories left this month. Upgrade to continue.
              </p>
            )}
          </div>
        )}

        {profiles.length === 0 ? (
          <p className="mt-6 text-gray-600">
            Add a child profile from the dashboard first.
          </p>
        ) : (
          <>
            {profiles.length >= 2 && (
              <div
                className="mt-6 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label="Select child profile"
              >
                {profiles.map((p) => {
                  const selected = selectedProfileId === p.id
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProfileId(p.id)}
                      role="tab"
                      aria-selected={selected}
                      aria-label={`${p.name}, ${selected ? 'selected' : 'not selected'}`}
                      className="flex flex-shrink-0 flex-col items-center gap-1.5 transition-colors"
                    >
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold ${
                          selected
                            ? 'text-white'
                            : 'border border-gray-300 bg-white text-[#2D2D2D]'
                        }`}
                        style={selected ? { backgroundColor: '#7B2FBE' } : undefined}
                      >
                        {p.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="text-sm font-medium text-[#2D2D2D]">
                        {p.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-gray-700">Mood</p>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setMood(m.value)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      mood === m.value ? 'bg-cta-orange text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-gray-700">Language</p>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map(({ id, scriptLabel }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setLanguage(id)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      language === id ? 'bg-cta-orange text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {scriptLabel}
                  </button>
                ))}
              </div>
            </div>

            {error && error !== 'free_limit' && (
              <p className="mt-4 text-sm text-red-600">{error}</p>
            )}

            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-cta-orange py-4 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="inline-flex h-5 w-5 items-center justify-center">
                    {loadingImageError ? (
                      <span className="text-lg" aria-hidden>🧚‍♀️</span>
                    ) : (
                      <Image
                        src="/images/pari-loading.png"
                        alt=""
                        width={20}
                        height={20}
                        className="animate-spin"
                        unoptimized
                        onError={() => setLoadingImageError(true)}
                      />
                    )}
                  </span>
                  Generating…
                </>
              ) : (
                "Aaj raat ki Kahani Shuru Karo"
              )}
            </button>
          </>
        )}

        <p className="mt-8 text-center text-xs text-gray-500">
          Story generation powered by AI. Your selections shape the story.
        </p>
      </div>

      {error === 'free_limit' && (
        <UpgradeModal onClose={() => setError(null)} />
      )}
    </div>
  )
}
