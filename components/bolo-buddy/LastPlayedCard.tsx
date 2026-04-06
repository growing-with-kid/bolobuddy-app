'use client'

import Link from 'next/link'
import type { StoryPlayRow } from '@/app/bolo-buddy/actions'

const MOOD_EMOJI: Record<string, string> = {
  happy: '😊',
  sleepy: '😴',
  curious: '🤔',
  sad: '🌧',
}

function formatDuration(sec: number | null): string {
  if (sec == null || sec <= 0) return '—'
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function LastPlayedCard({ play }: { play: StoryPlayRow }) {
  const moodEmoji = MOOD_EMOJI[play.mood] ?? '✨'
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Last played</p>
      <p className="mt-1 font-serif text-lg font-semibold text-gray-900">{play.title}</p>
      <p className="mt-1 text-sm text-gray-600">
        {play.language} · {moodEmoji} · {formatDuration(play.duration_seconds)}
      </p>
      <Link
        href={`/bolo-buddy/stories/play/${play.story_id}?replay=1`}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-cta-orange px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Replay
      </Link>
    </div>
  )
}
