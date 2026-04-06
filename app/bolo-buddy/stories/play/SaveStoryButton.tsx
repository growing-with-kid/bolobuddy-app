'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveStory, unsaveStory } from '@/app/bolo-buddy/actions'

const FREE_SAVED_LIMIT = 3

export default function SaveStoryButton({
  storyId,
  title,
  language,
  mood,
  durationSeconds,
  audioUrl,
  initialSaved,
  initialSavedCount,
  isPremium = true,
  onShowUpgrade,
}: {
  storyId: string
  title: string
  language: string
  mood: string
  durationSeconds?: number
  audioUrl: string
  initialSaved: boolean
  initialSavedCount: number
  isPremium?: boolean
  onShowUpgrade?: () => void
}) {
  const router = useRouter()
  const [saved, setSaved] = useState(initialSaved)
  const [savedCount, setSavedCount] = useState(initialSavedCount)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const atLimit = savedCount >= FREE_SAVED_LIMIT && !saved

  async function handleSave() {
    if (saved) {
      setLoading(true)
      const { error } = await unsaveStory(storyId)
      setLoading(false)
      if (error) {
        setMessage(error)
        return
      }
      setSaved(false)
      setSavedCount((c) => Math.max(0, c - 1))
      router.refresh()
      return
    }
    if (atLimit) {
      if (!isPremium && onShowUpgrade) {
        onShowUpgrade()
        return
      }
      setMessage("You've saved 3. Remove one to save another.")
      return
    }
    setLoading(true)
    setMessage(null)
    const result = await saveStory({
      storyId,
      title,
      language,
      mood,
      durationSeconds,
      audioUrl,
    })
    setLoading(false)
    if (result.atLimit) {
      if (!isPremium && onShowUpgrade) {
        onShowUpgrade()
        return
      }
      setMessage("You've saved 3. Remove one to save another.")
      return
    }
    if (result.error) {
      setMessage(result.error)
      return
    }
    setSaved(true)
    setSavedCount((c) => c + 1)
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleSave}
        disabled={loading}
        className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-70"
      >
        {saved ? 'Saved ✓' : 'Save Story'}
      </button>
      {message && (
        <p className="text-sm text-amber-700" role="alert">
          {message}
        </p>
      )}
    </div>
  )
}
