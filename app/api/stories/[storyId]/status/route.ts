import { NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

type Status = 'pending' | 'processing' | 'completed' | 'failed'

export async function GET(
  request: Request,
  context: { params: Promise<{ storyId: string }> }
) {
  const { storyId } = await context.params
  if (!storyId) {
    return NextResponse.json({ error: 'Missing storyId' }, { status: 400 })
  }

  const authHeader = request.headers.get('authorization')
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null

  let user: { id: string } | null

  if (bearerToken) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    if (!url || !anonKey || !serviceKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }
    const authClient = createSupabaseClient(url, anonKey, {
      auth: { persistSession: false },
    })
    const {
      data: { user: u },
      error,
    } = await authClient.auth.getUser(bearerToken)
    if (error || !u) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }
    user = u
  } else {
    const supabase = await createServerClient()
    const {
      data: { user: u },
    } = await supabase.auth.getUser()
    user = u
  }

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !serviceKey) {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  const supabase = createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false },
  })

  const { data: row, error } = await supabase
    .from('stories')
    .select('id, status, audio_url, user_id')
    .eq('id', storyId)
    .single()

  if (error || !row) {
    return NextResponse.json({ error: 'Story not found' }, { status: 404 })
  }

  if (row.user_id !== user.id) {
    return NextResponse.json({ error: 'Story not found' }, { status: 404 })
  }

  let status: Status
  if (row.status === 'failed') {
    status = 'failed'
  } else if (row.audio_url) {
    status = 'completed'
  } else if (row.status === 'pending' || row.status === 'processing') {
    status = row.status as Status
  } else if (row.status === 'completed' && !row.audio_url) {
    // Treat \"completed\" without audio_url as still processing so the client keeps polling
    status = 'processing'
  } else {
    status = 'processing'
  }

  return NextResponse.json({
    status,
    storyId: row.id,
  })
}
