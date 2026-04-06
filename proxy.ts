import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Redirect /signup to /bolo-buddy/signup while preserving query params (e.g. ?ref= for referrals).
 * Guarantees referral links like /signup?ref=CODE work regardless of Next.js config redirect behavior.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/signup') {
    const url = request.nextUrl.clone()
    url.pathname = '/bolo-buddy/signup'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/signup'],
}
