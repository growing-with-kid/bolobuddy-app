'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const PARALLAX_FACTOR = 0.3

type HeroProps = {
  onOpenModal?: () => void
  signupHref?: string
  sampleHref?: string
}

export function Hero({ sampleHref, signupHref }: HeroProps) {
  const [mounted, setMounted] = useState(false)
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const scrollY = window.scrollY
        const section = sectionRef.current
        const heroHeight = section?.getBoundingClientRect().height ?? 0
        const offset = scrollY * (1 - PARALLAX_FACTOR)
        const maxOffset = heroHeight * (1 - PARALLAX_FACTOR)
        setParallaxOffset(heroHeight > 0 ? Math.min(offset, maxOffset) : 0)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Run after layout so section height is available
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(onScroll)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(t)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[85vh] flex flex-col items-center justify-center bg-white pb-0 pt-[120px] sm:pt-16"
    >
      {/* Hero background - parallax layer; extends above/below so no gap when translating */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          zIndex: 0,
          top: '-30%',
          height: '160%',
          transform: `translate3d(0, ${parallaxOffset}px, 0)`,
        }}
      >
        <Image
          src="/Hero_Image_Banner.png"
          alt=""
          fill
          priority
          className="object-cover object-top"
          style={{ objectPosition: '50% -50px' }}
          sizes="100vw"
        />
      </div>

      {/* Bottom fade to white — prevents gradient bleed into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          zIndex: 5,
          background: 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.85) 40%, transparent 100%)',
        }}
        aria-hidden
      />

      {/* Hero text content - above background */}
      <div
        className={`relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center transition-all duration-600 ease-out w-full min-w-0 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}
        style={{ transitionDuration: '0.6s' }}
      >
        <h1
          className="font-serif text-body-charcoal mb-4 text-[clamp(1.5rem,5vw,2.75rem)] leading-tight sm:mb-6 sm:text-4xl md:text-5xl break-words"
          style={{ color: 'var(--body-charcoal)' }}
        >
          Be there at bedtime, even when you can&apos;t be.
        </h1>
        <p className="text-body-charcoal/90 text-base sm:text-lg mb-6 max-w-xl" style={{ color: 'var(--body-charcoal)', opacity: 0.9 }}>
          No animations. No algorithms. Just a voice and a story.
        </p>
        {sampleHref ? (
          <>
            <p
              className="text-sm font-medium mt-4 mb-2"
              style={{ color: '#8A7B6F' }}
            >
              🌙 Trusted by 1,500+ Indian families
            </p>
            <div
              className="mt-4 inline-block rounded-[100px] p-2"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 70%)',
            }}
          >
            <Link
              href={signupHref ?? sampleHref}
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-[#FF6B35] text-white font-bold text-base rounded-[100px] min-h-[56px] shadow-[0_8px_32px_rgba(255,107,53,0.35)] hover:bg-[#e55c25] hover:shadow-[0_12px_40px_rgba(255,107,53,0.45)] active:scale-95 transition-all duration-200"
            >
              Try a free story →
            </Link>
          </div>
          </>
        ) : (
          <p style={{ color: '#ffffff', fontSize: '16px' }} className="mt-4 font-medium">
            Try a sample—no signup needed.
          </p>
        )}
      </div>
    </section>
  )
}
