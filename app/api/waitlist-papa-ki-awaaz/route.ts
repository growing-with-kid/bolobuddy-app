import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const Schema = z.object({
  email: z.string().email(),
})

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !serviceKey) {
    return NextResponse.json(
      { type: 'error', message: 'Kuch gadbad hui. Dobara try karo.' },
      { status: 503 }
    )
  }

  const supabase = createClient(url, serviceKey)

  try {
    const body = await req.json()
    const parsed = Schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { type: 'error', message: 'Valid email chahiye.' },
        { status: 400 }
      )
    }

    const { email } = parsed.data

    const { error } = await supabase
      .from('waitlist_papa_ki_awaaz')
      .insert({ email: email.toLowerCase().trim() })

    if (error) {
      // 23505 = unique_violation (already on waitlist)
      if (error.code === '23505') {
        return NextResponse.json(
          {
            type: 'duplicate',
            message: 'Tum already list mein ho 🌙 Launch hone par pehle batayenge.',
          },
          { status: 200 }
        )
      }
      console.error('waitlist_papa_ki_awaaz insert error:', error)
      return NextResponse.json(
        { type: 'error', message: 'Kuch gadbad hui. Dobara try karo.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        type: 'success',
        message: 'Ho gaya 🌙 Launch ke din tum pehle jaanoge.',
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('waitlist-papa-ki-awaaz unexpected error:', err)
    return NextResponse.json(
      { type: 'error', message: 'Kuch gadbad hui. Dobara try karo.' },
      { status: 500 }
    )
  }
}
