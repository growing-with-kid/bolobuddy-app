'use client'

import Image from 'next/image'
import Link from 'next/link'

interface NavProps {
  onOpenModal?: () => void
  /** Use on dark backgrounds (e.g. Papa Ki Awaaz hero) for light text and readable bar */
  variant?: 'light' | 'dark'
}

export function Nav({ onOpenModal, variant = 'light' }: NavProps) {
  const isDark = variant === 'dark'
  const linkClass = isDark
    ? 'text-sm font-medium text-white/80 hover:text-white transition-colors'
    : 'text-sm font-medium text-gray-800 hover:text-gray-600 transition-colors'

  return (
    <nav
      className={`fixed top-5 left-0 right-0 z-50 px-8 py-4 ${isDark ? 'bg-[#0D0520]/90 backdrop-blur-[12px] border-b border-white/10' : ''}`}
    >
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        {/* Left links */}
        <div className="flex items-center gap-8">
          <Link href="#features" className={linkClass}>
            Features
          </Link>
          <Link href="#languages" className={linkClass}>
            Languages
          </Link>
        </div>

        {/* Center logo — no filter on dark so logo stays visible; drop-shadow helps on dark bg */}
        <div className={`absolute left-1/2 -translate-x-1/2 ${isDark ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : ''}`}>
          <Image
            src="/GWK - Logo.svg"
            alt="Growing with Kid"
            width={56}
            height={56}
            priority
            unoptimized
          />
        </div>

        {/* Right links */}
        <div className="flex items-center gap-8">
          <Link href="#pricing" className={linkClass}>
            Pricing
          </Link>
          <Link href="/bolo-buddy/about" className={linkClass}>
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}
