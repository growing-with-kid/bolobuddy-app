'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import RecordPlayWrapper from '../RecordPlayWrapper'
import SaveStoryButton from '../SaveStoryButton'
import ShareStoryButton from '@/components/bolo-buddy/ShareStoryButton'
import UpgradeModal from '@/components/bolo-buddy/UpgradeModal'

function isUUID(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
}

function sanitizeTitleForFile(title: string): string {
  const safe = title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '')
  return (safe || 'story') + '.mp3'
}

const placeholderStory = `
Ravi was a little boy who lived in a small village near the mountains. Every night, his grandmother would sit by the lamp and tell him stories about the stars and the animals that lived in the forest.

One evening, Ravi saw a tiny glow near the window. It was a firefly! The firefly danced around the room and then flew out into the garden. Ravi followed it quietly, and there he found many more fireflies, lighting up the trees like little lanterns.

His grandmother had told him that fireflies were the stars that had come down to play. Ravi smiled and whispered thank you to the night, then went back to bed, feeling calm and happy. He closed his eyes and dreamed of flying with the fireflies under the moon.
`.trim()

const DEFAULT_AUDIO_SRC = '/audio/samples/nanis-moonlight-garden.mp3'
const DEFAULT_TITLE = "Tonight's Story"

type StoryRow = {
  id: string
  title: string
  text_content: string
  audio_url: string | null
  language: string
  mood: string
  created_at: string
}

type Props = {
  id: string
  language: string
  mood: string
  isReplay: boolean
  childName: string | null
  initialSavedStory: { audio_url?: string | null } | null
  initialSavedCount: number
  isPremium: boolean
}

export default function StoryPlayContent({
  id,
  language: initialLanguage,
  mood: initialMood,
  isReplay,
  childName,
  initialSavedStory,
  initialSavedCount,
  isPremium,
}: Props) {
  const [story, setStory] = useState<StoryRow | null>(null)
  const [loading, setLoading] = useState(isUUID(id))
  const [fetchError, setFetchError] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  useEffect(() => {
    if (!isUUID(id)) return
    const supabase = createClient()
    supabase
      .from('stories')
      .select('id, title, text_content, audio_url, language, mood, created_at')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        setLoading(false)
        if (error || !data) {
          setFetchError(true)
          return
        }
        const row = data as StoryRow
        setStory(row)
      })
  }, [id])

  if (isUUID(id) && loading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <Link
            href="/bolo-buddy/dashboard"
            className="mb-6 inline-block text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Back
          </Link>
          {childName && (
            <div className="mb-1 h-4 w-48 animate-pulse rounded bg-gray-100" />
          )}
          <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
          <div className="mt-6 h-24 animate-pulse rounded-lg bg-gray-100" />
          <div className="mt-8 space-y-4">
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      </div>
    )
  }

  if (isUUID(id) && (fetchError || !story)) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <p className="font-medium text-gray-900">Yeh kahani nahi mili 🌙</p>
          <p className="mt-2 text-sm text-gray-600">
            We could not find this story. It may have been removed or the link is incorrect.
          </p>
          <Link
            href="/bolo-buddy/stories"
            className="mt-6 inline-block rounded-full bg-cta-orange px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Back to stories
          </Link>
        </div>
      </div>
    )
  }

  const isRealStory = isUUID(id) && story
  const rawTitle = isRealStory ? story.title : DEFAULT_TITLE
  const displayTitle = rawTitle?.replace(/\[child_name\]/gi, childName ?? 'beta') ?? rawTitle
  const audioSrc = isRealStory && story.audio_url
    ? story.audio_url
    : isReplay && initialSavedStory?.audio_url
      ? initialSavedStory.audio_url
      : DEFAULT_AUDIO_SRC
  const rawStoryBody = isRealStory ? story.text_content : placeholderStory
  const displayBody = (rawStoryBody ?? '').replace(/\[child_name\]/gi, childName ?? 'beta')
  const language = isRealStory ? story.language : initialLanguage
  const mood = isRealStory ? story.mood : initialMood

  const downloadableAudioUrl =
    (isRealStory && story?.audio_url) || (isReplay && initialSavedStory?.audio_url)
      ? audioSrc
      : null

  async function handleDownload() {
    if (!isPremium) {
      setShowUpgradeModal(true)
      return
    }
    if (!downloadableAudioUrl) return
    setDownloadError(null)
    setDownloading(true)
    try {
      const res = await fetch(downloadableAudioUrl)
      if (!res.ok) throw new Error('Fetch failed')
      const blob = await res.blob()
      const mime = blob.type || 'audio/mpeg'
      const blobForDownload = mime.startsWith('audio/') ? blob : new Blob([await blob.arrayBuffer()], { type: 'audio/mpeg' })
      const url = URL.createObjectURL(blobForDownload)
      const a = document.createElement('a')
      a.href = url
      const filename = sanitizeTitleForFile(displayTitle)
      a.download = filename.endsWith('.mp3') ? filename : `${filename.replace(/\.\w+$/, '') || 'story'}.mp3`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      setDownloadError('Download nahi hua, dobara try karein')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Link
          href="/bolo-buddy/dashboard"
          className="mb-6 inline-block text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back
        </Link>
        {childName && (
          <p className="mb-1 text-sm text-gray-600">
            A story for {childName}…
          </p>
        )}
        <h1 className="font-serif text-2xl font-semibold text-gray-900 sm:text-3xl">
          {isRealStory ? displayTitle : 'Your Story is Ready'}
        </h1>

        <div className="mt-6">
          <RecordPlayWrapper
            key={id}
            storyId={id}
            language={language}
            mood={mood}
            src={audioSrc}
            isReplay={isReplay}
          />
        </div>

        <div className="mt-8 space-y-4 text-gray-700 leading-relaxed">
          {displayBody.split('\n\n').filter(Boolean).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-start gap-3">
          <SaveStoryButton
            storyId={id}
            title={displayTitle}
            language={language}
            mood={mood}
            audioUrl={audioSrc}
            initialSaved={!!initialSavedStory}
            initialSavedCount={initialSavedCount}
            isPremium={isPremium}
            onShowUpgrade={() => setShowUpgradeModal(true)}
          />
          <ShareStoryButton
            storyId={id}
            storyTitle={displayTitle}
            childName={childName}
            language={language}
          />
          <Link
            href="/bolo-buddy/stories"
            className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            Generate Another
          </Link>
          <span className="inline-flex flex-col items-start gap-1">
            <button
              type="button"
              disabled={downloading || (isPremium && !downloadableAudioUrl)}
              title={
                !isPremium
                  ? 'Upgrade to download'
                  : !downloadableAudioUrl
                    ? "Demo stories can't be downloaded"
                    : undefined
              }
              onClick={handleDownload}
              className="min-h-[44px] min-w-[44px] rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 inline-flex items-center justify-center"
            >
              {downloading ? 'Downloading...' : 'Download'}
            </button>
            {downloadError && (
              <span className="text-sm text-red-600">{downloadError}</span>
            )}
          </span>
        </div>

        <section className="mt-10 rounded-2xl border border-gray-100 bg-gray-50 p-5">
          <h2 className="text-sm font-semibold text-gray-900">Parent Summary</h2>
          <p className="mt-2 text-sm text-gray-600">
            What this story practised: Empathy, Imagination, Language
          </p>
        </section>
      </div>
      {showUpgradeModal && (
        <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
      )}
    </div>
  )
}
