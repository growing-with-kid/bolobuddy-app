'use client'

import Link from 'next/link'

export default function TonightStoryHero({ childName }: { childName: string | null }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-7 transition-all hover:-translate-y-1"
      style={{
        background: 'linear-gradient(135deg, #2D1A2E 0%, #3D1A00 100%)',
        boxShadow: '0 8px 40px rgba(88,45,10,0.12)',
      }}
    >
      {/* glow */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(232,82,10,0.25) 0%, transparent 70%)' }}
      />
      {/* moon watermark */}
      <div className="pointer-events-none absolute bottom-4 right-6 text-6xl opacity-20 leading-none select-none">🌙</div>

      <p className="mb-2.5 text-xs font-bold uppercase tracking-widest" style={{ color: '#E8520A' }}>
        ✨ Tonight&apos;s Story
      </p>
      <h2
        className="mb-2 text-2xl font-bold leading-snug text-white"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        What will {childName ?? 'your child'}<br />dream about tonight?
      </h2>
      <p className="mb-6 max-w-xs text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
        Choose a mood and language — a fresh story is ready in seconds.
      </p>
      <div className="flex gap-3">
        <Link
          href="/bolo-buddy/stories/history"
          className="rounded-full border px-5 py-2.5 text-sm font-medium text-white no-underline transition-all hover:bg-white/20"
          style={{ borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)' }}
        >
          Pichli Kahaniyaan →
        </Link>
      </div>
    </div>
  )
}
