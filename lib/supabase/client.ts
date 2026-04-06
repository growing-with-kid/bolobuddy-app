import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase client for browser/client components (e.g. signup form, auth state).
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  if (!url || !key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them to .env.local.'
    )
  }
  return createBrowserClient(url, key)
}
