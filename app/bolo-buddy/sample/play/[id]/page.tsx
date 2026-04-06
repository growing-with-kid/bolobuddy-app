'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useRef, useState } from 'react'
import BoloFooter from '@/components/bolo-buddy/Footer'
import { SAMPLE_STORIES, type SampleStoryId } from '@/lib/sample-stories'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function SamplePlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const story = id in SAMPLE_STORIES ? SAMPLE_STORIES[id as SampleStoryId] : null

  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [showPostSamplePrompt, setShowPostSamplePrompt] = useState(true)
  const [showSignupCTA, setShowSignupCTA] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem('bolo_sample_prompt_dismissed') === '1') {
        setShowPostSamplePrompt(false)
      }
    } catch {
      // ignore
    }
  }, [])

  function dismissPostSamplePrompt() {
    setShowPostSamplePrompt(false)
    try {
      sessionStorage.setItem('bolo_sample_prompt_dismissed', '1')
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    if (!story) {
      router.replace('/bolo-buddy/sample')
      return
    }
  }, [story, router])

  useEffect(() => {
    const el = audioRef.current
    if (!el || !story) return

    const onTimeUpdate = () => {
      const t = el.currentTime
      setCurrentTime(t)
      if (el.duration > 0 && t / el.duration >= 0.8) setShowSignupCTA(true)
    }
    const onLoadedMetadata = () => setDuration(el.duration)
    const onEnded = () => {
      setPlaying(false)
      setCurrentTime(0)
      setHasPlayed(true)
      setShowSignupCTA(true)
    }

    el.addEventListener('timeupdate', onTimeUpdate)
    el.addEventListener('loadedmetadata', onLoadedMetadata)
    el.addEventListener('ended', onEnded)
    return () => {
      el.removeEventListener('timeupdate', onTimeUpdate)
      el.removeEventListener('loadedmetadata', onLoadedMetadata)
      el.removeEventListener('ended', onEnded)
      el.pause()
    }
  }, [story])

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  function togglePlay() {
    const el = audioRef.current
    if (!el) return
    if (playing) {
      el.pause()
    } else {
      el.play()
      setHasPlayed(true)
    }
    setPlaying(!playing)
  }

  if (!story) {
    return null
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="relative min-h-screen min-w-full w-full overflow-x-hidden bg-[#FFF8F0] font-[var(--font-dm-sans)]">
      {/* Decorative circle behind header */}
      <div
        className="absolute right-[-100px] top-[-100px] z-0 h-[300px] w-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,92,26,0.06) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 py-8">
        <div className="px-4">
          <Link
            href="/bolo-buddy/sample"
            className="mb-6 inline-block text-sm font-medium text-[#7A6A5A] hover:text-[#1A1A2E]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            ← Back
          </Link>

          {/* Story title as primary headline */}
          <h1
            className="text-[26px] font-bold leading-tight text-[#1A1A2E]"
            style={{ fontFamily: 'var(--font-playfair-display)' }}
          >
            {story.title}
          </h1>
          <p
            className="mt-2 text-sm text-[#7A6A5A]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            {story.subtitle}
          </p>
          <p
            className="mt-1.5 text-[13px] text-[#B0A090]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            🎙 {story.voice} · {story.language}
          </p>
        </div>

        {/* Cards container — same width and alignment */}
        <div className="mx-auto mt-8 flex w-full max-w-xl flex-col gap-4 px-4">
          {/* Audio player card */}
          <div className="relative overflow-hidden rounded-[24px] bg-[#1A1A2E] p-6 shadow-[0_0_40px_rgba(255,92,26,0.15)]">
            <span
              className="absolute right-4 top-4 text-2xl opacity-20"
              aria-hidden
            >
              🌙
            </span>
            <audio ref={audioRef} src={story.audioSrc} preload="metadata" />
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={togglePlay}
                className="flex h-[52px] w-[52px] min-h-[44px] min-w-[44px] flex-shrink-0 items-center justify-center rounded-full bg-[#FF6B35] text-white transition-opacity hover:opacity-90"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? (
                  <span className="text-xl" style={{ fontFamily: 'system-ui' }}>
                    ❚❚
                  </span>
                ) : (
                  <span className="ml-0.5 text-xl">▶</span>
                )}
              </button>
              <div className="min-w-0 flex-1">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={currentTime}
                  onChange={(e) => {
                    const val = Number(e.target.value)
                    if (audioRef.current) {
                      audioRef.current.currentTime = val
                      setCurrentTime(val)
                    }
                  }}
                  className="w-full accent-[#FF6B35] cursor-pointer"
                />
                <div className="mt-2 flex items-center justify-between">
                  <p
                    className="text-[13px] text-white/60"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {formatTime(currentTime)} / {story.duration}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = 0
                        setCurrentTime(0)
                        audioRef.current.play()
                        setPlaying(true)
                      }
                    }}
                    className="text-sm text-white/60 hover:text-[#FF6B35] transition-colors"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    ↺ Replay
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA card — only after 80% played or ended */}
          {showSignupCTA && (
          <div
            className="rounded-[20px] border border-[#FFE0D0] p-5"
            style={{
              background: 'linear-gradient(135deg, #FFF3EE 0%, #FFF9F5 100%)',
            }}
          >
            <h2
              className="text-lg font-bold text-[#1A1A2E]"
              style={{ fontFamily: 'var(--font-playfair-display)' }}
            >
              Love this story?
            </h2>
            <p
              className="mt-1.5 text-[13px] text-[#7A6A5A]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Create a free account to save it and get 3 more stories every month.
            </p>
            <Link
              href="/bolo-buddy/signup"
              className="mt-4 flex w-full items-center justify-center rounded-full bg-[#FF6B35] hover:bg-[#e55a25] px-7 py-3 text-sm font-bold text-white transition-colors min-h-[56px] sm:w-auto"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Create free account
            </Link>
          </div>
          )}

          {/* Post-sample playback prompt — calm, dismissible (Sprint 2) */}
          {hasPlayed && showPostSamplePrompt && (
            <div
              className="rounded-[20px] border border-[#F0E8E0] bg-white p-5 relative"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              <button
                type="button"
                onClick={dismissPostSamplePrompt}
                className="absolute top-4 right-4 text-[#7A6A5A] hover:text-[#1A1A2E] text-lg leading-none"
                aria-label="Dismiss"
              >
                ×
              </button>
              <p className="text-[#1A1A2E] text-base pr-8">
                Your child can have this every night.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/bolo-buddy/signup"
                  className="text-sm font-semibold text-[#FF5C1A] hover:underline"
                >
                  Sign up
                </Link>
                <button
                  type="button"
                  onClick={dismissPostSamplePrompt}
                  className="text-sm text-[#7A6A5A] hover:text-[#1A1A2E]"
                >
                  Maybe later
                </button>
              </div>
            </div>
          )}

          {/* Story preview */}
          {'preview' in story && story.preview && (
            <div className="overflow-hidden rounded-2xl border border-[#F0E8E0] bg-white p-5" style={{ maxHeight: '100px' }}>
              <h3
                className="text-base italic text-[#7A6A5A]"
                style={{ fontFamily: 'var(--font-playfair-display)' }}
              >
                A glimpse of the story...
              </h3>
              <p
                className="mt-2 text-sm text-[#7A6A5A]"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  lineHeight: 1.7,
                  WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                }}
              >
                {story.preview}
              </p>
              <p className="text-xs text-center text-gray-400 mt-2 italic">
                Sign up to read along while listening
              </p>
            </div>
          )}
        </div>
      </div>
      <BoloFooter />
    </div>
  )
}
