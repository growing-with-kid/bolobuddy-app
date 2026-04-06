'use client'

import { useState } from 'react'
import { saveConversationPrompt } from '@/app/bolo-buddy/actions'

export default function PostStoryPrompt({
  question,
  storyId,
  theme,
  onDismiss,
}: {
  question: string
  storyId?: string
  theme?: string
  onDismiss: () => void
}) {
  const [dismissed, setDismissed] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  if (dismissed) return null

  async function handleSave() {
    setSaving(true)
    setMessage(null)
    const result = await saveConversationPrompt({
      promptText: question,
      storyId,
      theme,
    })
    setSaving(false)
    if (result.atLimit) {
      setMessage('You’ve saved 10 questions. Remove one in settings to save another.')
      return
    }
    if (result.error) {
      setMessage(result.error)
      return
    }
    setSaved(true)
  }

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50/90 p-5">
      <p className="text-sm font-medium text-gray-700">
        If your child is still awake, you could ask…
      </p>
      <p className="mt-2 text-body-charcoal">{question}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setDismissed(true)
            onDismiss()
          }}
          className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Dismiss
        </button>
        {!saved ? (
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="text-sm font-medium text-cta-orange hover:underline disabled:opacity-70"
          >
            {saving ? 'Saving…' : 'Save this question'}
          </button>
        ) : (
          <span className="text-sm text-gray-500">Saved ✓</span>
        )}
      </div>
      {message && (
        <p className="mt-2 text-sm text-amber-700" role="alert">
          {message}
        </p>
      )}
    </div>
  )
}
