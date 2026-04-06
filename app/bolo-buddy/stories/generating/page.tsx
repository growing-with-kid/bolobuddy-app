'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const PHRASES = [
  'Ek baar ki baat hai...',
  'Taare ginn rahe hain...',
  'Sapno ki duniya ban rahi hai...',
  'Pari aa rahi hai...',
  'Kahani tayaar ho rahi hai...',
]

const POLL_INTERVAL_MS = 3000
const PROGRESS_DURATION_MS = 15000
const PROGRESS_MAX = 95
const PROGRESS_TICK_MS = 100

type PollStatus = 'pending' | 'processing' | 'completed' | 'failed'

function GeneratingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const storyId = searchParams.get('storyId')
  const language = searchParams.get('language') ?? 'english'
  const mood = searchParams.get('mood') ?? 'bedtime'

  const [phase, setPhase] = useState<'loading' | 'polling' | 'completed' | 'failed'>('loading')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [imageError, setImageError] = useState(false)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const fetchStatus = useCallback(async (): Promise<PollStatus | null> => {
    const supabase = createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session?.access_token) return null

    const res = await fetch(`/api/stories/${storyId}/status`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    })
    if (res.status === 401) return null
    if (res.status === 404) return 'failed'
    if (!res.ok) return 'failed'
    const data = (await res.json()) as { status: PollStatus; storyId: string }
    return data.status
  }, [storyId])

  useEffect(() => {
    if (!storyId) {
      router.replace('/bolo-buddy/stories')
      return
    }

    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        router.replace('/bolo-buddy/signup')
        return
      }
      setPhase('polling')
    })
  }, [storyId, router])

  useEffect(() => {
    if (phase !== 'polling' || !storyId) return

    const tick = async () => {
      const status = await fetchStatus()
      if (status === null) {
        router.replace('/bolo-buddy/signup')
        return
      }
      if (status === 'completed') {
        setPhase('completed')
        return
      }
      if (status === 'failed') {
        setPhase('failed')
        return
      }
    }

    tick()
    pollRef.current = setInterval(tick, POLL_INTERVAL_MS)
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [phase, storyId, fetchStatus, router])

  useEffect(() => {
    if (phase === 'completed') {
      if (pollRef.current) {
        clearInterval(pollRef.current)
        pollRef.current = null
      }
      setProgress(100)
      router.replace(
        `/bolo-buddy/stories/play/${storyId}?language=${encodeURIComponent(language)}&mood=${encodeURIComponent(mood)}`
      )
      return
    }
  }, [phase, storyId, language, mood, router])

  useEffect(() => {
    if (phase === 'failed' || phase === 'completed') return
    if (storyId && startTimeRef.current === null) startTimeRef.current = Date.now()

    progressRef.current = setInterval(() => {
      const start = startTimeRef.current ?? Date.now()
      const elapsed = Date.now() - start
      const p = Math.min(
        PROGRESS_MAX,
        Math.round((elapsed / PROGRESS_DURATION_MS) * PROGRESS_MAX)
      )
      setProgress(p)
    }, PROGRESS_TICK_MS)

    return () => {
      if (progressRef.current) clearInterval(progressRef.current)
      progressRef.current = null
    }
  }, [phase, storyId])

  useEffect(() => {
    if (phase !== 'polling' && phase !== 'loading') return
    const id = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % PHRASES.length)
    }, POLL_INTERVAL_MS)
    return () => clearInterval(id)
  }, [phase])

  if (!storyId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF8F0]">
        <p className="text-body-charcoal">Loading…</p>
      </div>
    )
  }

  if (phase === 'failed') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFF8F0] px-4">
        <p className="text-center text-xl font-medium text-[#7B2FBE]">
          Kahani nahi ban payi 🌙
        </p>
        <button
          type="button"
          onClick={() => router.push('/bolo-buddy/stories')}
          className="mt-6 rounded-full bg-[#FF6B35] px-6 py-3 font-medium text-white hover:opacity-90"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFF8F0] px-4">
      <div className="flex flex-col items-center">
        <div className="mb-6 flex justify-center">
          {imageError ? (
            <span className="text-5xl" aria-hidden>
              🧚‍♀️
            </span>
          ) : (
            <Image
              src="/images/pari-loading.png"
              alt=""
              width={120}
              height={120}
              unoptimized
              onError={() => setImageError(true)}
              className="animate-spin"
            />
          )}
        </div>
        <h1 className="text-center text-2xl font-semibold text-[#7B2FBE] sm:text-3xl">
          Kahani ban rahi hai...
        </h1>
        <p className="mt-4 text-center text-lg text-gray-700">
          {PHRASES[phraseIndex]}
        </p>
        <div className="mt-8 w-full max-w-xs overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-[#FF6B35] transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default function GeneratingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
          <div className="text-5xl">🧚‍♀️</div>
        </div>
      }
    >
      <GeneratingContent />
    </Suspense>
  )
}
