import Link from 'next/link'
import StoryAudioPlayer from '@/app/bolo-buddy/stories/play/StoryAudioPlayer'
import { SAMPLE_STORIES, type SampleStoryId } from '@/lib/sample-stories'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

const DEFAULT_TITLE = "Tonight's Story"
const DEFAULT_AUDIO = '/audio/samples/nanis-moonlight-garden.mp3'
const DEFAULT_META = {
  title: 'Listen to a story | Bolo Buddy',
  description: 'A calm audio story — no screens, no ads. Start free.',
}

function isUUID(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
}

type StoryRow = {
  id: string
  title: string
  text_content: string
  audio_url: string | null
  language: string
  mood: string
}

async function getStoryById(storyId: string): Promise<StoryRow | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('stories')
    .select('id, title, text_content, audio_url, language, mood')
    .eq('id', storyId)
    .maybeSingle()
  if (error || !data) return null
  return data as StoryRow
}

function truncateDescription(text: string, maxLength = 160): string {
  const trimmed = text.replace(/\s+/g, ' ').trim()
  if (trimmed.length <= maxLength) return trimmed
  return trimmed.slice(0, maxLength - 3) + '...'
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ storyId: string }>
}): Promise<Metadata> {
  const { storyId } = await params
  if (!isUUID(storyId)) {
    return DEFAULT_META
  }
  const story = await getStoryById(storyId)
  if (!story) {
    return DEFAULT_META
  }
  const title = `Listen to: ${story.title} | Bolo Buddy`
  const description = truncateDescription(story.text_content)
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  }
}

function NotFoundContent() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <p className="font-medium text-gray-900">Yeh kahani nahi mili 🌙</p>
        <Link
          href="/bolo-buddy"
          className="mt-6 inline-block rounded-full bg-cta-orange px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Back to Bolo Buddy
        </Link>
      </div>
    </div>
  )
}

export default async function SharedStoryPage({
  params,
}: {
  params: Promise<{ storyId: string }>
}) {
  const { storyId } = await params

  if (isUUID(storyId)) {
    const dbStory = await getStoryById(storyId)
    if (!dbStory) {
      return <NotFoundContent />
    }
    const title = dbStory.title
    const audioSrc = dbStory.audio_url ?? DEFAULT_AUDIO
    return (
      <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <h1 className="font-serif text-2xl font-semibold text-gray-900 sm:text-3xl">
            {title}
          </h1>

          <div className="mt-6">
            <StoryAudioPlayer src={audioSrc} />
          </div>

          {dbStory.text_content && (
            <div className="mt-8 space-y-4 text-gray-700 leading-relaxed">
              {dbStory.text_content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          <div className="mt-10">
            <Link
              href="/bolo-buddy"
              className="flex w-full items-center justify-center rounded-full bg-cta-orange py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              Start Free
            </Link>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            No signup required to listen. Create a free account to save stories and get new ones every night.
          </p>
        </div>
      </div>
    )
  }

  const story = storyId in SAMPLE_STORIES ? SAMPLE_STORIES[storyId as SampleStoryId] : null
  if (!story) {
    return <NotFoundContent />
  }

  const title = story.title
  const audioSrc = story.audioSrc ?? DEFAULT_AUDIO

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-body-charcoal">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="font-serif text-2xl font-semibold text-gray-900 sm:text-3xl">
          {title}
        </h1>
        {story.subtitle && (
          <p className="mt-1 text-gray-600">{story.subtitle}</p>
        )}

        <div className="mt-6">
          <StoryAudioPlayer src={audioSrc} />
        </div>

        <div className="mt-10">
          <Link
            href="/bolo-buddy"
            className="flex w-full items-center justify-center rounded-full bg-cta-orange py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            Start Free
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          No signup required to listen. Create a free account to save stories and get new ones every night.
        </p>
      </div>
    </div>
  )
}
