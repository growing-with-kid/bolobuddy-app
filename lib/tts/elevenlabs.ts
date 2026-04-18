/**
 * ElevenLabs TTS integration for Bolo Buddy
 * Primary TTS engine for Hindi, English, Tamil, Hinglish
 * Sarvam remains fallback for Telugu and any ElevenLabs errors
 */

export type ElevenLabsLanguage = 'hindi' | 'english' | 'tamil' | 'hinglish'

const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1/text-to-speech'
const ELEVENLABS_MODEL = 'eleven_multilingual_v2'

// Voice map — confirmed by Raghvendra on Apr 18, 2026
const VOICE_MAP: Record<ElevenLabsLanguage, string> = {
  hindi:    'OUx0z7RTt92glw2BYS4R',
  english:  'vYENaCJHl4vFKNDYPr8y',
  tamil:    'upqptL1FRsrohjTgQOHf',
  hinglish: 'OnEBeQazKx29cIsjC5EQ',
}

const VOICE_SETTINGS = {
  stability:        0.4,
  similarity_boost: 0.8,
  style:            0.6,
  use_speaker_boost: true,
}

export function isElevenLabsLanguage(lang: string): lang is ElevenLabsLanguage {
  return lang in VOICE_MAP
}

export function getElevenLabsVoiceId(language: ElevenLabsLanguage): string {
  return VOICE_MAP[language]
}

/**
 * Generate audio via ElevenLabs TTS.
 * Returns MP3 buffer on success, throws on failure.
 */
export async function generateElevenLabsAudio(
  text: string,
  language: ElevenLabsLanguage
): Promise<Buffer> {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim()
  if (!apiKey) {
    throw new Error('ELEVENLABS_API_KEY is not set')
  }

  const voiceId = getElevenLabsVoiceId(language)

  const response = await fetch(`${ELEVENLABS_API_URL}/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: ELEVENLABS_MODEL,
      voice_settings: VOICE_SETTINGS,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`ElevenLabs TTS failed: ${response.status} ${err}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  console.log('[elevenlabs] audio buffer size:', buffer.length, 'bytes')
  if (buffer.length < 1000) {
    const preview = buffer.toString('utf8', 0, Math.min(200, buffer.length))
    console.error('[elevenlabs] suspiciously small buffer, content:', preview)
    throw new Error(`ElevenLabs returned invalid audio: only ${buffer.length} bytes`)
  }
  return buffer
}
