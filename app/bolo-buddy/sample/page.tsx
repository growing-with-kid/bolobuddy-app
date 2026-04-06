'use client'

import Link from 'next/link'
import { useState } from 'react'
import BoloFooter from '@/components/bolo-buddy/Footer'
import { SAMPLE_STORIES, type SampleStoryId } from '@/lib/sample-stories'

const storyIds = Object.keys(SAMPLE_STORIES) as SampleStoryId[]

type ViewMode = 'list' | 'grid'

function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

export default function SampleSelectPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')

  return (
    <div className="relative min-h-screen bg-[#FFF8F0] font-[var(--font-dm-sans)]">
      {/* Decorative stars */}
      <span
        className="absolute right-8 top-12 text-[#FF5C1A] opacity-[0.15]"
        style={{ fontSize: '10px' }}
        aria-hidden
      >
        ✦
      </span>
      <span
        className="absolute right-16 top-20 text-[#FF5C1A] opacity-[0.15]"
        style={{ fontSize: '14px' }}
        aria-hidden
      >
        ✶
      </span>
      <span
        className="absolute right-12 top-28 text-[#FF5C1A] opacity-[0.15]"
        style={{ fontSize: '8px' }}
        aria-hidden
      >
        ✦
      </span>

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-8">
        <Link
          href="/bolo-buddy"
          className="mb-6 inline-block text-sm font-medium text-[#7A6A5A] hover:text-[#1A1A2E]"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          ← Back
        </Link>

        {/* Decorative header + view toggle */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p
              className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[#FF5C1A]/80"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              <span aria-hidden>🌙</span> Sample Stories
            </p>
            <h1
              className="mt-2 text-2xl font-bold text-[#1A1A2E] sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair-display)' }}
            >
              Choose a story for tonight
            </h1>
            <p
              className="mt-2 text-sm text-[#7A6A5A]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              No sign up needed. Just press play.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 sm:mt-0">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="rounded-lg p-2 transition-colors hover:bg-white/60 aria-pressed:bg-white aria-pressed:shadow-sm"
              aria-pressed={viewMode === 'list'}
              aria-label="List view"
              title="List view"
            >
              <ListIcon className={`h-5 w-5 ${viewMode === 'list' ? 'text-[#FF5C1A]' : 'text-[#7A6A5A]'}`} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className="rounded-lg p-2 transition-colors hover:bg-white/60 aria-pressed:bg-white aria-pressed:shadow-sm"
              aria-pressed={viewMode === 'grid'}
              aria-label="Grid view"
              title="Grid view"
            >
              <GridIcon className={`h-5 w-5 ${viewMode === 'grid' ? 'text-[#FF5C1A]' : 'text-[#7A6A5A]'}`} />
            </button>
          </div>
        </div>

        <div
          className={`mt-8 gap-4 ${viewMode === 'list' ? 'flex flex-col' : 'grid grid-cols-1 sm:grid-cols-2'}`}
        >
          {storyIds.map((id) => {
            const story = SAMPLE_STORIES[id]
            return (
              <Link
                key={id}
                href={`/bolo-buddy/sample/play/${id}`}
                className="flex items-center gap-3 rounded-[20px] border border-[#F0E8E0] border-l-4 border-l-[#FF5C1A]/40 bg-white p-5 shadow-[0px_4px_20px_rgba(255,92,26,0.06)] transition-all duration-150 cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-[#FF5C1A]/30 hover:shadow-[0px_6px_24px_rgba(255,92,26,0.1)]"
              >
                <div className="min-w-0 flex-1">
                  <h2
                    className="text-lg font-bold text-[#1A1A2E]"
                    style={{ fontFamily: 'var(--font-playfair-display)' }}
                  >
                    {story.title}
                  </h2>
                  <p
                    className="mt-1 text-sm text-[#7A6A5A]"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {story.subtitle}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full bg-[#FFF3EE] px-3 py-0.5 text-xs font-semibold text-[#FF5C1A]"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {story.language}
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                      Age {story.ageRange}
                    </span>
                    <span
                      className="text-xs text-gray-400 ml-2"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      🎧 {story.duration}
                    </span>
                    <span
                      className="text-xs text-[#B0A090]"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      Voice: {story.voice}
                    </span>
                  </div>
                </div>
                <span
                  className="flex-shrink-0 text-[#FF5C1A]/70"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                  aria-hidden
                >
                  →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
      <BoloFooter />
    </div>
  )
}
