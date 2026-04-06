'use client'

import { useRef, useEffect, useState } from 'react'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** Placeholder audio for generated story (uses a sample until real generation exists). */
const DEFAULT_AUDIO_SRC = '/audio/samples/nanis-moonlight-garden.mp3'

export default function StoryAudioPlayer({
  src = DEFAULT_AUDIO_SRC,
  storyId,
  onDurationKnown,
  onEnded,
}: {
  src?: string
  storyId?: string
  onDurationKnown?: (durationSeconds: number) => void
  onEnded?: () => void
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const durationReportedRef = useRef(false)

  // When src or story changes, reload the audio element so it plays the correct story (BUG-01)
  useEffect(() => {
    const el = audioRef.current
    if (!el || !src) return
    el.src = src
    el.load()
    durationReportedRef.current = false
    setPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [src, storyId])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return

    const onTimeUpdate = () => setCurrentTime(el.currentTime)
    const onLoadedMetadata = () => {
      const d = el.duration
      setDuration(d)
      if (onDurationKnown && !durationReportedRef.current && Number.isFinite(d)) {
        durationReportedRef.current = true
        onDurationKnown(Math.round(d))
      }
    }
    const handleEnded = () => {
      setPlaying(false)
      setCurrentTime(0)
      onEnded?.()
    }

    el.addEventListener('timeupdate', onTimeUpdate)
    el.addEventListener('loadedmetadata', onLoadedMetadata)
    el.addEventListener('ended', handleEnded)
    return () => {
      el.removeEventListener('timeupdate', onTimeUpdate)
      el.removeEventListener('loadedmetadata', onLoadedMetadata)
      el.removeEventListener('ended', handleEnded)
      el.pause()
    }
  }, [onDurationKnown, onEnded])

  function togglePlay() {
    const el = audioRef.current
    if (!el) return
    if (playing) {
      el.pause()
    } else {
      el.play()
    }
    setPlaying(!playing)
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <audio
        key={storyId ?? src}
        ref={audioRef}
        src={src}
        preload="metadata"
      />
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-12 w-12 min-h-[44px] min-w-[44px] flex-shrink-0 items-center justify-center rounded-full bg-cta-orange text-white transition-opacity hover:opacity-90"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <span className="text-lg">❚❚</span>
          ) : (
            <span className="ml-0.5 text-lg">▶</span>
          )}
        </button>
        <div className="min-w-0 flex-1">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-cta-orange transition-[width] duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>
      </div>
    </div>
  )
}
