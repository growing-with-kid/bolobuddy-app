/**
 * Bedtime story prompt helpers — wraps the main story prompt system for
 * Sarvam TTS–friendly narration (Devanagari/Tamil/Telugu where applicable).
 */

import {
  apiParamsToStoryConfig,
  buildSystemPrompt,
  buildUserPrompt,
  type ApiMood,
  type StoryConfig,
  type StoryLanguage,
} from '@/lib/ai/story-prompt'

/** High-level bedtime narrator identity (used in docs / future multi-turn). */
export const BEDTIME_STORY_PROMPT = `You are Bolo Buddy — a warm Indian bedtime storyteller for children aged 3–9.
Use short sentences, natural pauses (ellipses), no exclamation marks, and end with the child drifting to sleep.
For Hindi use Devanagari; for Tamil/Telugu use native script; Hinglish uses Roman script.`

export interface BedtimePromptParams {
  childName: string
  childAge: number
  language: StoryLanguage
  mood: ApiMood
  customTheme?: string
}

/** Renders system + user messages from API-style params (same as generate route). */
export function renderBedtimePrompt(params: BedtimePromptParams): {
  system: string
  user: string
} {
  const config = apiParamsToStoryConfig({
    childName: params.childName,
    childAge: params.childAge,
    language: params.language,
    mood: params.mood,
    customTheme: params.customTheme,
  })
  return {
    system: buildSystemPrompt(config),
    user: buildUserPrompt(config),
  }
}

/** Same as {@link renderBedtimePrompt} but reuses an existing {@link StoryConfig}. */
export function renderBedtimePromptFromConfig(config: StoryConfig): {
  system: string
  user: string
} {
  return {
    system: buildSystemPrompt(config),
    user: buildUserPrompt(config),
  }
}

/** Approximate word-count band for TTS length planning (aligned with story-prompt age bands). */
export function getStoryLengthByAge(childAge: number): {
  minWords: number
  maxWords: number
  narrationHint: string
} {
  if (childAge <= 4) {
    return {
      minWords: 300,
      maxWords: 400,
      narrationHint: '3–4 minutes when narrated; very simple vocabulary.',
    }
  }
  if (childAge <= 6) {
    return {
      minWords: 450,
      maxWords: 600,
      narrationHint: '4–5 minutes when narrated; short warm sentences.',
    }
  }
  if (childAge <= 8) {
    return {
      minWords: 600,
      maxWords: 750,
      narrationHint: '5–6 minutes when narrated; small story arc.',
    }
  }
  return {
    minWords: 750,
    maxWords: 900,
    narrationHint: '6–7 minutes when narrated; richer but still calm.',
  }
}
