// Bolo Buddy — Voice selection by story mood for TTS
// Delegates to VOICE_MAP in story-prompt for consistency.

import type { StoryMood } from '@/lib/ai/story-prompt'
import { VOICE_MAP } from '@/lib/ai/story-prompt'

export type Voice = 'shreya' | 'shubh' | 'aarav'

const VOICES = new Set<Voice>(['shreya', 'shubh', 'aarav'])

/** Normalise API `speaker` string to a Sarvam voice id, or undefined if invalid. */
export function parseOptionalSpeaker(raw: string | undefined): Voice | undefined {
  if (!raw || typeof raw !== 'string') return undefined
  const v = raw.trim().toLowerCase() as Voice
  return VOICES.has(v) ? v : undefined
}

/**
 * Explicit `speaker` from the request wins; otherwise use mood-mapped voice from {@link VOICE_MAP}.
 */
export function resolveSarvamSpeaker(explicitSpeaker: string | undefined, moodVoiceKey: string): Voice {
  const fromRequest = parseOptionalSpeaker(explicitSpeaker)
  if (fromRequest) return fromRequest
  const fromMood = parseOptionalSpeaker(moodVoiceKey)
  return fromMood ?? 'shreya'
}

/**
 * Select TTS voice by story mood for bedtime narration.
 * - sleepy → shreya (softest, most soothing)
 * - brave → aarav (slightly more energetic for courage stories)
 * - kind | magical → shreya (warm, motherly)
 */
export function selectVoiceForMood(mood: StoryMood): Voice {
  return VOICE_MAP[mood] as Voice
}
