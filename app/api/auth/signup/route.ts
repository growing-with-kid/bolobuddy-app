import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

export async function POST(request: Request) {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Signup is temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const email = body?.email?.trim()
    const password = body?.password
    const fullName = body?.fullName?.trim()
    const ref = body?.ref ? String(body.ref).trim() : undefined

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 })
    }

    const base = process.env.NEXT_PUBLIC_APP_URL?.trim()?.replace(/\/$/, '')
    const redirectPath = '/bolo-buddy/onboarding'
    const redirectUrl = base
      ? `${base}/auth/callback?next=${encodeURIComponent(redirectPath)}${ref ? `&ref=${encodeURIComponent(ref)}` : ''}`
      : undefined

    const supabase = await createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName ?? '' },
        emailRedirectTo: redirectUrl,
      },
    })

    if (error) {
      const msg = error.message.toLowerCase()
      if (msg.includes('fetch') || msg.includes('network') || msg.includes('failed to fetch')) {
        return NextResponse.json(
          {
            error:
              "We couldn't reach our auth service. Check your connection. If you're the site owner, ensure your Supabase project is active at dashboard.supabase.com (free tier projects pause after inactivity).",
          },
          { status: 502 }
        )
      }
      // Supabase returns this when Email (or other) provider is disabled in Auth → Providers
      if (
        msg.includes('provider') &&
        (msg.includes('not enabled') || msg.includes('validation_failed'))
      ) {
        return NextResponse.json(
          {
            error:
              "Email signup is not enabled for this app. If you're the site owner, enable the Email provider in Supabase: Authentication → Providers → Email.",
          },
          { status: 400 }
        )
      }
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Check if email confirmation is required
    if (data.user && !data.session) {
      return NextResponse.json(
        { error: null, requiresConfirmation: true },
        { status: 200 }
      )
    }

    return NextResponse.json({ error: null }, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: 'Signup is temporarily unavailable. Please try again later.' },
      { status: 503 }
    )
  }
}
