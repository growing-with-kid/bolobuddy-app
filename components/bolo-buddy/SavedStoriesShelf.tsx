'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { SavedStoryRow } from '@/app/bolo-buddy/actions'

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

export default function SavedStoriesShelf({
  savedStories,
  onRemove,
}: {
  savedStories: SavedStoryRow[]
  onRemove?: (storyId: string) => void | Promise<unknown>
}) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  async function handleRemove(storyId: string) {
    if (onRemove) {
      await onRemove(storyId)
      router.refresh()
    }
  }

  if (savedStories.length === 0) return null

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/80">
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-medium text-gray-900">Saved stories</span>
        <span className="text-gray-500">{collapsed ? '▼' : '▲'}</span>
      </button>
      {!collapsed && (
        <div className="border-t border-gray-200 px-5 pb-4 pt-2">
          <ul className="space-y-2">
            {savedStories.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-900">{s.title}</p>
                  <p className="text-xs text-gray-500">
                    {s.language} · {MOOD_EMOJI[s.mood] ?? '✨'} · {formatDuration(s.duration_seconds)}
                  </p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Link
                    href={`/bolo-buddy/stories/play/${s.story_id}?replay=1`}
                    className="rounded-full bg-cta-orange px-4 py-1.5 text-sm font-medium text-white hover:opacity-90"
                  >
                    Replay
                  </Link>
                  {onRemove && (
                    <button
                      type="button"
                      onClick={() => handleRemove(s.story_id)}
                      className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
