import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

const SARVAM_TTS_URL = 'https://api.sarvam.ai/text-to-speech'
const MAX_CHUNK_CHARS = 500

export type TTSLanguage = 'hi-IN' | 'en-IN' | 'ta-IN'
export type TTSVoice = 'Ishita' | 'Kavya' | 'Priya'
export type StoryMood = 'bedtime' | 'kindness' | 'nature' | 'courage' | 'mythology'

export interface GenerateStoryAudioParams {
  text: string
  language: TTSLanguage
  voice: TTSVoice
  storyMood: StoryMood
  storyId: string
}

/** Thrown when SARVAM_API_KEY is missing */
export class SarvamConfigError extends Error {
  readonly name = 'SarvamConfigError'
  constructor() {
    super('SARVAM_API_KEY is not set in environment variables.')
  }
}

/** Thrown when Sarvam API returns an error or non-2xx */
export class SarvamAPIError extends Error {
  readonly name = 'SarvamAPIError'
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly body?: unknown
  ) {
    super(message)
  }
}

/** Thrown when Supabase storage upload fails */
export class SarvamStorageError extends Error {
  readonly name = 'SarvamStorageError'
  constructor(message: string, public readonly cause?: unknown) {
    super(message)
  }
}

export type SarvamTTSError = SarvamConfigError | SarvamAPIError | SarvamStorageError

/**
 * Preprocess story text for TTS: ellipses and punctuation become natural pauses.
 * Sarvam Bulbul v3 uses punctuation for prosody; ellipses and em-dashes are
 * normalized so the model can insert appropriate pauses (API does not use SSML).
 */
export function preprocessTextForTTS(storyText: string): string {
  return storyText
    .replace(/\.\.\./g, '... ')
    .replace(/ — /g, ', ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Clean and format story text for Sarvam TTS narration before chunking.
 * - Lines ending with ... get a trailing space (helps Sarvam pause)
 * - Standalone '...' lines become a comma (pause/breathe)
 * - Em dash with spaces becomes comma (Sarvam handles commas better)
 * - Double spaces and excessive blank lines are removed
 */
export function formatForNarration(text: string): string {
  const preprocessed = preprocessTextForTTS(text)
  const lines = preprocessed.split(/\r?\n/)
  const processed = lines.map((line) => {
    const trimmed = line.trim()
    if (trimmed === '...' || trimmed === '... ') return ','
    if (/\.\.\.\s*$/.test(line)) return line.replace(/\.\.\.\s*$/, '... ')
    return line
  })
  let out = processed.join('\n')
  out = out.replace(/ — /g, ', ')
  out = out.replace(/  +/g, ' ')
  out = out.replace(/\n{3,}/g, '\n\n')
  return out.trim()
}

/**
 * Split text into chunks of at most MAX_CHUNK_CHARS characters, splitting only at sentence
 * boundaries (period, exclamation, question mark).
 */
function splitTextAtSentenceBoundaries(text: string, maxChars: number): string[] {
  const trimmed = text.trim()
  if (!trimmed) return []

  const sentences = trimmed.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean)
  if (sentences.length === 0) return [trimmed]

  const chunks: string[] = []
  let current: string[] = []
  let currentLen = 0

  for (const sentence of sentences) {
    const needSpace = current.length > 0 ? 1 : 0
    if (currentLen + needSpace + sentence.length > maxChars && current.length > 0) {
      chunks.push(current.join(' '))
      current = []
      currentLen = 0
    }
    current.push(sentence)
    currentLen += (current.length > 1 ? 1 : 0) + sentence.length
  }
  if (current.length > 0) {
    chunks.push(current.join(' '))
  }
  return chunks
}

interface SarvamResponse {
  audios?: string[]
}

/**
 * Find the byte offset of the "data" chunk in a RIFF WAV buffer.
 * Returns -1 if not found.
 */
function findDataChunkOffset(buf: Buffer): number {
  // Skip the RIFF header (12 bytes), then iterate over chunks.
  let offset = 12
  while (offset + 8 <= buf.length) {
    const id = buf.toString('ascii', offset, offset + 4)
    const size = buf.readUInt32LE(offset + 4)
    if (id === 'data') {
      return offset
    }
    offset += 8 + size
  }
  return -1
}

/**
 * Concatenate multiple WAV buffers into a single valid WAV file by
 * reusing the header from the first buffer and updating RIFF + data sizes.
 * If the structure is not recognised, falls back to a simple Buffer.concat.
 */
function concatWavChunks(buffers: Buffer[]): Buffer {
  if (buffers.length === 1) return buffers[0]
  if (buffers.length === 0) return Buffer.alloc(0)

  try {
    const first = buffers[0]
    const dataOffset = findDataChunkOffset(first)
    if (dataOffset < 0) {
      // Unknown format; fall back to naive concat (current behaviour).
      return Buffer.concat(buffers)
    }

    const headerLength = dataOffset + 8 // up to and including "data" + size fields
    const pcmChunks: Buffer[] = []
    let totalPcmLength = 0

    for (const buf of buffers) {
      const off = findDataChunkOffset(buf)
      if (off < 0) {
        // If any buffer is malformed, fall back to naive concat.
        return Buffer.concat(buffers)
      }
      const dataSize = buf.readUInt32LE(off + 4)
      const start = off + 8
      const end = Math.min(start + dataSize, buf.length)
      const pcm = buf.slice(start, end)
      pcmChunks.push(pcm)
      totalPcmLength += pcm.length
    }

    const combinedPcm = Buffer.concat(pcmChunks, totalPcmLength)
    const out = Buffer.alloc(headerLength + combinedPcm.length)

    // Copy header from first buffer.
    first.copy(out, 0, 0, headerLength)

    // Update RIFF chunk size (file size - 8).
    out.writeUInt32LE(36 + combinedPcm.length, 4)

    // Update data chunk size.
    out.writeUInt32LE(combinedPcm.length, dataOffset + 4)

    // Copy PCM payload.
    combinedPcm.copy(out, headerLength)

    return out
  } catch {
    // In case anything goes wrong, preserve existing behaviour.
    return Buffer.concat(buffers)
  }
}

/**
 * Call Sarvam TTS for one chunk. Returns base64 WAV string.
 */
async function synthesizeChunk(
  chunk: string,
  params: { language: TTSLanguage; voice: TTSVoice }
): Promise<string> {
  const apiKey = process.env.SARVAM_API_KEY?.trim()
  if (!apiKey) {
    throw new SarvamConfigError()
  }

  // pace 0.85 = ~15% slower than default for bedtime, whisper-like rhythm
  const body = {
    inputs: [chunk],
    target_language_code: params.language,
    speaker: params.voice.toLowerCase(),
    model: 'bulbul:v3',
    pace: 0.85,
    temperature: 0.55,
    sample_rate: 24000,
  }

  const res = await fetch(SARVAM_TTS_URL, {
    method: 'POST',
    headers: {
      'api-subscription-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    let bodyUnknown: unknown
    try {
      bodyUnknown = await res.json()
    } catch {
      bodyUnknown = await res.text()
    }
    throw new SarvamAPIError(
      `Sarvam TTS failed: ${res.status} ${res.statusText}`,
      res.status,
      bodyUnknown
    )
  }

  const data = (await res.json()) as SarvamResponse
  const audios = data?.audios
  if (!audios?.length || typeof audios[0] !== 'string') {
    throw new SarvamAPIError('Sarvam TTS response missing audios array', res.status, data)
  }
  return audios[0]
}

/**
 * Convert story text to audio using Sarvam Bulbul v3, then upload to Supabase Storage.
 * Text is split into chunks of max 2000 chars at sentence boundaries; each chunk is
 * synthesized and results are concatenated and uploaded as stories/{storyId}/audio.wav.
 * Returns the public URL of the uploaded file.
 */
export async function generateStoryAudio(
  params: GenerateStoryAudioParams,
  client?: SupabaseClient
): Promise<string> {
  const { text, language, voice, storyId } = params

  const formatted = formatForNarration(text)
  const chunks = splitTextAtSentenceBoundaries(formatted, MAX_CHUNK_CHARS)
  if (chunks.length === 0) {
    throw new SarvamAPIError('Story text is empty after trimming.')
  }

  const base64Chunks: string[] = []
  for (let i = 0; i < chunks.length; i++) {
    const base64 = await synthesizeChunk(chunks[i], { language, voice })
    base64Chunks.push(base64)
  }

  const buffers = base64Chunks.map((b64) => Buffer.from(b64, 'base64'))
  const combined = concatWavChunks(buffers)

  const supabase = client ?? (await createClient())
  const path = `${storyId}/audio.wav`
  const bucket = 'stories'

  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, combined, {
    contentType: 'audio/wav',
    upsert: true,
  })

  if (uploadError) {
    throw new SarvamStorageError(
      `Supabase storage upload failed: ${uploadError.message}`,
      uploadError
    )
  }

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path)
  return urlData.publicUrl
}
