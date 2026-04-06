import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const ref = searchParams.get('ref')
  const next = searchParams.get('next') ?? '/bolo-buddy/onboarding'
  const origin = request.headers.get('origin') ?? new URL(request.url).origin

  if (!code) {
    return NextResponse.redirect(`${origin}/bolo-buddy/signin`)
  }

  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    // "Unsupported provider: provider is not enabled" → enable Email/Google in Supabase Auth → Providers
    const isProviderDisabled =
      error.message?.toLowerCase().includes('provider') &&
      error.message?.toLowerCase().includes('not enabled')
    const errorParam = isProviderDisabled ? 'provider_disabled' : 'auth'
    return NextResponse.redirect(`${origin}/bolo-buddy/signin?error=${errorParam}`)
  }

  if (ref && user) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    if (url && serviceKey) {
      const serviceSupabase = createSupabaseClient(url, serviceKey, { auth: { persistSession: false } })
      const { data: referrerId } = await serviceSupabase.rpc('get_referrer_id_by_code', { ref_code: ref })
      const referrerUuid = referrerId as string | null
      if (referrerUuid && referrerUuid !== user.id) {
        try {
          await serviceSupabase.from('referrals').insert({
            referrer_id: referrerUuid,
            referred_id: user.id,
          }).select().single()
        } catch {
          // Ignore referral insert errors (e.g. duplicate)
        }
      }
    }
  }

  return NextResponse.redirect(`${origin}${next.startsWith('/') ? next : `/${next}`}`)
}
