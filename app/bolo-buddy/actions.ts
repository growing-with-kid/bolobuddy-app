'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

const FREE_SAVED_LIMIT = 3

/** User-facing message when saved_stories table is missing from PostgREST schema cache */
function normalizeSavedStoriesError(message: string): string {
  if (/schema cache|Could not find the table.*saved_stories/i.test(message)) {
    console.error('[saveStory]', message)
    return 'Saving is temporarily unavailable. Please try again in a moment.'
  }
  return message
}

// --- Waitlist (landing modal / form) ---
export type WaitlistState = { message: string; type: 'success' | 'error' | 'duplicate' }

export async function joinWaitlist(
  _prevState: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const email = formData.get('email')?.toString()?.trim()
  if (!email) {
    return { message: 'Please enter your email.', type: 'error' }
  }
  const supabase = await createClient()
  const { error } = await supabase.from('waitlist').insert({ email })
  if (error) {
    if (error.code === '23505') {
      return { message: "You're already on the list. We'll be in touch soon!", type: 'duplicate' }
    }
    if (error.code === '42501' || error.message?.includes('permission')) {
      return { message: 'Waitlist is not set up yet. Please try again later.', type: 'error' }
    }
    return { message: 'Something went wrong. Please try again.', type: 'error' }
  }
  return { message: "You're on the list. We'll be in touch!", type: 'success' }
}

// --- Auth (signup from server to avoid browser "Failed to fetch") ---
export async function signUp(formData: FormData): Promise<{ error: string | null }> {
  try {
    const email = formData.get('email')?.toString()?.trim()
    const password = formData.get('password')?.toString()
    const fullName = formData.get('fullName')?.toString()?.trim()

    if (!email || !password) {
      return { error: 'Email and password are required.' }
    }
    if (password.length < 6) {
      return { error: 'Password must be at least 6 characters.' }
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName ?? '' } },
    })

    if (error) return { error: error.message }
    return { error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Signup failed.'
    if (message.includes('fetch') || message.includes('network') || message.includes('ECONNREFUSED') || message.includes('ETIMEDOUT')) {
      return { error: "Can't reach Supabase. Check that your project is active at dashboard.supabase.com and try again." }
    }
    return { error: message }
  }
}

export type StoryPlayRow = {
  id: string
  story_id: string
  played_at: string
  title: string
  language: string
  mood: string
  duration_seconds: number | null
}

export type SavedStoryRow = {
  id: string
  story_id: string
  title: string
  language: string
  mood: string
  duration_seconds: number | null
  audio_url: string | null
  played_at: string | null
  created_at: string
}

export async function recordPlay(params: {
  storyId: string
  title: string
  language: string
  mood: string
  durationSeconds?: number
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase.from('story_plays').insert({
    user_id: user.id,
    story_id: params.storyId,
    title: params.title,
    language: params.language,
    mood: params.mood,
    duration_seconds: params.durationSeconds ?? null,
  })

  if (error) return { error: error.message }
  revalidatePath('/bolo-buddy/dashboard')
  return { error: null }
}

export async function getDashboardData(): Promise<{
  parentName: string | null
  lastPlayed: StoryPlayRow | null
  recentPlays: StoryPlayRow[]
  savedStories: SavedStoryRow[]
  savedCount: number
  storiesUsedThisMonth: number
} | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const parentName =
    (user.user_metadata?.full_name as string)?.trim() ||
    (user.user_metadata?.name as string)?.trim() ||
    null

  const [playsRes, savedRes, usage] = await Promise.all([
    supabase
      .from('story_plays')
      .select('id, story_id, played_at, title, language, mood, duration_seconds')
      .eq('user_id', user.id)
      .order('played_at', { ascending: false })
      .limit(4),
    supabase
      .from('saved_stories')
      .select('id, story_id, title, language, mood, duration_seconds, audio_url, played_at, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
    getStoriesUsedThisMonth(),
  ])

  const plays = (playsRes.data ?? []) as StoryPlayRow[]
  const savedStories = (savedRes.data ?? []) as SavedStoryRow[]

  return {
    parentName,
    lastPlayed: plays[0] ?? null,
    recentPlays: plays.slice(1, 4),
    savedStories,
    savedCount: savedStories.length,
    storiesUsedThisMonth: usage.storiesUsed,
  }
}

/** Returns whether the current user has at least one story in the stories table. */
export async function getHasAnyStory(): Promise<boolean> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  const { data } = await supabase
    .from('stories')
    .select('id')
    .eq('user_id', user.id)
    .limit(1)
    .maybeSingle()
  return data != null
}

const FREE_STORIES_PER_MONTH = 3

function getStartAndEndOfCurrentMonth(): { start: string; end: string } {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
  return { start: start.toISOString(), end: end.toISOString() }
}

/** Returns whether the current user has a premium subscription. Extend to check a subscriptions table or Stripe when ready. */
export async function getSubscriptionStatus(): Promise<{ isPremium: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { isPremium: false }
  const plan = user.user_metadata?.plan as string | undefined
  return { isPremium: plan === 'premium' }
}

/** Returns free-tier story usage for the current month (for BUG-02 counter). Matches generate API logic. */
export async function getStoriesUsedThisMonth(): Promise<{
  storiesUsed: number
  limit: number
  isPremium: boolean
}> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { storiesUsed: 0, limit: FREE_STORIES_PER_MONTH, isPremium: false }
  }
  const plan = user.user_metadata?.plan as string | undefined
  const isPremium = plan === 'premium'
  if (isPremium) {
    return { storiesUsed: 0, limit: FREE_STORIES_PER_MONTH, isPremium: true }
  }
  const { start, end } = getStartAndEndOfCurrentMonth()
  const { count, error } = await supabase
    .from('stories')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('is_system', false)
    .gte('created_at', start)
    .lte('created_at', end)
  if (error) {
    return { storiesUsed: 0, limit: FREE_STORIES_PER_MONTH, isPremium: false }
  }
  return {
    storiesUsed: count ?? 0,
    limit: FREE_STORIES_PER_MONTH,
    isPremium: false,
  }
}

// --- System stories (pre-populated library) ---

/** Returns all system (pre-seeded) stories, visible to all users. */
export async function getSystemStories() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('stories')
    .select('id, title, mood, language, audio_url, created_at, seed_batch')
    .eq('is_system', true)
    .eq('status', 'completed')
    .order('mood', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[getSystemStories] Error:', error)
    return []
  }

  return data ?? []
}

export async function getSavedCount(): Promise<number> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return 0
  const { count } = await supabase
    .from('saved_stories')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
  return count ?? 0
}

export async function saveStory(params: {
  storyId: string
  title: string
  language: string
  mood: string
  durationSeconds?: number
  audioUrl?: string
}): Promise<{ error: string | null; atLimit?: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { count, error: countError } = await supabase
    .from('saved_stories')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  if (countError) return { error: normalizeSavedStoriesError(countError.message) }

  const currentCount = count ?? 0
  if (currentCount >= FREE_SAVED_LIMIT) {
    const existing = await supabase
      .from('saved_stories')
      .select('id')
      .eq('user_id', user.id)
      .eq('story_id', params.storyId)
      .maybeSingle()
    if (existing.error) return { error: normalizeSavedStoriesError(existing.error.message) }
    if (!existing.data) {
      return { error: null, atLimit: true }
    }
  }

  const { error } = await supabase.from('saved_stories').upsert(
    {
      user_id: user.id,
      story_id: params.storyId,
      title: params.title,
      language: params.language,
      mood: params.mood,
      duration_seconds: params.durationSeconds ?? null,
      audio_url: params.audioUrl ?? null,
      played_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,story_id' }
  )

  if (error) return { error: normalizeSavedStoriesError(error.message) }
  revalidatePath('/bolo-buddy/dashboard')
  revalidatePath(`/bolo-buddy/stories/play/${params.storyId}`)
  return { error: null }
}

export async function unsaveStory(storyId: string): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('saved_stories')
    .delete()
    .eq('user_id', user.id)
    .eq('story_id', storyId)

  if (error) return { error: error.message }
  revalidatePath('/bolo-buddy/dashboard')
  return { error: null }
}

export async function getSavedStories(): Promise<SavedStoryRow[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('saved_stories')
    .select('id, story_id, title, language, mood, duration_seconds, audio_url, played_at, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (data ?? []) as SavedStoryRow[]
}

export async function getSavedStoryByStoryId(storyId: string): Promise<SavedStoryRow | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('saved_stories')
    .select('id, story_id, title, language, mood, duration_seconds, audio_url, played_at, created_at')
    .eq('user_id', user.id)
    .eq('story_id', storyId)
    .maybeSingle()

  return data as SavedStoryRow | null
}

// --- Child profiles (onboarding) ---
const MAX_CHILD_PROFILES_FREE = 2

export type ChildProfileRow = {
  id: string
  name: string
  age_group: string
  preferred_language: string
  created_at: string
}

export async function getChildProfiles(): Promise<ChildProfileRow[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('child_profiles')
    .select('id, name, age_group, preferred_language, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })

  return (data ?? []) as ChildProfileRow[]
}

export async function hasAnyChildProfile(): Promise<boolean> {
  const profiles = await getChildProfiles()
  return profiles.length > 0
}

export async function upsertChildProfile(params: {
  name: string
  age_group: string
  preferred_language: string
  profileId?: string
}): Promise<{ error: string | null; atLimit?: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const profiles = await getChildProfiles()
  const isUpdate = !!params.profileId && profiles.some((p) => p.id === params.profileId)
  if (!isUpdate && profiles.length >= MAX_CHILD_PROFILES_FREE) {
    return { error: null, atLimit: true }
  }

  const row = {
    user_id: user.id,
    name: params.name.trim(),
    age_group: params.age_group,
    preferred_language: params.preferred_language,
  }

  if (params.profileId) {
    const { error } = await supabase
      .from('child_profiles')
      .update(row)
      .eq('id', params.profileId)
      .eq('user_id', user.id)
    if (error) return { error: error.message }
  } else {
    const { data: existing } = await supabase
      .from('child_profiles')
      .select('id')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle()
    if (existing) {
      const { error } = await supabase
        .from('child_profiles')
        .update(row)
        .eq('id', existing.id)
        .eq('user_id', user.id)
      if (error) return { error: error.message }
    } else {
      const { error } = await supabase.from('child_profiles').insert(row)
      if (error) return { error: error.message }
    }
  }

  revalidatePath('/bolo-buddy/onboarding')
  revalidatePath('/bolo-buddy/dashboard')
  return { error: null }
}

// --- Saved conversation prompts (post-story) ---
const MAX_SAVED_PROMPTS = 10

export async function getSavedPromptsCount(): Promise<number> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return 0
  const { count } = await supabase
    .from('saved_prompts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
  return count ?? 0
}

export async function saveConversationPrompt(params: {
  promptText: string
  storyId?: string
  theme?: string
}): Promise<{ error: string | null; atLimit?: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const count = await getSavedPromptsCount()
  if (count >= MAX_SAVED_PROMPTS) {
    return { error: null, atLimit: true }
  }

  const { error } = await supabase.from('saved_prompts').insert({
    user_id: user.id,
    prompt_text: params.promptText,
    story_id: params.storyId ?? null,
    theme: params.theme ?? null,
  })

  if (error) return { error: error.message }
  return { error: null }
}
