'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { markGwkCardShown } from '@/lib/bolo-buddy/session-story'
import { getDefaultGwkMemoryLibraryLink } from '@/lib/seo/internal-links'

export default function GwkMemorySparkCard({
  mood,
  onDismiss,
}: {
  mood?: string
  onDismiss?: () => void
}) {
  const link = getDefaultGwkMemoryLibraryLink(mood)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    markGwkCardShown()
    trackEvent('gwk_cross_promo_shown')
  }, [])

  if (!visible) return null

  function dismiss() {
    markGwkCardShown()
    setVisible(false)
    onDismiss?.()
  }

  function handleCtaClick() {
    trackEvent('gwk_cross_promo_clicked')
  }

  return (
    <div
      className="relative mt-4 rounded-2xl p-4 pl-5"
      style={{
        backgroundColor: '#FFF3D6',
        borderLeft: '3px solid #FBA81A',
      }}
    >
      <button
        type="button"
        onClick={dismiss}
        className="absolute top-3 right-3 text-lg leading-none text-gray-600 hover:text-gray-900"
        aria-label="Dismiss"
      >
        ×
      </button>

      <div className="flex gap-3 pr-6">
        <span className="text-xl" aria-hidden>
          🌱
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">Turn this into a memory?</p>
          <p className="mt-1 text-sm text-gray-700">
            Growing With Kid has an activity to match tonight&apos;s story.
          </p>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="mt-3 inline-block text-sm font-medium text-gray-900 hover:underline"
          >
            {link.label} →
          </a>
        </div>
      </div>
    </div>
  )
}
