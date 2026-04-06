import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null

  if (!bearerToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !anonKey || !serviceKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const authClient = createClient(url, anonKey, { auth: { persistSession: false } })
  const { data: { user }, error: authError } = await authClient.auth.getUser(bearerToken)
  if (authError || !user) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
  }

  let body: { score?: number; comment?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const score = typeof body.score === 'number' ? body.score : Number(body.score)
  if (!Number.isInteger(score) || score < 0 || score > 10) {
    return NextResponse.json({ error: 'score must be an integer between 0 and 10' }, { status: 400 })
  }

  const comment = typeof body.comment === 'string' ? body.comment.trim() || null : null

  const serviceSupabase = createClient(url, serviceKey, { auth: { persistSession: false } })
  const { error: insertError } = await serviceSupabase.from('nps_responses').insert({
    user_id: user.id,
    score,
    comment,
  })
  if (insertError) {
    return NextResponse.json({ error: 'Failed to save response' }, { status: 500 })
  }

  const { data: userData } = await serviceSupabase.auth.admin.getUserById(user.id)
  const existing = (userData?.user?.user_metadata as Record<string, unknown>) ?? {}
  await serviceSupabase.auth.admin.updateUserById(user.id, {
    user_metadata: { ...existing, nps_shown: true },
  })

  return NextResponse.json({ success: true })
}
