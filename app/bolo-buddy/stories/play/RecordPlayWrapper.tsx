'use client'

import { useRef } from 'react'
import StoryAudioPlayer from './StoryAudioPlayer'
import { recordPlay } from '@/app/bolo-buddy/actions'

const DEFAULT_TITLE = "Tonight's Story"

export default function RecordPlayWrapper({
  storyId,
  language,
  mood,
  src,
  isReplay,
  onEnded,
}: {
  storyId: string
  language: string
  mood: string
  src?: string
  isReplay?: boolean
  onEnded?: () => void
}) {
  const recordedRef = useRef(false)

  function onDurationKnown(durationSeconds: number) {
    if (isReplay) return
    if (recordedRef.current) return
    recordedRef.current = true
    recordPlay({
      storyId,
      title: DEFAULT_TITLE,
      language,
      mood,
      durationSeconds,
    })
  }

  return (
    <StoryAudioPlayer
      storyId={storyId}
      src={src}
      onDurationKnown={onDurationKnown}
      onEnded={onEnded}
    />
  )
}
