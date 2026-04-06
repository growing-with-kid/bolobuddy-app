/**
 * Sanity check: generate one story and verify bedtime prompt behavior.
 *
 * 1. Child's actual name appears in the story body (not "the child" / "the little one")
 * 2. Story has ellipses and short sentences (whisper pace)
 *
 * Run from project root (requires ANTHROPIC_API_KEY in .env.local):
 *   npx tsx scripts/sanity-check-story-prompt.ts
 */

import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { generateStoryText, type StoryConfig } from '../lib/ai/story-prompt'

function loadEnvLocal() {
  const path = resolve(process.cwd(), '.env.local')
  if (!existsSync(path)) {
    console.error('.env.local not found at', path)
    return
  }
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

const CHILD_NAME = 'Arjun'

const config: StoryConfig = {
  childName: CHILD_NAME,
  ageGroup: '5-6',
  mood: 'sleepy',
  language: 'english',
}

function sentenceWordCounts(text: string): number[] {
  const sentences = text.split(/(?<=[.!?])\s+|\n+/).filter(Boolean)
  return sentences.map((s) => s.trim().split(/\s+/).filter(Boolean).length)
}

async function main() {
  const key = process.env.ANTHROPIC_API_KEY?.trim()
  if (!key) {
    console.error('Missing ANTHROPIC_API_KEY in .env.local')
    process.exit(1)
  }

  console.log('Generating one bedtime story for', CHILD_NAME, '...\n')
  const result = await generateStoryText(config)

  const text = result.text
  console.log('--- STORY TEXT ---')
  console.log(text)
  console.log('\n--- END STORY ---\n')

  const nameLower = CHILD_NAME.toLowerCase()
  const nameInBody =
    text.toLowerCase().includes(nameLower) ||
    text.includes(CHILD_NAME)
  const fallbackOnly =
    (text.toLowerCase().includes('the child') || text.toLowerCase().includes('the little one')) &&
    !text.toLowerCase().includes(nameLower) &&
    !text.includes(CHILD_NAME)

  const ellipsesCount = (text.match(/\.\.\./g) || []).length
  const wordCounts = sentenceWordCounts(text)
  const over12 = wordCounts.filter((n) => n > 12).length
  const allUnder12 = over12 === 0

  console.log('--- SANITY CHECK ---')
  console.log('1. Child name in story body:', nameInBody ? 'YES' : 'NO')
  if (fallbackOnly) console.log('   (WARN: only "the child" / "the little one" found)')
  console.log('2. Ellipses (...):', ellipsesCount, 'occurrences')
  console.log('3. Short sentences (≤12 words):', allUnder12 ? 'YES' : `NO (${over12} sentences over 12 words)`)
  if (wordCounts.length > 0) {
    const sample = wordCounts.slice(0, 8).join(', ')
    console.log('   Sample sentence word counts:', sample + (wordCounts.length > 8 ? ', ...' : ''))
  }
  console.log('')
  if (nameInBody && ellipsesCount >= 2 && allUnder12) {
    console.log('PASS: Prompt is doing its job — good to share with beta parents.')
  } else {
    console.log('REVIEW: One or more checks failed. Adjust prompt or regenerate.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
