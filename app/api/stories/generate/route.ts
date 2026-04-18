import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { renderBedtimePromptFromConfig } from '@/lib/ai/bedtime-story-prompt'
import { apiParamsToStoryConfig, VOICE_MAP, type ApiMood } from '@/lib/ai/story-prompt'
import { validateStoryQuality, type ValidationResult } from '@/lib/ai/story-validator'
import {
  generateStoryAudio,
  SarvamConfigError,
  SarvamAPIError,
  SarvamStorageError,
  type TTSLanguage,
  type TTSVoice,
  type StoryMood as TTSStoryMood,
} from '@/lib/tts/sarvam'
import { resolveSarvamSpeaker } from '@/lib/tts/voice-selector'

const FREE_STORIES_PER_MONTH = 3
const CLAUDE_MODEL = 'claude-sonnet-4-6'
const CLAUDE_MAX_TOKENS = 1200

const RequestBodySchema = z.object({
  childName: z.string().optional().default(''),
  child_name: z.string().optional().default(''),
  childAge: z.number().int().min(1).max(12),
  language: z.enum(['hindi', 'english', 'hinglish', 'tamil', 'telugu']),
  /** Must match `MOODS` / POST body in `app/bolo-buddy/stories/page.tsx` (not URL demo tokens like `sleepy`). */
  mood: z.enum(['bedtime', 'kindness', 'courage', 'nature', 'mythology']).optional().default('bedtime'),
  /** Optional Sarvam Bulbul v3 speaker; when omitted, voice follows story mood. */
  speaker: z.enum(['shreya', 'shubh', 'aarav']).optional(),
  userId: z.string().uuid().optional(),
  childProfileId: z.string().uuid().optional(),
  customTheme: z.string().optional(),
})

type RequestBody = z.infer<typeof RequestBodySchema>

function languageToTTS(lang: RequestBody['language']): TTSLanguage {
  switch (lang) {
    case 'hindi':
    case 'hinglish':
      return 'hi-IN'
    case 'tamil':
      return 'ta-IN'
    case 'telugu':
      return 'te-IN'
    case 'english':
    default:
      return 'en-IN'
  }
}

/** Sarvam expects PascalCase voice names; story-prompt returns lowercase. */
function voiceToTTS(voice: string): TTSVoice {
  const v = voice.toLowerCase()
  if (v === 'aarav') return 'Aarav'
  if (v === 'shubh') return 'Shubh'
  return 'Shreya'
}

/** Derive a short title from the story body (model returns story only, no title). */
function deriveTitleFromStoryBody(text: string): string {
  const trimmed = text.trim()
  if (!trimmed) return 'Bedtime story'
  const firstLine = trimmed.split(/\n+/)[0]?.trim() ?? trimmed
  const words = firstLine.split(/\s+/).slice(0, 8).join(' ')
  if (words.length > 50) return words.slice(0, 47) + '...'
  return words || 'Bedtime story'
}

function getStartAndEndOfCurrentMonth(): { start: string; end: string } {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
  return { start: start.toISOString(), end: end.toISOString() }
}

export async function POST(request: Request) {
  let bodyUnknown: unknown
  try {
    bodyUnknown = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 }
    )
  }

  const parsed = RequestBodySchema.safeParse(bodyUnknown)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }
  const params = parsed.data
  const shouldPersistStory = Boolean(params.userId && params.childProfileId)

  const authHeader = request.headers.get('authorization')
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null

  let supabase: Awaited<ReturnType<typeof createServerClient>> | ReturnType<typeof createSupabaseClient> | null = null
  let user: { id: string; user_metadata?: Record<string, unknown> } | null
  let plan: string | undefined

  if (shouldPersistStory && bearerToken) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    if (!url || !anonKey || !serviceKey) {
      return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 })
    }
    const authClient = createSupabaseClient(url, anonKey, { auth: { persistSession: false } })
    const { data: { user: u }, error } = await authClient.auth.getUser(bearerToken)
    if (error || !u) {
      return NextResponse.json({ success: false, error: 'Invalid or expired token' }, { status: 401 })
    }
    user = u
    supabase = createSupabaseClient(url, serviceKey, { auth: { persistSession: false } }) as Awaited<ReturnType<typeof createServerClient>>
  } else if (shouldPersistStory) {
    supabase = await createServerClient()
    const { data: { user: u } } = await supabase.auth.getUser()
    user = u
  } else {
    user = null
  }

  if (shouldPersistStory) {
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    if (user.id !== params.userId) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    plan = user.user_metadata?.plan as string | undefined
  } else {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    if (url && serviceKey) {
      supabase = createSupabaseClient(url, serviceKey, { auth: { persistSession: false } })
    }
  }
  const persistedSupabase = shouldPersistStory ? supabase : null
  if (shouldPersistStory && !persistedSupabase) {
    return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 })
  }

  const isPremium = plan === 'premium'

  if (shouldPersistStory && !isPremium) {
    const { start, end } = getStartAndEndOfCurrentMonth()
    const { count, error: countError } = await persistedSupabase!
      .from('stories')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', params.userId)
      .gte('created_at', start)
      .lte('created_at', end)
    if (countError) {
      return NextResponse.json(
        { success: false, error: 'Failed to check story limit' },
        { status: 500 }
      )
    }
    if ((count ?? 0) >= FREE_STORIES_PER_MONTH) {
      return NextResponse.json(
        { success: false, error: 'Monthly story limit reached (3 for free plan)' },
        { status: 429 }
      )
    }
  }

  let childName = (params.childName ?? params.child_name ?? '').trim()
  if (!childName && shouldPersistStory) {
    const { data: profile } = await persistedSupabase!
      .from('child_profiles')
      .select('name')
      .eq('id', params.childProfileId as string)
      .eq('user_id', params.userId as string)
      .maybeSingle()
    childName = (profile?.name?.trim()) || 'the child'
  } else if (!childName) {
    childName = 'the child'
  }

  const config = apiParamsToStoryConfig({
    childName,
    childAge: params.childAge,
    language: params.language,
    mood: params.mood as ApiMood,
    customTheme: params.customTheme,
  })

  const { system: systemPrompt, user: userPrompt } = renderBedtimePromptFromConfig(config)

  const apiKey = process.env.ANTHROPIC_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: 'Server configuration error' },
      { status: 500 }
    )
  }

  async function callClaude(key: string): Promise<string> {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: CLAUDE_MAX_TOKENS,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })
    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Claude API ${res.status}: ${errText}`)
    }
    const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> }
    const firstBlock = data?.content?.find((b) => b.type === 'text')
    const raw = firstBlock?.text ?? ''
    if (!raw.trim()) throw new Error('Story generation returned empty response')
    return raw.trim()
  }

  let textContent: string
  let finalValidation: ValidationResult
  try {
    textContent = await callClaude(apiKey)
    const validation = validateStoryQuality(textContent, childName)
    finalValidation = validation
    if (!validation.passed) {
      const retryContent = await callClaude(apiKey)
      const retryValidation = validateStoryQuality(retryContent, childName)
      textContent = retryContent
      finalValidation = retryValidation
      if (!retryValidation.passed && retryValidation.issues.length > 0) {
        console.warn('[story-generate] Quality validation issues after retry:', retryValidation.issues)
      }
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Story generation failed', details: String(err) },
      { status: 500 }
    )
  }
  const title = deriveTitleFromStoryBody(textContent)
  const wordCount = textContent.split(/\s+/).filter(Boolean).length
  const durationSeconds = Math.round(wordCount / 2.5)
  const storyId = crypto.randomUUID()

  const moodVoiceKey = VOICE_MAP[config.mood]
  const voiceKey = resolveSarvamSpeaker(params.speaker, moodVoiceKey)


// Inject TTS breathing pauses at paragraph breaks for warmer narration
function injectTTSPauses(text: string): string {
  return text
    .split(/\n\n+/)
    .map(para => para.trim())
    .filter(Boolean)
    .join('\n। ।\n')
}

  let audioUrl: string | null = null
  let audioStatus: 'completed' | 'pending' = 'completed'

  try {
    // Pass service-role supabase so storage upload succeeds (RLS); otherwise upload fails and audio_url stays null
    audioUrl = await generateStoryAudio(
      {
        text: injectTTSPauses(textContent),
        language: languageToTTS(params.language),
        voice: voiceToTTS(voiceKey),
        storyMood: params.mood as TTSStoryMood,
        storyId,
      },
      supabase as Parameters<typeof generateStoryAudio>[1]
    )
  } catch (ttsErr) {
    console.warn(
      '[story-generate] TTS or storage failed; returning story without audioUrl:',
      ttsErr instanceof Error ? ttsErr.message : ttsErr
    )
    if (
      ttsErr instanceof SarvamConfigError ||
      ttsErr instanceof SarvamAPIError ||
      ttsErr instanceof SarvamStorageError
    ) {
      audioStatus = 'pending'
    } else {
      audioStatus = 'pending'
    }
  }

  if (shouldPersistStory) {
    const { error: insertError } = await persistedSupabase!.from('stories').insert({
      id: storyId,
      title,
      text_content: textContent,
      audio_url: audioUrl,
      language: params.language,
      mood: params.mood,
      child_profile_id: params.childProfileId,
      user_id: params.userId,
      duration_seconds: durationSeconds,
      status: 'completed',
      audio_status: audioStatus,
    })

    if (insertError) {
      return NextResponse.json(
        { success: false, error: 'Failed to save story', details: insertError.message },
        { status: 500 }
      )
    }

    const { error: logError } = await persistedSupabase!.from('story_quality_log').insert({
      story_id: storyId,
      score: finalValidation.score,
      issues: finalValidation.issues,
      passed: finalValidation.passed,
    })
    if (logError) {
      console.warn('[story-generate] Failed to write story_quality_log:', logError.message)
    }

    const { count: storyCount } = await persistedSupabase!
      .from('stories')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', params.userId as string)
    if (storyCount === 1) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
      if (url && serviceKey) {
        const serviceSupabase = createSupabaseClient(url, serviceKey, { auth: { persistSession: false } })
        const { data: referralRow } = await serviceSupabase
          .from('referrals')
          .select('referrer_id')
          .eq('referred_id', params.userId as string)
          .maybeSingle()
        const referrerId = referralRow?.referrer_id
        if (referrerId) {
          const { data: referrer } = await serviceSupabase.auth.admin.getUserById(referrerId)
          if (referrer?.user) {
            const meta = (referrer.user.user_metadata as Record<string, unknown>) ?? {}
            const current = (meta.bonus_stories as number) ?? 0
            await serviceSupabase.auth.admin.updateUserById(referrerId, {
              user_metadata: { ...meta, bonus_stories: current + 1 },
            })
          }
        }
      }
    }
  }

  return NextResponse.json({
    success: true,
    storyId,
    audioUrl: audioUrl ?? undefined,
    storyText: textContent,
    title,
    speaker: voiceKey,
  })
}
