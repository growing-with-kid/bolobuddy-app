/**
 * Create a test user and child profile via Supabase admin API (service role).
 * Use the output to run the pipeline test script.
 *
 * Run from project root:
 *   npx tsx scripts/create-test-user.ts
 *
 * Loads .env.local from project root so NEXT_PUBLIC_SUPABASE_URL and
 * SUPABASE_SERVICE_ROLE_KEY are set.
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const loadedEnvKeys: string[] = []

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
    loadedEnvKeys.push(key)
  }
}

loadEnvLocal()

async function createTestUser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !serviceKey) {
    console.error('Missing in .env.local:')
    if (!url) console.error('  - NEXT_PUBLIC_SUPABASE_URL')
    if (!serviceKey) console.error('  - SUPABASE_SERVICE_ROLE_KEY')
    if (loadedEnvKeys.length > 0) console.error('Keys in .env.local:', loadedEnvKeys.join(', '))
    process.exit(1)
  }

  const supabase = createClient(url, serviceKey)

  // 1. Create the auth user (or get existing if email_exists)
  const email = 'test@bolobuddy.in'
  const password = 'TestBolo123!'
  let user: { id: string }

  const { data: userData, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (error) {
    const err = error as { code?: string }
    if (err.code === 'email_exists') {
      // Skip user creation; look up existing user by email
      const { data } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 })
      const users = (data as { users?: { id: string; email?: string }[] })?.users ?? []
      const existing = users.find((u) => u.email === email)
      if (!existing) {
        console.error('User exists but could not look up. Try deleting test@bolobuddy.in in Supabase Auth → Users, then run again.')
        return
      }
      user = { id: existing.id }
      console.log('User already exists. UUID:', user.id)
    } else {
      console.error('User creation failed:', error)
      return
    }
  } else if (userData?.user) {
    user = userData.user
    console.log('User created. UUID:', user.id)
  } else {
    console.error('User creation returned no user')
    return
  }

  // 2. Create a child profile for this user (schema: user_id, name, age_group, preferred_language)
  const { data: child, error: childError } = await supabase
    .from('child_profiles')
    .insert({
      user_id: user.id,
      name: 'Arjun',
      age_group: '5-6',
      preferred_language: 'hi',
    })
    .select()
    .single()

  if (childError) {
    console.error('Child profile failed:', childError)
    return
  }
  console.log('Child profile created. UUID:', child.id)

  // 3. Sign in to get the JWT token
  const { data: sessionData, error: signInError } = await supabase.auth.signInWithPassword({
    email: 'test@bolobuddy.in',
    password: 'TestBolo123!',
  })

  if (signInError) {
    console.error('Sign in failed:', signInError)
    return
  }

  const session = sessionData.session
  if (!session?.access_token) {
    console.error('No access token in session')
    return
  }

  console.log('\n--- Copy these into your test command ---')
  console.log('TEST_USER_ID=' + user.id)
  console.log('TEST_CHILD_PROFILE_ID=' + child.id)
  console.log('TEST_AUTH_TOKEN=' + session.access_token)
}

createTestUser().catch((err) => {
  console.error(err)
  process.exit(1)
})
