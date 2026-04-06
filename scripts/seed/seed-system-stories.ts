// scripts/seed/seed-system-stories.ts
// Run with: npx dotenv -e .env.local -- npx ts-node --project tsconfig.scripts.json scripts/seed/seed-system-stories.ts
//
// Prerequisite: Apply migration supabase/migrations/20250312000000_system_stories_nullable.sql
// on the target DB so that user_id and child_profile_id are nullable for system stories.

import { createClient } from '@supabase/supabase-js'
import { SYSTEM_STORIES } from './stories/all-stories'
import type { SystemStory } from './stories/all-stories'

// ── Config ─────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const SARVAM_API_KEY = process.env.SARVAM_API_KEY!
const STORAGE_BUCKET = 'story-audio'
const BATCH_SIZE = 3 // Process 3 stories at a time to avoid rate limits
const RETRY_ATTEMPTS = 2 // Retry failed TTS calls once
const SEED_BATCH = 'april-2026-v1'

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !SARVAM_API_KEY) {
  throw new Error(
    'Missing required env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SARVAM_API_KEY'
  )
}

// Use service role key — bypasses RLS so we can insert with user_id = null
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

// ── Language → Sarvam voice mapping ───────────────────────────────────
function getSarvamLanguageCode(language: SystemStory['language']): string {
  switch (language) {
    case 'hindi':
      return 'hi-IN'
    case 'hinglish':
      return 'hi-IN' // Hinglish uses hi-IN voice
    case 'english':
      return 'en-IN'
    default:
      return 'en-IN'
  }
}

// ── Generate a URL-safe slug from title ───────────────────────────────
function slugify(title: string, index: number): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60)
  return `system-${String(index + 1).padStart(2, '0')}-${base}`
}

function estimateDurationSeconds(story: SystemStory): number {
  const words = story.content.trim().split(/\s+/).filter(Boolean).length
  return Math.round(words / 2.5)
}

// ── Call Sarvam Bulbul TTS ─────────────────────────────────────────────
async function generateTTS(story: SystemStory, attempt = 1): Promise<Buffer> {
  const languageCode = getSarvamLanguageCode(story.language)

  // Sarvam Bulbul v3 has a ~500 char limit per request — chunk if needed
  const MAX_CHARS = 500
  const text = story.content.trim()

  let audioBuffer: Buffer

  if (text.length <= MAX_CHARS) {
    audioBuffer = await callSarvamAPI(text, languageCode)
  } else {
    // Split into paragraphs and batch
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0)
    const chunks: string[] = []
    let current = ''

    for (const para of paragraphs) {
      if ((current + '\n\n' + para).length > MAX_CHARS) {
        if (current) chunks.push(current.trim())
        current = para
      } else {
        current = current ? current + '\n\n' + para : para
      }
    }
    if (current) chunks.push(current.trim())

    console.log(`  [TTS] Story split into ${chunks.length} chunks`)

    const audioBuffers = await Promise.all(
      chunks.map(chunk => callSarvamAPI(chunk, languageCode))
    )
    audioBuffer = Buffer.concat(audioBuffers)
  }

  return audioBuffer
}

async function callSarvamAPI(text: string, languageCode: string): Promise<Buffer> {
  const response = await fetch('https://api.sarvam.ai/text-to-speech', {
    method: 'POST',
    headers: {
      'api-subscription-key': SARVAM_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: [text],
      target_language_code: languageCode,
      // Use the same naming and model as app-level TTS helper (lib/tts/sarvam.ts)
      speaker: 'roopa',
      model: 'bulbul:v3',
      pace: 0.75,
      temperature: 0.3,
      speech_sample_rate: 22050,
      enable_preprocessing: true,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Sarvam TTS failed (${response.status}): ${errorText}`)
  }

  const data = await response.json()

  // Sarvam returns base64 audio in data.audios[0]
  if (!data.audios || !data.audios[0]) {
    throw new Error('Sarvam TTS returned no audio data')
  }

  // Check this matches your actual Sarvam response shape:
  return Buffer.from(data.audios[0], 'base64')
}

// ── Upload audio to Supabase Storage ─────────────────────────────────
async function uploadAudio(audioBuffer: Buffer, slug: string): Promise<string> {
  const filePath = `system-stories/${SEED_BATCH}/${slug}.wav`

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, audioBuffer, {
      contentType: 'audio/wav',
      upsert: true, // Overwrite if re-running the script
    })

  if (uploadError) {
    throw new Error(`Storage upload failed for ${slug}: ${uploadError.message}`)
  }

  // Get a public URL (long-lived, not signed — system stories are public)
  const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath)

  return urlData.publicUrl
}

// ── Insert story row into Supabase ────────────────────────────────────
async function insertStoryRow(story: SystemStory, audioUrl: string, slug: string): Promise<void> {
  // Check if this story already exists to make the script idempotent
  const { data: existing, error: existingError } = await supabase
    .from('stories')
    .select('id')
    .eq('is_system', true)
    .eq('seed_batch', SEED_BATCH)
    .ilike('title', story.title)
    .maybeSingle()

  if (existingError) {
    throw new Error(`DB lookup failed for ${story.title}: ${existingError.message}`)
  }

  if (existing) {
    console.log(`  [DB] Already exists, updating audio_url: ${story.title}`)
    const { error } = await supabase
      .from('stories')
      .update({
        text_content: story.content.trim(),
        audio_url: audioUrl,
        status: 'completed',
        audio_status: 'completed',
      })
      .eq('id', existing.id)

    if (error) throw new Error(`DB update failed for ${story.title}: ${error.message}`)
    return
  }

  const { error } = await supabase.from('stories').insert({
    title: story.title,
    text_content: story.content.trim(),
    mood: story.mood,
    language: story.language,
    audio_url: audioUrl,
    duration_seconds: estimateDurationSeconds(story),
    status: 'completed',
    audio_status: 'completed',
    is_system: true,
    seed_batch: SEED_BATCH,
    user_id: null,
    child_profile_id: null,
    // created_at defaults to NOW()
  })

  if (error) throw new Error(`DB insert failed for ${story.title}: ${error.message}`)
}

// ── Seed a single story ───────────────────────────────────────────────
async function seedStory(story: SystemStory, index: number): Promise<void> {
  const slug = slugify(story.title, index)
  console.log(`\n[${index + 1}/${SYSTEM_STORIES.length}] ${story.title}`)
  console.log(
    `  Language: ${story.language} | Mood: ${story.mood} | Age: ${story.age_min}–${story.age_max}`
  )

  let lastError: Error | null = null

  for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
    try {
      console.log(`  [TTS] Generating audio (attempt ${attempt})…`)
      const audioBuffer = await generateTTS(story, attempt)
      console.log(`  [TTS] Done — ${audioBuffer.length} bytes`)

      console.log(`  [Storage] Uploading to story-audio/system-stories/${SEED_BATCH}/${slug}.wav…`)
      const audioUrl = await uploadAudio(audioBuffer, slug)
      console.log(`  [Storage] Uploaded — ${audioUrl}`)

      console.log(`  [DB] Inserting row…`)
      await insertStoryRow(story, audioUrl, slug)
      console.log(`  [DB] Done ✓`)

      return // Success
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
      console.error(`  [ERROR] Attempt ${attempt} failed: ${lastError.message}`)
      if (attempt < RETRY_ATTEMPTS) {
        console.log(`  Retrying in 3 seconds…`)
        await new Promise(resolve => setTimeout(resolve, 3000))
      }
    }
  }

  console.error(`  [FAILED] Skipping ${story.title} after ${RETRY_ATTEMPTS} attempts`)
  FAILED_STORIES.push({ title: story.title, error: lastError?.message ?? 'Unknown error' })
}

// ── Main ──────────────────────────────────────────────────────────────
const FAILED_STORIES: { title: string; error: string }[] = []

// For initial testing you can temporarily restrict the set of stories, e.g.:
// const STORIES_TO_SEED = SYSTEM_STORIES.slice(0, 1)
const STORIES_TO_SEED = SYSTEM_STORIES

async function ensureBucketExists(): Promise<void> {
  const { data: bucket, error } = await supabase.storage.getBucket(STORAGE_BUCKET)
  if (bucket) return

  if (error && !/not found/i.test(error.message)) {
    console.warn(`[Storage] getBucket error for ${STORAGE_BUCKET}: ${error.message}`)
  }

  const { error: createError } = await supabase.storage.createBucket(STORAGE_BUCKET, {
    public: true,
  })

  if (createError) {
    throw new Error(`Failed to create storage bucket "${STORAGE_BUCKET}": ${createError.message}`)
  }

  console.log(`  [Storage] Created bucket "${STORAGE_BUCKET}"`)
}

export async function main() {
  console.log('════════════════════════════════════════')
  console.log('  Bolo Buddy — System Story Seeder')
  console.log(`  Batch: ${SEED_BATCH}`)
  console.log(`  Stories: ${STORIES_TO_SEED.length}`)
  console.log('════════════════════════════════════════')

  // Ensure storage bucket exists before we start seeding
  try {
    await ensureBucketExists()
  } catch (err) {
    console.warn('Bucket check skipped — assuming bucket exists:', err)
  }

  // Process in batches to respect Sarvam rate limits
  for (let i = 0; i < STORIES_TO_SEED.length; i += BATCH_SIZE) {
    const batch = STORIES_TO_SEED.slice(i, i + BATCH_SIZE)
    console.log(
      `\n── Batch ${Math.floor(i / BATCH_SIZE) + 1} (stories ${i + 1}–${Math.min(
        i + BATCH_SIZE,
        STORIES_TO_SEED.length
      )}) ──`
    )

    // Run batch sequentially to avoid hammering the TTS API
    for (let j = 0; j < batch.length; j++) {
      await seedStory(batch[j]!, i + j)
      // Small delay between stories
      if (j < batch.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1500))
      }
    }

    // Pause between batches
    if (i + BATCH_SIZE < STORIES_TO_SEED.length) {
      console.log('\n  Pausing 5 seconds between batches…')
      await new Promise(resolve => setTimeout(resolve, 5000))
    }
  }

  // Summary
  console.log('\n════════════════════════════════════════')
  console.log('  Seeding Complete')
  console.log(`  Succeeded: ${STORIES_TO_SEED.length - FAILED_STORIES.length}`)
  console.log(`  Failed:    ${FAILED_STORIES.length}`)

  if (FAILED_STORIES.length > 0) {
    console.log('\n  Failed stories:')
    FAILED_STORIES.forEach(f => console.log(`  ✗ ${f.title}: ${f.error}`))
    throw new Error('Seeding failed')
  } else {
    console.log('\n  All stories seeded successfully ✓')
    return
  }
}

if (require.main === module) {
  main().catch(console.error)
}

