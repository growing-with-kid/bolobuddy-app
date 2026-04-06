import { cookies } from 'next/headers'
import StoryPlayContent from './StoryPlayContent'
import { getSavedStoryByStoryId, getSavedCount, getChildProfiles, getSubscriptionStatus } from '@/app/bolo-buddy/actions'

export const metadata = {
  title: 'Your Story is Ready | Bolo Buddy',
  description: 'Your generated bedtime story.',
}

export default async function StoryPlayPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params
  const sp = await searchParams
  const language = (typeof sp.language === 'string' ? sp.language : 'en') || 'en'
  const mood = (typeof sp.mood === 'string' ? sp.mood : 'sleepy') || 'sleepy'
  const isReplay = sp.replay === '1'

  const [savedStory, savedCount, childProfiles, subscription] = await Promise.all([
    getSavedStoryByStoryId(id),
    getSavedCount(),
    getChildProfiles(),
    getSubscriptionStatus(),
  ])
  const cookieStore = await cookies()
  const activeChildId = cookieStore.get('bolo_active_child_id')?.value ?? null
  const activeProfile = activeChildId
    ? childProfiles.find((p) => p.id === activeChildId) ?? childProfiles[0]
    : childProfiles[0]
  const childName = activeProfile?.name ?? null

  return (
    <StoryPlayContent
      id={id}
      language={language}
      mood={mood}
      isReplay={isReplay}
      childName={childName}
      initialSavedStory={savedStory}
      initialSavedCount={savedCount}
      isPremium={subscription.isPremium}
    />
  )
}
