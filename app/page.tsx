import { Nav } from '@/components/landing/Nav'
import { Footer } from '@/components/landing/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-[#1A0A00]">
      <Nav />
      <main className="flex min-h-[50vh] flex-col items-center justify-center px-6 pt-32 pb-16 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF6B35]">
          Growing With Kid
        </p>
        <h1
          className="mt-3 max-w-lg text-[clamp(28px,5vw,44px)] font-semibold leading-tight"
          style={{ fontFamily: 'var(--font-playfair-display)' }}
        >
          Less screen. More stories.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-[#8A7B6F]">
          Hands-on family activities and screen-light bedtime stories — made for Indian parents.
        </p>
      </main>
      <Footer />
    </div>
  )
}
