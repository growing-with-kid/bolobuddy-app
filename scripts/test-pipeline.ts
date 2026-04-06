/**
 * Test the full story generation pipeline by calling the API route directly.
 *
 * Run from project root (dev server must be running on port 3000):
 *   npx ts-node scripts/test-pipeline.ts
 *
 * Env (or replace placeholders below):
 *   TEST_AUTH_TOKEN   - Supabase JWT (e.g. from session after sign-in)
 *   TEST_USER_ID      - UUID of test user (auth.users.id)
 *   TEST_CHILD_PROFILE_ID - UUID of test child profile
 *
 */

const API_URL = 'http://localhost:3000/api/stories/generate'

const body = {
  childName: 'Arjun',
  childAge: 5,
  language: 'hindi',
  mood: 'bedtime',
  userId: process.env.TEST_USER_ID ?? 'YOUR_TEST_USER_UUID',
  childProfileId: process.env.TEST_CHILD_PROFILE_ID ?? 'YOUR_TEST_CHILD_UUID',
}

async function main() {
  const token = process.env.TEST_AUTH_TOKEN?.trim()
  if (!token) {
    console.error('Missing TEST_AUTH_TOKEN. Set it to a Supabase JWT (e.g. from session after sign-in).')
    process.exit(1)
  }
  if (body.userId === 'YOUR_TEST_USER_UUID' || body.childProfileId === 'YOUR_TEST_CHILD_UUID') {
    console.error('Set TEST_USER_ID and TEST_CHILD_PROFILE_ID (or replace placeholders in the script).')
    process.exit(1)
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  const data = await res.json().catch(() => ({}))
  console.log('Status:', res.status)
  console.log('Response:', JSON.stringify(data, null, 2))

  if (data.success && data.storyId != null) {
    console.log('storyId:', data.storyId)
    console.log('title:', data.title ?? '(none)')
    console.log('audioUrl:', data.audioUrl ?? '(none)')
    if (data.audioUrl) {
      console.log('TTS SUCCESS - audio ready')
    } else {
      console.log('TTS PENDING - text saved, audio will retry')
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
