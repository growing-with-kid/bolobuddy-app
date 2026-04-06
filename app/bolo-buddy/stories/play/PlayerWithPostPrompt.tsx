'use client'

import { useState, useRef, useEffect } from 'react'
import RecordPlayWrapper from './RecordPlayWrapper'
import PostStoryPrompt from '@/components/bolo-buddy/PostStoryPrompt'

const PROMPT_DELAY_MS = 3000

export default function PlayerWithPostPrompt({
  storyId,
  language,
  mood,
  src,
  isReplay,
  promptText,
}: {
  storyId: string
  language: string
  mood: string
  src: string
  isReplay: boolean
  promptText: string
}) {
  const [showPrompt, setShowPrompt] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  function onEnded() {
    if (isReplay) return
    timeoutRef.current = setTimeout(() => {
      setShowPrompt(true)
      timeoutRef.current = null
    }, PROMPT_DELAY_MS)
  }

  return (
    <>
      <RecordPlayWrapper
        storyId={storyId}
        language={language}
        mood={mood}
        src={src}
        isReplay={isReplay}
        onEnded={onEnded}
      />
      {showPrompt && (
        <PostStoryPrompt
          question={promptText}
          storyId={storyId}
          theme={mood}
          onDismiss={() => setShowPrompt(false)}
        />
      )}
    </>
  )
}
