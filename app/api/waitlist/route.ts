import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Waitlist signup. Uses anon key only (no cookies). Requires:
 * - NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in env
 * - waitlist table with RLS policy allowing insert + grant insert to anon
 */
export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  if (!url || !anonKey) {
    return NextResponse.json(
      { message: 'Waitlist is not configured. Missing Supabase URL or key.', type: 'error' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const email = body?.email?.toString()?.trim()
    if (!email) {
      return NextResponse.json({ message: 'Email is required.', type: 'error' }, { status: 400 })
    }

    const supabase = createClient(url, anonKey, { auth: { persistSession: false } })
    const { error } = await supabase.from('waitlist').insert({ email })

    if (error) {
      const errMsg = (error.message ?? '').toLowerCase()
      if (error.code === '23505') {
        return NextResponse.json({
          message: "You're already on the list. We'll be in touch soon!",
          type: 'duplicate',
        })
      }
      if (errMsg.includes('fetch failed') || errMsg.includes('failed to fetch') || errMsg.includes('network')) {
        return NextResponse.json(
          {
            message:
              "We can't reach Supabase right now. If you use the free tier, your project may be paused — open dashboard.supabase.com, select your project, and click Resume.",
            type: 'error',
          },
          { status: 502 }
        )
      }
      if (error.code === '42501' || errMsg.includes('permission')) {
        return NextResponse.json({
          message: "Waitlist isn't set up yet. Run the waitlist migration and grant in Supabase.",
          type: 'error',
        })
      }
      if (error.code === '42P01' || errMsg.includes('does not exist')) {
        return NextResponse.json({
          message: "Waitlist table is missing. Run the waitlist migration in Supabase SQL.",
          type: 'error',
        })
      }
      return NextResponse.json(
        { message: `Something went wrong. Please try again. (${error.message})`, type: 'error' },
        { status: 500 }
      )
    }
    return NextResponse.json({
      message: "You're on the list. We'll be in touch!",
      type: 'success',
    })
  } catch (err) {
    const msg = (err instanceof Error ? err.message : String(err)).toLowerCase()
    if (msg.includes('fetch failed') || msg.includes('econnrefused') || msg.includes('network')) {
      return NextResponse.json(
        {
          message:
            "We can't reach Supabase right now. If you use the free tier, your project may be paused — open dashboard.supabase.com, select your project, and click Resume.",
          type: 'error',
        },
        { status: 502 }
      )
    }
    return NextResponse.json(
      { message: `Something went wrong. Please try again. (${err instanceof Error ? err.message : String(err)})`, type: 'error' },
      { status: 500 }
    )
  }
}
