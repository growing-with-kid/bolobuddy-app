import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import webpush from 'web-push'

const PAYLOAD = {
  title: 'Kahani ka waqt aa gaya 🌙',
  body: 'Aaj raat ki kahani tayaar karo',
  url: '/bolo-buddy/stories',
}

export async function GET(request: Request) {
  const cronSecret = request.headers.get('x-cron-secret')
  const expected = process.env.CRON_SECRET?.trim()
  if (!expected || cronSecret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const vapidPublic = process.env.VAPID_PUBLIC_KEY?.trim()
  const vapidPrivate = process.env.VAPID_PRIVATE_KEY?.trim()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

  if (!vapidPublic || !vapidPrivate || !url || !serviceKey) {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  webpush.setVapidDetails(
    'mailto:growingwithkid@gmail.com',
    vapidPublic,
    vapidPrivate
  )

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false },
  })

  const { data: rows, error } = await supabase
    .from('push_subscriptions')
    .select('id, user_id, subscription')

  if (error) {
    console.error('Push subscriptions fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }

  let sent = 0
  let failed = 0
  const toDelete: string[] = []

  for (const row of rows ?? []) {
    try {
      await webpush.sendNotification(
        row.subscription as webpush.PushSubscription,
        JSON.stringify(PAYLOAD)
      )
      sent++
    } catch (err) {
      const statusCode = err && typeof err === 'object' && 'statusCode' in err ? (err as { statusCode: number }).statusCode : 0
      if (statusCode === 410) {
        toDelete.push(row.id)
      }
      failed++
    }
  }

  for (const id of toDelete) {
    await supabase.from('push_subscriptions').delete().eq('id', id)
  }

  return NextResponse.json({
    sent,
    failed,
    deleted: toDelete.length,
  })
}
