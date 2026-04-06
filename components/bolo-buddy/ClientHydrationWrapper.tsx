'use client'

import { useState, useEffect } from 'react'

/**
 * Renders children only after mount to avoid hydration mismatch when
 * browser extensions (e.g. Cursor) inject attributes into the DOM before React hydrates.
 */
export function ClientHydrationWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) {
    return <div className="min-h-screen bg-[#FFF8F0]" aria-hidden />
  }
  return <>{children}</>
}
