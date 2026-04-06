'use client'

import { useState } from 'react'
import { getShareMessage, getShareUrl } from '@/lib/bolo-buddy/share-messages'

export default function ShareStoryButton({
  storyId,
  storyTitle,
  childName,
  language,
}: {
  storyId: string
  storyTitle: string
  childName: string | null
  language: string
}) {
  const [copied, setCopied] = useState(false)

  const lang = (language === 'hi' || language === 'hinglish' ? language : 'en') as 'en' | 'hi' | 'hinglish'
  const text = getShareMessage({ storyTitle, childName, language: lang, storyId })
  const url = getShareUrl(storyId)

  async function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: storyTitle,
          text,
          url,
        })
        return
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(`${text}\n\n${url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={handleShare}
        className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Share
      </button>
      {copied && (
        <span className="text-xs text-gray-500">Link copied</span>
      )}
    </div>
  )
}
