import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null

  if (!bearerToken) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    )
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !anonKey || !serviceKey) {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  const authClient = createClient(url, anonKey, {
    auth: { persistSession: false },
  })
  const {
    data: { user },
    error: authError,
  } = await authClient.auth.getUser(bearerToken)

  if (authError || !user) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    )
  }

  let body: { subscription?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }

  const subscription = body.subscription
  if (!subscription || typeof subscription !== 'object') {
    return NextResponse.json(
      { error: 'Missing or invalid subscription' },
      { status: 400 }
    )
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false },
  })

  const { error } = await supabase.from('push_subscriptions').upsert(
    { user_id: user.id, subscription },
    { onConflict: 'user_id' }
  )

  if (error) {
    console.error('Push subscription upsert error:', error)
    return NextResponse.json(
      { error: 'Failed to save subscription' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
