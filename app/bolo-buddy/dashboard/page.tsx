import { redirect } from 'next/navigation'
import Link from 'next/link'
import { cookies, headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { getDashboardData, unsaveStory, getChildProfiles, getSubscriptionStatus, getHasAnyStory, getSystemStories } from '../actions'
import SystemStoriesShelf from '@/components/bolo-buddy/SystemStoriesShelf'
import TonightStoryHero from '@/components/bolo-buddy/TonightStoryHero'
import LastPlayedCard from '@/components/bolo-buddy/LastPlayedCard'
import LastStoryCard from '@/components/bolo-buddy/LastStoryCard'
import RecentStoriesStrip from '@/components/bolo-buddy/RecentStoriesStrip'
import SavedStoriesShelf from '@/components/bolo-buddy/SavedStoriesShelf'
import ProfileSwitcher from '@/components/bolo-buddy/ProfileSwitcher'
import PushPromptCard from '@/components/bolo-buddy/PushPromptCard'
import StreakBadge from '@/components/bolo-buddy/StreakBadge'
import UpgradeToast from '@/components/bolo-buddy/UpgradeToast'
import { NpsTrigger } from '@/components/bolo-buddy/NpsTrigger'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Dashboard | Bolo Buddy',
  description: 'Your bedtime stories home.',
}

function getGreeting(nowMs: number): string {
  const hour = new Date(nowMs).getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function computeStreak(plays: { played_at: string }[], nowMs: number): number {
  if (!plays.length) return 0
  const days = [...new Set(plays.map((p) => new Date(p.played_at).toISOString().slice(0, 10)))].sort().reverse()

  const today = new Date(nowMs).toISOString().slice(0, 10)
  const yesterday = new Date(nowMs - 86400000).toISOString().slice(0, 10)

  if (days[0] !== today && days[0] !== yesterday) return 0

  let streak = 1
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1])
    const curr = new Date(days[i])
    const diff = (prev.getTime() - curr.getTime()) / 86400000
    if (diff === 1) streak++
    else break
  }
  return streak
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string }>
}) {
  const headersList = await headers()
  const requestDate = headersList.get('date')
  // Use request Date when present so render is stable; fallback only when header is missing (e.g. some dev/proxy)
  const nowMs = requestDate ? new Date(requestDate).getTime() : Date.now() // eslint-disable-line react-hooks/purity

  const supabase = await createClient()
  const sp = await searchParams
  const showUpgradeToast = sp?.upgraded === 'true'
  const { data: { user } } = await supabase.auth.getUser()
  const { data: { session } } = await supabase.auth.getSession()
  if (!user) redirect('/bolo-buddy/signup')

  const [data, childProfiles, subscription, hasAnyStory, systemStories] = await Promise.all([
    getDashboardData(),
    getChildProfiles(),
    getSubscriptionStatus(),
    getHasAnyStory(),
    getSystemStories(),
  ])
  if (!data) redirect('/bolo-buddy/signup')

  const cookieStore = await cookies()
  const activeChildId = cookieStore.get('bolo_active_child_id')?.value ?? null
  const activeProfileId =
    (user?.user_metadata?.active_child_profile_id as string | undefined) ??
    activeChildId ??
    childProfiles[0]?.id ??
    null

  let lastStory: { id: string; title: string; language: string; mood: string; created_at: string } | null = null
  let streak = 0
  let totalStories = 0

  if (activeProfileId) {
    const [lastStoryRes, childStoriesRes] = await Promise.all([
      supabase
        .from('stories')
        .select('id, title, language, mood, created_at')
        .eq('child_profile_id', activeProfileId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from('stories')
        .select('id')
        .eq('child_profile_id', activeProfileId),
    ])

    lastStory = lastStoryRes.data as typeof lastStory
    totalStories = (childStoriesRes.data ?? []).length

    const childStoryIds = (childStoriesRes.data ?? []).map((r) => r.id)
    if (childStoryIds.length > 0) {
      const { data: plays } = await supabase
        .from('story_plays')
        .select('played_at')
        .eq('user_id', user.id)
        .in('story_id', childStoryIds)
        .order('played_at', { ascending: false })
        .limit(60)
      streak = computeStreak(plays ?? [], nowMs)
    }
  }

  const greeting = getGreeting(nowMs)
  const name = data.parentName ?? 'there'
  const childName = childProfiles.find(p => p.id === activeProfileId)?.name ?? null
  const savedCount = data.savedStories?.length ?? 0

  const showPushPrompt = hasAnyStory && user?.user_metadata?.push_prompted !== true

  const signedUpAt = new Date(user.created_at)
  const daysSinceSignup = (nowMs - signedUpAt.getTime()) / (1000 * 60 * 60 * 24)
  const showNps = daysSinceSignup >= 7 && !user.user_metadata?.nps_shown
  const accessToken = session?.access_token

  // Free tier usage
  const FREE_LIMIT = 3
  const storiesUsedThisMonth = data.storiesUsedThisMonth ?? 0
  const storiesLeft = Math.max(0, FREE_LIMIT - storiesUsedThisMonth)

  const nameInitial = (data.parentName ?? 'U').charAt(0).toUpperCase()

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[#FFF8F0] font-sans" style={{ color: '#3D2010' }}>

      {/* ── Ambient background glows ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 90% 10%, rgba(232,82,10,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 5% 80%,  rgba(91,45,142,0.05) 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {/* ── NAV ── */}
        <nav
          className="sticky top-0 z-50 flex h-16 items-center justify-between -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 -mt-6 pt-6 mb-2"
          style={{
            background: 'rgba(250,243,236,0.92)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #EAD9C8',
          }}
        >
        <Link href="/bolo-buddy" className="flex items-center gap-2.5 no-underline">
          <div
            className="grid h-9 w-9 place-items-center rounded-xl text-lg"
            style={{ background: '#E8520A' }}
          >
            🎙
          </div>
          <span
            className="text-xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1A0A00' }}
          >
            Bolo Buddy
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Free / Premium badge */}
          <span
            className="hidden sm:block rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: '#F0E8FF', color: '#5B2D8E' }}
          >
            {subscription.isPremium
              ? 'PREMIUM'
              : `FREE · ${storiesUsedThisMonth} of ${FREE_LIMIT} used`}
          </span>

          {/* Profile switcher or avatar */}
          {childProfiles.length > 1 ? (
            <ProfileSwitcher profiles={childProfiles} activeId={activeChildId} />
          ) : (
            <div
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-sm font-bold text-white"
              title={data.parentName ?? undefined}
              style={{
                background: 'linear-gradient(135deg, #E8520A, #7B44B8)',
                border: '2px solid white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              {nameInitial}
            </div>
          )}
        </div>
        </nav>

        {/* ── GREETING + CTA ── */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1
              className="text-3xl font-bold leading-tight sm:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif", color: '#1A0A00' }}
            >
              {greeting},{' '}
              <span style={{ color: '#E8520A' }}>{name}</span> 🌙
            </h1>
            <p className="mt-1.5 text-sm" style={{ color: '#9B7E6A' }}>
              {childName ? `${childName}'s bedtime story is just one tap away.` : 'Ready for tonight?'}
            </p>
          </div>
          <Link
            href="/bolo-buddy/stories"
            className="flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white no-underline transition-all hover:-translate-y-0.5"
            style={{
              background: '#E8520A',
              boxShadow: '0 4px 20px rgba(232,82,10,0.35)',
            }}
          >
            <span>🎙</span> Start Tonight&apos;s Story
          </Link>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: '📖', bg: '#FEF0E6', value: totalStories, label: 'Stories heard' },
            { icon: '🌙', bg: '#F0E8FF', value: `${streak}`, label: 'Bedtime streak' },
            { icon: '❤️', bg: '#FFF8EC', value: savedCount, label: 'Saved stories' },
            {
              icon: subscription.isPremium ? '✨' : '🔓',
              bg: subscription.isPremium ? '#E6F5EE' : '#F0E8FF',
              value: subscription.isPremium ? 'Premium' : 'Free',
              label: subscription.isPremium ? 'Unlimited stories' : `${storiesLeft} stories left`,
            },
          ].map(({ icon, bg, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border p-4 transition-all hover:-translate-y-0.5"
              style={{
                background: 'white',
                borderColor: '#EAD9C8',
                boxShadow: '0 2px 20px rgba(88,45,10,0.08)',
              }}
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg" style={{ background: bg }}>
                {icon}
              </div>
              <div className="min-w-0">
                <div className="text-xl font-bold leading-none" style={{ color: '#1A0A00' }}>{value}</div>
                <div className="mt-1 text-xs font-medium" style={{ color: '#9B7E6A' }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* ── LEFT COLUMN ── */}
          <div className="flex min-w-0 flex-col gap-6">

            {/* Stories for Tonight shelf */}
            {systemStories.length > 0 && (
              <SystemStoriesShelf
                stories={systemStories}
                childName={childName ?? 'beta'}
              />
            )}

            {/* Tonight's Story hero */}
            <TonightStoryHero childName={childName} />

            {/* Last story + streak */}
            {lastStory && (
              <div
                className="rounded-2xl border p-5"
                style={{ background: 'white', borderColor: '#EAD9C8', boxShadow: '0 2px 20px rgba(88,45,10,0.08)' }}
              >
                <div
                  className="mb-3 text-base font-semibold"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#1A0A00' }}
                >
                  Last Story
                </div>
                <LastStoryCard lastStory={lastStory} />
                <Link
                  href="/bolo-buddy/stories/history"
                  className="mt-3 block text-sm font-medium no-underline"
                  style={{ color: '#E8520A' }}
                >
                  Saari kahaniyaan dekho →
                </Link>
              </div>
            )}

            {/* Last played */}
            {data.lastPlayed && (
              <div
                className="rounded-2xl border p-5"
                style={{ background: 'white', borderColor: '#EAD9C8', boxShadow: '0 2px 20px rgba(88,45,10,0.08)' }}
              >
                <div
                  className="mb-3 text-base font-semibold"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#1A0A00' }}
                >
                  Continue Listening
                </div>
                <LastPlayedCard play={data.lastPlayed} />
              </div>
            )}

            {/* Recent plays strip */}
            {data.recentPlays.length > 0 && (
              <div
                className="rounded-2xl border p-5"
                style={{ background: 'white', borderColor: '#EAD9C8', boxShadow: '0 2px 20px rgba(88,45,10,0.08)' }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="text-base font-semibold"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#1A0A00' }}
                  >
                    Pichli Kahaniyaan
                  </span>
                  <Link href="/bolo-buddy/stories/history" className="text-xs font-medium no-underline" style={{ color: '#E8520A' }}>
                    See all →
                  </Link>
                </div>
                <RecentStoriesStrip plays={data.recentPlays} />
              </div>
            )}

            {/* Saved stories */}
            {(data.savedStories?.length ?? 0) > 0 && (
              <div
                className="rounded-2xl border p-5"
                style={{ background: 'white', borderColor: '#EAD9C8', boxShadow: '0 2px 20px rgba(88,45,10,0.08)' }}
              >
                <div
                  className="mb-3 text-base font-semibold"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#1A0A00' }}
                >
                  Saved Stories
                </div>
                <SavedStoriesShelf savedStories={data.savedStories} onRemove={unsaveStory} />
              </div>
            )}

            {/* Empty state */}
            {!data.lastPlayed && data.recentPlays.length === 0 && (
              <p className="text-sm" style={{ color: '#9B7E6A' }}>
                Pick a story and we&apos;ll show your last played here so you can replay it anytime.
              </p>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex min-w-0 flex-col gap-5 bg-[#FFF8F0] lg:sticky lg:top-6">

            {/* Child profile card */}
            {childProfiles.length > 0 && (() => {
              const active = childProfiles.find(p => p.id === activeProfileId) ?? childProfiles[0]
              return (
                <div
                  className="rounded-2xl border p-6"
                  style={{ background: 'white', borderColor: '#EAD9C8', boxShadow: '0 2px 20px rgba(88,45,10,0.08)' }}
                >
                  <div className="mb-5 flex items-center gap-3.5">
                    <div
                      className="grid h-13 w-13 place-items-center rounded-full text-2xl"
                      style={{
                        background: 'linear-gradient(135deg, #FFB347, #FF6B35)',
                        border: '3px solid #F3E9DC',
                        boxShadow: '0 4px 12px rgba(232,82,10,0.2)',
                        width: 52, height: 52,
                      }}
                    >
                      🦊
                    </div>
                    <div>
                      <div
                        className="text-lg font-bold"
                        style={{ fontFamily: "'Playfair Display', serif", color: '#1A0A00' }}
                      >
                        {active.name}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: '#9B7E6A' }}>
                        {active.age_group ? `Age ${active.age_group} · ` : ''}Active listener
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-2.5">
                    {[
                      { value: totalStories, label: 'Stories heard' },
                      { value: streak > 0 ? `${streak}🔥` : '—', label: 'Night streak' },
                    ].map(({ value, label }) => (
                      <div
                        key={label}
                        className="rounded-xl border p-3"
                        style={{ background: '#FAF3EC', borderColor: '#EAD9C8' }}
                      >
                        <div className="text-xl font-bold" style={{ color: '#1A0A00' }}>{value}</div>
                        <div className="mt-0.5 text-xs" style={{ color: '#9B7E6A' }}>{label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-1.5 text-xs font-semibold" style={{ color: '#9B7E6A' }}>Skills practised</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-semibold"
                      style={{ background: '#F3E9DC', color: '#9B7E6A' }}
                    >
                      Skills unlock as {active.name} listens 🌙
                    </span>
                  </div>

                  <div className="mt-3">
                    <StreakBadge streak={streak} />
                  </div>
                </div>
              )
            })()}

            {/* Free usage card */}
            {!subscription.isPremium && (
              <div
                className="rounded-2xl border p-5"
                style={{ background: 'white', borderColor: '#EAD9C8', boxShadow: '0 2px 20px rgba(88,45,10,0.08)' }}
              >
                <div className="mb-3.5 flex items-center justify-between text-sm font-semibold" style={{ color: '#1A0A00' }}>
                  <span>Free Stories</span>
                  <span style={{ color: '#E8520A' }}>{storiesUsedThisMonth} / {FREE_LIMIT} used</span>
                </div>
                <div className="mb-2 h-2 overflow-hidden rounded-full" style={{ background: '#F3E9DC' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${Math.min(100, (storiesUsedThisMonth / FREE_LIMIT) * 100)}%`,
                      background: 'linear-gradient(90deg, #E8520A, #F26522)',
                    }}
                  />
                </div>
                <p className="text-xs" style={{ color: '#9B7E6A' }}>
                  {storiesLeft > 0
                    ? `${storiesLeft} free ${storiesLeft === 1 ? 'story' : 'stories'} left · Resets 1st of next month`
                    : 'Is mahine ki kahaniyaan khatam 🌙 Premium mein unlimited hai'}
                </p>
                <Link
                  href="/bolo-buddy/pricing"
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold text-white no-underline transition-all hover:-translate-y-0.5"
                  style={{ background: '#5B2D8E' }}
                >
                  ✨ Upgrade to Premium · ₹299/mo
                </Link>
              </div>
            )}

            {/* Referral card */}
            <Link href="/bolo-buddy/referral" className="no-underline">
              <div
                className="flex items-center justify-between rounded-2xl p-4 transition-all hover:-translate-y-0.5"
                style={{ background: '#FFD166' }}
              >
                <div>
                  <p className="font-bold text-sm" style={{ color: '#2D2D2D' }}>Dosto ko share karo</p>
                  <p className="text-xs mt-0.5" style={{ color: '#2D2D2D' }}>1 free kahani har referral pe 🌙</p>
                </div>
                <span className="text-xl">→</span>
              </div>
            </Link>

            {/* Mood quick-pick */}
            <div
              className="rounded-2xl border p-5"
              style={{ background: 'white', borderColor: '#EAD9C8', boxShadow: '0 2px 20px rgba(88,45,10,0.08)' }}
            >
              <div
                className="mb-0.5 text-base font-semibold"
                style={{ fontFamily: "'Playfair Display', serif", color: '#1A0A00' }}
              >
                Pick Tonight&apos;s Mood
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { emoji: '🌙', label: 'Bedtime' },
                  { emoji: '🤝', label: 'Kindness' },
                  { emoji: '🦁', label: 'Courage' },
                  { emoji: '🌿', label: 'Nature' },
                  { emoji: '🏛️', label: 'Mythology' },
                  { emoji: '✨', label: 'Aur bhi', href: '/bolo-buddy/stories' },
                ].map(({ emoji, label, href }) => (
                  <Link
                    key={label}
                    href={href ?? `/bolo-buddy/stories?mood=${label.toLowerCase()}`}
                    className="flex flex-col items-center gap-1 rounded-xl border border-solid py-2.5 text-center no-underline transition-all hover:-translate-y-0.5"
                    style={{
                      background: '#FAF3EC',
                      borderColor: '#EAD9C8',
                    }}
                  >
                    <span className="text-xl leading-none">{emoji}</span>
                    <span className="text-[10px] font-semibold" style={{ color: '#9B7E6A' }}>{label}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Preserved non-visual components ── */}
      {showPushPrompt && <PushPromptCard show={true} />}
      <UpgradeToast show={showUpgradeToast} />
      {showNps && accessToken && (
        <NpsTrigger show={showNps} accessToken={accessToken} />
      )}
    </div>
  )
}
