import { NextResponse } from 'next/server'

const BEEHIIV_API_BASE = 'https://api.beehiiv.com/v2'
const SOURCE_TAG = 'bolo-buddy-signup'

/**
 * Beehiiv newsletter subscribe (server-side only).
 * Env: BEEHIIV_API_KEY, BEEHIIV_PUBLICATION_ID (pub_… from Beehiiv dashboard).
 *
 * Meera — paste into every GWK Beehiiv issue footer (muted, single-line warm footnote):
 * P.S. Bacche ke liye bedtime story ready hai — Bolo Buddy pe try karo.
 * Link: https://www.bolobuddy.in/bolo-buddy
 */
export async function POST(request: Request) {
  const apiKey = process.env.BEEHIIV_API_KEY?.trim()
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID?.trim()

  if (!apiKey || !publicationId) {
    console.error('Beehiiv newsletter: missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID')
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const email = body?.email?.toString()?.trim()
    if (!email) {
      return NextResponse.json({ ok: false, error: 'email_required' }, { status: 400 })
    }

    const createRes = await fetch(
      `${BEEHIIV_API_BASE}/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          utm_source: SOURCE_TAG,
          send_welcome_email: true,
          reactivate_existing: false,
        }),
      }
    )

    const createData = await createRes.json().catch(() => ({}))

    if (!createRes.ok) {
      console.error('Beehiiv create subscription failed:', createRes.status, createData)
      return NextResponse.json({ ok: false, error: 'subscribe_failed' }, { status: 502 })
    }

    const subscriptionId = createData?.data?.id as string | undefined
    if (subscriptionId) {
      const tagRes = await fetch(
        `${BEEHIIV_API_BASE}/publications/${publicationId}/subscriptions/${subscriptionId}/tags`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tags: [SOURCE_TAG] }),
        }
      )
      if (!tagRes.ok) {
        console.error('Beehiiv tag subscription failed:', tagRes.status, await tagRes.text().catch(() => ''))
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Beehiiv newsletter subscribe error:', err)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
