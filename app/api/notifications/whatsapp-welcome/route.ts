import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { phone, childName } = await req.json()
    if (!phone || !childName) return NextResponse.json({ success: false })

    const message = `Namaste! 🌙 ${childName} ke liye Bolo Buddy ready hai.\nAaj raat pehli kahani sunao — bilkul free.\n👉 ${process.env.NEXT_PUBLIC_APP_URL}/bolo-buddy/stories`

    await fetch(process.env.WHATSAPP_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${process.env.WHATSAPP_API_KEY}`,
      },
      body: JSON.stringify({
        countryCode: '+91',
        phoneNumber: phone,
        type: 'text',
        message,
        channels: [{ type: 'whatsapp' }],
      }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('WhatsApp welcome failed:', err)
    return NextResponse.json({ success: false })
  }
}
