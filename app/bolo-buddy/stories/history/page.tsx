import { redirect } from 'next/navigation'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { getChildProfiles } from '../../actions'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Pichli Kahaniyaan | Bolo Buddy',
  description: 'Your story history.',
}

const MOOD_EMOJI: Record<string, string> = {
  bedtime: '🌙',
  kindness: '🤝',
  courage: '🦁',
  nature: '🌿',
  mythology: '🪔',
}

const LANGUAGE_LABEL: Record<string, string> = {
  hindi: 'हिंदी',
  english: 'English',
  hinglish: 'Hinglish',
  tamil: 'தமிழ்',
}

function formatDate(createdAt: string): string {
  const d = new Date(createdAt)
  const day = d.getDate()
  const month = d.toLocaleString('en-IN', { month: 'short' })
  return `${day.toString().padStart(2, '0')} ${month}`
}

type StoryRow = {
  id: string
  title: string
  language: string
  mood: string
  created_at: string
  audio_url: string | null
}

export default async function StoryHistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/bolo-buddy/signup')

  const childProfiles = await getChildProfiles()
  const cookieStore = await cookies()
  const activeChildId = cookieStore.get('bolo_active_child_id')?.value ?? null
  const activeProfileId =
    (user.user_metadata?.active_child_profile_id as string | undefined) ??
    activeChildId ??
    childProfiles[0]?.id ??
    null

  let stories: StoryRow[] = []
  if (activeProfileId) {
    const { data } = await supabase
      .from('stories')
      .select('id, title, language, mood, created_at, audio_url')
      .eq('child_profile_id', activeProfileId)
      .order('created_at', { ascending: false })
      .limit(50)
    stories = (data ?? []) as StoryRow[]
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Link
          href="/bolo-buddy/dashboard"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Dashboard
        </Link>
        <h1 className="mt-4 font-bold text-2xl text-[#7B2FBE]">
          Pichli Kahaniyaan
        </h1>

        {stories.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">
            <p className="text-gray-600">Abhi tak koi kahani nahi bani 🌙</p>
            <Link
              href="/bolo-buddy/stories"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#FF6B35] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              Pehli Kahani Banao
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {stories.map((story) => {
              const moodEmoji = MOOD_EMOJI[story.mood?.toLowerCase()] ?? '✨'
              const languageLabel = LANGUAGE_LABEL[story.language?.toLowerCase()] ?? story.language
              return (
                <li key={story.id}>
                  <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF8F0] text-2xl">
                      {moodEmoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-[#2D2D2D]">{story.title}</p>
                      <p className="text-sm text-gray-400">{formatDate(story.created_at)}</p>
                      <span className="mt-1 inline-block rounded-full bg-[#FFD166] px-2 py-1 text-xs text-[#2D2D2D]">
                        {languageLabel}
                      </span>
                    </div>
                    <Link
                      href={`/bolo-buddy/stories/play/${story.id}`}
                      className="shrink-0 rounded-[100px] px-4 py-2 text-sm font-bold text-white"
                      style={{ backgroundColor: '#FF6B35' }}
                    >
                      Sunao
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
