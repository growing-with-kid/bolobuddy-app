import Link from 'next/link'

export type LastStoryCardStory = {
  id: string
  title: string
  language: string
  mood: string
  created_at: string
}

const LANGUAGE_LABEL: Record<string, string> = {
  hindi: 'हिंदी',
  english: 'English',
  hinglish: 'Hinglish',
  tamil: 'தமிழ்',
}

const MOOD_EMOJI: Record<string, string> = {
  bedtime: '🌙',
  kindness: '🤝',
  courage: '🦁',
  nature: '🌿',
  mythology: '🪔',
}

function isToday(createdAt: string): boolean {
  const created = new Date(createdAt)
  const today = new Date()
  return (
    created.getUTCFullYear() === today.getUTCFullYear() &&
    created.getUTCMonth() === today.getUTCMonth() &&
    created.getUTCDate() === today.getUTCDate()
  )
}

export default function LastStoryCard({
  lastStory,
}: {
  lastStory: LastStoryCardStory | null
}) {
  if (!lastStory) {
    return (
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="font-medium text-gray-900">Aaj pehli kahani sunao 🌙</p>
        <Link
          href="/bolo-buddy/stories"
          className="mt-4 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#FF6B35' }}
        >
          Kahani Shuru Karo
        </Link>
      </div>
    )
  }

  const dateLabel = isToday(lastStory.created_at) ? 'Aaj ki kahani' : 'Kal ki kahani'
  const languageLabel = LANGUAGE_LABEL[lastStory.language.toLowerCase()] ?? lastStory.language
  const moodEmoji = MOOD_EMOJI[lastStory.mood.toLowerCase()] ?? '✨'

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {dateLabel}
      </p>
      <p className="mt-1 font-serif text-lg font-semibold text-gray-900">{lastStory.title}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{ backgroundColor: '#FFD166', color: '#2D2D2D' }}
        >
          {languageLabel}
        </span>
        <span className="text-sm text-gray-600">{moodEmoji}</span>
      </div>
      <Link
        href={`/bolo-buddy/stories/play/${lastStory.id}`}
        className="mt-4 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#FF6B35' }}
      >
        Dobara Sunao
      </Link>
    </div>
  )
}
