import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

export async function POST(request: Request) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim()
  if (!keySecret) {
    return NextResponse.json(
      { success: false, error: 'Server configuration error' },
      { status: 500 }
    )
  }

  let body: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
    userId: string
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = body

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields' },
      { status: 400 }
    )
  }

  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex')

  const sigBuffer = Buffer.from(razorpay_signature, 'utf8')
  const expectedBuffer = Buffer.from(expectedSignature, 'utf8')
  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return NextResponse.json(
      { success: false, error: 'Invalid signature' },
      { status: 400 }
    )
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !serviceKey) {
    return NextResponse.json(
      { success: false, error: 'Server configuration error' },
      { status: 500 }
    )
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false },
  })

  const { data, error: getUserError } = await supabase.auth.admin.getUserById(userId)
  if (getUserError || !data?.user) {
    return NextResponse.json(
      { success: false, error: 'User not found' },
      { status: 404 }
    )
  }

  const existingMetadata = (data.user.user_metadata as Record<string, unknown>) ?? {}
  const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: {
      ...existingMetadata,
      plan: 'premium',
      premium_since: new Date().toISOString(),
    },
  })

  if (updateError) {
    console.error('Supabase updateUserById error:', updateError)
    return NextResponse.json(
      { success: false, error: 'Failed to update subscription' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
