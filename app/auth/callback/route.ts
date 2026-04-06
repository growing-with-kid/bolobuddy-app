import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** Build HTML that redirects via script + meta refresh so Gmail/Android in-app browser follows the redirect. */
function redirectHtml(destination: string, message: string): NextResponse {
  const escaped = destination.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${escaped}"><title>Redirecting</title></head><body><p>${message}</p><script>window.location.replace(${JSON.stringify(destination)});</script><p><a href="${escaped}">Continue</a></p></body></html>`;
  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const ref = searchParams.get('ref');
  const origin = request.nextUrl.origin;

  if (!code) {
    return redirectHtml(`${origin}/bolo-buddy/signup?error=oauth_failed`, 'Something went wrong. Please try again.');
  }

  const supabase = await createClient();

  const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

  if (sessionError) {
    console.error('Auth callback error:', sessionError);
    return redirectHtml(`${origin}/bolo-buddy/signup?error=session_failed`, 'Sign-in failed. Please try again.');
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirectHtml(`${origin}/bolo-buddy/signup?error=no_user`, 'Something went wrong. Please try again.');
  }

  if (ref?.trim()) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    if (url && serviceKey) {
      const serviceSupabase = createSupabaseClient(url, serviceKey, { auth: { persistSession: false } });
      const { data: referrerId } = await serviceSupabase.rpc('get_referrer_id_by_code', { ref_code: ref.trim() });
      const referrerUuid = referrerId as string | null | undefined;
      if (referrerUuid && referrerUuid !== user.id) {
        try {
          await serviceSupabase.from('referrals').insert({
            referrer_id: referrerUuid,
            referred_id: user.id,
          });
        } catch {
          // Ignore duplicate or other insert errors
        }
      }
    }
  }

  const { data: childProfile } = await supabase
    .from('child_profiles')
    .select('id')
    .eq('user_id', user.id)
    .limit(1)
    .maybeSingle();

  const destination = childProfile
    ? `${origin}/bolo-buddy/dashboard`
    : `${origin}/bolo-buddy/onboarding`;
  return redirectHtml(destination, 'Confirming your email…');
}
