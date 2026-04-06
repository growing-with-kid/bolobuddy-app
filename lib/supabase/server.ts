import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for server-side usage (Server Components, Server Actions, Route Handlers).
 * Uses Next.js cookies for auth session; setAll is wrapped in try/catch for contexts where setting cookies is not allowed.
 *
 * Usage in Route Handlers: const supabase = await createClient(); then supabase.from('table')...
 * Usage in Server Components: same pattern inside an async server component.
 */
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  if (!url || !key) {
    throw new Error(
      `Supabase env missing: URL=${url ? 'set' : 'missing'}, KEY=${key ? 'set' : 'missing'}. ` +
        'Ensure .env.local has NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then restart the dev server.'
    )
  }

  const cookieStore = await cookies()

  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: object }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore when called from a context where setting cookies is not allowed (e.g. some Server Components)
          }
        },
      },
    }
  )
}
