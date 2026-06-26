'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { markGwkCardShown } from '@/lib/bolo-buddy/session-story'

const GWK_MEMORY_LIBRARY = 'https://www.growingwithkid.com/memory-library'

export default function GwkMemorySparkCard({
  storyCount,
  onDismiss,
}: {
  storyCount: number
  onDismiss?: () => void
}) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    markGwkCardShown()
    trackEvent('gwk_bridge_card_shown', {
      story_count: storyCount,
      timestamp: Date.now(),
    })
  }, [storyCount])

  if (!visible) return null

  function dismiss() {
    trackEvent('gwk_bridge_card_dismissed', {})
    setVisible(false)
    onDismiss?.()
  }

  function handleCtaClick() {
    trackEvent('gwk_bridge_card_clicked', { story_count: storyCount })
  }

  return (
    <div
      className="relative"
      style={{
        backgroundColor: '#FFF3D6',
        borderLeft: '3px solid #FBA81A',
        borderRadius: '0 12px 12px 0',
        padding: '16px 20px',
        marginTop: '16px',
      }}
    >
      <button
        type="button"
        onClick={dismiss}
        className="absolute top-3 right-3 text-lg leading-none hover:opacity-80"
        style={{ color: '#8A7B6F' }}
        aria-label="Dismiss"
      >
        ×
      </button>

      <div className="flex gap-3 pr-6">
        <span className="text-[20px] leading-none" aria-hidden>
          🌱
        </span>
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-[#2D2D2D]">
            Turn this into a memory?
          </p>
          <p className="mt-1 text-[13px] text-[#8A7B6F]">
            Growing With Kid has a quick family activity to go with tonight&apos;s story.
          </p>
          <a
            href={GWK_MEMORY_LIBRARY}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="mt-3 inline-block rounded-[20px] bg-[#FF6B35] px-4 py-2 text-[13px] font-semibold text-white no-underline transition-colors hover:bg-[#e55c25]"
          >
            See tonight&apos;s activity →
          </a>
        </div>
      </div>
    </div>
  )
}
