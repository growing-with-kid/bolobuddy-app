/**
 * Test script for generateStoryAudio (lib/tts/sarvam.ts).
 *
 * Run from project root:
 *   npx tsx scripts/test-tts.ts
 *
 * Requires: SARVAM_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *   (service role is used for storage upload; avoids Next.js `cookies()` outside a request).
 *
 * Optional env:
 *   TTS_SPEAKER=Shreya|Shubh|Aarav
 *   TTS_LANGUAGE=hi-IN|en-IN|ta-IN|te-IN
 */

import { createClient } from '@supabase/supabase-js'
import { generateStoryAudio, type TTSVoice } from '@/lib/tts/sarvam'

/** Devanagari sample — matches production Hindi TTS expectations. */
const HINDI_STORY_DEVANAGARI =
  'आज की रात... बहुत शांत थी... परी अपने छोटे से घर में थी... बाहर तारे चमक रहे थे... एक, दो, तीन... कई सारे तारे... परी ने आँखें बंद कीं... और धीरे धीरे... नींद आ गई...'

const HINGLISH_STORY =
  'Aaj ki raat... bahut shant thi... Pari apne chote se ghar mein thi... Bahar tare chamak rahe the... ek, do, teen... kai saare tare... Pari ne aankhein band ki... aur dhire dhire... neend aa gayi...'

function parseVoice(): TTSVoice {
  const raw = (process.env.TTS_SPEAKER ?? 'Shreya').trim()
  const n = raw.toLowerCase()
  if (n === 'shubh') return 'Shubh'
  if (n === 'aarav') return 'Aarav'
  return 'Shreya'
}

async function main() {
  const useDevanagari = process.env.TTS_SCRIPT !== 'roman'
  const text = useDevanagari ? HINDI_STORY_DEVANAGARI : HINGLISH_STORY
  const lang = (process.env.TTS_LANGUAGE?.trim() as 'hi-IN' | 'en-IN' | 'ta-IN' | 'te-IN') || 'hi-IN'

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  const supabase =
    url && serviceKey
      ? createClient(url, serviceKey, { auth: { persistSession: false } })
      : undefined
  if (!supabase) {
    console.error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — upload would use Next createClient() and fail outside a request. Set both in .env.local.'
    )
    process.exit(1)
  }

  const storyId = `test-tts-${Date.now()}`
  try {
    const audioUrl = await generateStoryAudio(
      {
        text,
        language: lang,
        voice: parseVoice(),
        storyMood: 'bedtime',
        storyId,
      },
      supabase
    )
    console.log('Success. Audio URL:', audioUrl)
  } catch (err) {
    console.error('Failure:', err)
    if (err && typeof err === 'object' && 'name' in err) {
      console.error('Error name:', (err as Error).name)
    }
    if (err instanceof Error && err.cause) {
      console.error('Cause:', err.cause)
    }
  }
}

main()
