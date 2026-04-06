/**
 * Test script for generateStoryAudio (lib/tts/sarvam.ts).
 *
 * Run from project root:
 *   npx ts-node scripts/test-tts.ts
 *
 * (If path alias @/ fails with ts-node, use: npx tsx scripts/test-tts.ts)
 *
 * Requires: SARVAM_API_KEY, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */

import { generateStoryAudio } from '@/lib/tts/sarvam'

const HINDI_STORY =
  "Aaj ki raat... bahut shant thi... Pari apne chote se ghar mein thi... Bahar tare chamak rahe the... ek, do, teen... kai saare tare... Pari ne aankhein band ki... aur dhire dhire... neend aa gayi... Sapne mein woh udd rahi thi... bilkul halki... bilkul shant..."

async function main() {
  try {
    const audioUrl = await generateStoryAudio({
      text: HINDI_STORY,
      language: 'hi-IN',
      voice: 'Kavya',
      storyMood: 'bedtime',
      storyId: 'test-001',
    })
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
