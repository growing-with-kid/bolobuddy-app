import Link from 'next/link'
import { WaitlistForm } from '@/components/landing/WaitlistForm'

export function Footer() {
  return (
    <>
    <section className="bg-[#FFF8F0]">
      <WaitlistForm />
    </section>
    <footer className="bg-gray-900 px-4 py-8 text-white/90">
      <div className="mx-auto max-w-4xl text-center">
        <nav className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
          <Link href="#sample-stories" className="hover:text-white transition-colors">
            Try Story
          </Link>
          <span aria-hidden className="text-white/50">·</span>
          <a
            href="mailto:hello@growingwithkid.com"
            className="hover:text-white transition-colors"
          >
            Send Feedback
          </a>
          <span aria-hidden className="text-white/50">·</span>
          <Link href="#pricing" className="hover:text-white transition-colors">
            Support
          </Link>
        </nav>

        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">
            Companion
          </p>
          <a
            href="https://www.bolobuddy.in/bolo-buddy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/80 transition-colors hover:text-[#FF6B35]"
          >
            🌙 Bolo Buddy — Try Free
          </a>
        </div>

        <p className="mb-4 text-center text-xs leading-relaxed">
          <a
            href="https://www.bolobuddy.in"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline transition-opacity hover:opacity-90"
            style={{ color: '#8A7B6F' }}
          >
            Bedtime stories by{' '}
            <span className="text-[#FF6B35]">Bolo Buddy</span>
            {' '}🦉 — made by GWK, for your family
          </a>
        </p>

        <p className="text-white/70 text-xs">© 2026 Growing with Kid</p>
      </div>
    </footer>
    </>
  )
}
