/**
 * Debug TTS: fetch story text from Supabase (service role), then call generateStoryAudio.
 *
 * Run from project root:
 *   npx tsx scripts/test-tts-debug.ts
 *
 * Loads .env.local. Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SARVAM_API_KEY.
 *
 * Optional: TTS_SPEAKER=Shreya|Shubh|Aarav
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { generateStoryAudio, type TTSVoice } from '../lib/tts/sarvam'

const STORY_ID = '859ef956-fcab-4640-af1c-e691bd768834'

function loadEnvLocal() {
  const path = resolve(process.cwd(), '.env.local')
  if (!existsSync(path)) return
  let content = readFileSync(path, 'utf-8')
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1)
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq <= 0) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
      value = value.slice(1, -1)
    process.env[key] = value
  }
}

loadEnvLocal()

function parseVoice(): TTSVoice {
  const raw = (process.env.TTS_SPEAKER ?? 'Shreya').trim()
  const n = raw.toLowerCase()
  if (n === 'shubh') return 'Shubh'
  if (n === 'aarav') return 'Aarav'
  return 'Shreya'
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !serviceKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
    process.exit(1)
  }

  const supabase = createClient(url, serviceKey)

  const { data: row, error: fetchError } = await supabase
    .from('stories')
    .select('text_content')
    .eq('id', STORY_ID)
    .single()

  if (fetchError) {
    console.error('Fetch failed:', fetchError)
    process.exit(1)
  }
  if (!row?.text_content) {
    console.error('No text_content for story', STORY_ID)
    process.exit(1)
  }

  const text = row.text_content as string
  const preview = text.length > 100 ? text.slice(0, 100) + '...' : text
  console.log('Fetched story text:', preview)

  console.log('Calling Sarvam TTS...')
  try {
    const audioUrl = await generateStoryAudio(
      {
        text,
        language: 'hi-IN',
        voice: parseVoice(),
        storyMood: 'bedtime',
        storyId: STORY_ID,
      },
      supabase
    )
    console.log('Audio URL:', audioUrl)
  } catch (err) {
    console.error('Full error object:', err)
    if (err && typeof err === 'object') {
      const e = err as Record<string, unknown>
      console.error('  name:', e.name)
      console.error('  message:', e.message)
      if ('statusCode' in e) console.error('  statusCode:', e.statusCode)
      if ('body' in e) console.error('  body:', e.body)
      if ('cause' in e) console.error('  cause:', e.cause)
    }
    process.exit(1)
  }
}

main()
