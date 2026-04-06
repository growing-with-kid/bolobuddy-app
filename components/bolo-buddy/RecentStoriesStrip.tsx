'use client'

import Link from 'next/link'
import type { StoryPlayRow } from '@/app/bolo-buddy/actions'

const MOOD_EMOJI: Record<string, string> = {
  happy: '😊',
  sleepy: '😴',
  curious: '🤔',
  sad: '🌧',
}

export default function RecentStoriesStrip({ plays }: { plays: StoryPlayRow[] }) {
  if (plays.length === 0) return null

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-700">Recent stories</p>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {plays.map((play) => (
          <Link
            key={play.id}
            href={`/bolo-buddy/stories/play/${play.story_id}?replay=1`}
            className="flex min-w-[180px] flex-shrink-0 flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="font-medium text-gray-900 line-clamp-2">{play.title}</p>
            <p className="mt-1 text-xs text-gray-500">
              {play.language} · {MOOD_EMOJI[play.mood] ?? '✨'}
            </p>
            <span className="mt-2 text-xs font-medium text-cta-orange">Replay →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
