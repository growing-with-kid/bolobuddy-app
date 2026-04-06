// Bolo Buddy — Voice selection by story mood for TTS
// Delegates to VOICE_MAP in story-prompt for consistency.

import type { StoryMood } from '@/lib/ai/story-prompt'
import { VOICE_MAP } from '@/lib/ai/story-prompt'

export type Voice = 'ishita' | 'kavya' | 'priya'

/**
 * Select TTS voice by story mood for bedtime narration.
 * - sleepy → kavya (softest, most soothing)
 * - brave → priya (slightly more energetic for courage stories)
 * - kind | magical → ishita (warm, motherly)
 */
export function selectVoiceForMood(mood: StoryMood): Voice {
  return VOICE_MAP[mood] as Voice
}
