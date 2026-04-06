'use client'

import { useRouter } from 'next/navigation'

// ── Types ──────────────────────────────────────────────────────────────
type SystemStory = {
  id: string
  title: string
  mood: string
  language: string
  audio_url: string | null
  created_at: string
}

type Props = {
  stories: SystemStory[]
  childName: string
}

// ── Mood config ────────────────────────────────────────────────────────
const MOOD_CONFIG: Record<string, { label: string; emoji: string; bg: string; text: string }> = {
  bedtime:   { label: 'Bedtime',   emoji: '🌙', bg: 'bg-purple-100', text: 'text-purple-700' },
  mythology: { label: 'Mythology', emoji: '🏛️', bg: 'bg-amber-100',  text: 'text-amber-700'  },
  kindness:  { label: 'Kindness',  emoji: '🤝', bg: 'bg-green-100',  text: 'text-green-700'  },
  courage:   { label: 'Courage',   emoji: '🦁', bg: 'bg-orange-100', text: 'text-orange-700' },
  nature:    { label: 'Nature',    emoji: '🌿', bg: 'bg-emerald-100', text: 'text-emerald-700' },
}

const LANG_LABEL: Record<string, string> = {
  english:  'EN',
  hindi:    'HI',
  hinglish: 'HI/EN',
  tamil:    'TA',
}

// ── Component ──────────────────────────────────────────────────────────
export default function SystemStoriesShelf({ stories, childName }: Props) {
  const router = useRouter()

  if (!stories || stories.length === 0) return null

  function handleStoryTap(storyId: string) {
    router.push(`/bolo-buddy/stories/play/${storyId}`)
  }

  return (
    <section className="w-full min-w-0">
      {/* Section header */}
      <div className="mb-3 px-1">
        <h2 className="text-lg font-semibold text-gray-800">
          Aaj Raat Ki Kahaniyaan 🌙
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {stories.length} kahaniyaan, sunne ke liye tayyar
        </p>
      </div>

      {/* Horizontal scroll shelf — constrained to left column width */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1 min-w-0">
        {stories.map((story) => {
          const mood = MOOD_CONFIG[story.mood] ?? MOOD_CONFIG['bedtime']!
          const langLabel = LANG_LABEL[story.language] ?? story.language.toUpperCase()

          // Replace [child_name] placeholder with actual child name
          const displayTitle = story.title.replace(/\[child_name\]/gi, childName)

          return (
            <button
              key={story.id}
              onClick={() => handleStoryTap(story.id)}
              className="flex-shrink-0 min-w-[140px] h-auto min-h-[100px] rounded-2xl bg-white border border-gray-100 shadow-sm p-3 text-left hover:shadow-md active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {/* Mood emoji */}
              <div className="text-2xl mb-2">{mood.emoji}</div>

              {/* Title */}
              <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 mb-3">
                {displayTitle}
              </p>

              {/* Tags row */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${mood.bg} ${mood.text}`}>
                  {mood.label}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                  {langLabel}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
