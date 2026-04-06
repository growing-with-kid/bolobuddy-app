import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Example route handler using the Supabase server client.
 * GET /api/health/supabase — verifies the server client works (returns connection status and optional user).
 */
export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      return NextResponse.json(
        {
          ok: true,
          message: 'Supabase server client connected',
          auth: { error: authError.message },
        },
        { status: 200 }
      )
    }

    return NextResponse.json({
      ok: true,
      message: 'Supabase server client connected',
      auth: { user: user ? { id: user.id } : null },
    })
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Supabase server client error',
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    )
  }
}
