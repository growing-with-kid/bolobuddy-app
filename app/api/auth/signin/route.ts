import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = body?.email?.trim()
    const password = body?.password

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      const msg = error.message.toLowerCase()
      if (msg.includes('fetch') || msg.includes('network') || msg.includes('failed to fetch')) {
        return NextResponse.json(
          { error: "Can't reach Supabase. Check your connection and that your project is active at dashboard.supabase.com." },
          { status: 502 }
        )
      }
      return NextResponse.json({ error: error.message }, { status: 401 })
    }
    return NextResponse.json({ error: null })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Sign in failed.'
    if (message.includes('fetch') || message.includes('Supabase') || message.includes('env')) {
      return NextResponse.json(
        { error: "Can't reach Supabase. Check that your project is active at dashboard.supabase.com." },
        { status: 502 }
      )
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
