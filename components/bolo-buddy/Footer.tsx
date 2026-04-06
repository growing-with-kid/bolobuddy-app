import Link from 'next/link'

const socialLinks = [
  { emoji: '📸', label: 'Instagram', href: 'https://instagram.com/growingwithkid' },
  { emoji: '💼', label: 'LinkedIn', href: 'https://linkedin.com/company/growingwithkid' },
  { emoji: '🐦', label: 'Twitter/X', href: 'https://twitter.com/growingwithkid' },
  { emoji: '💬', label: 'WhatsApp', href: 'https://wa.me/message/growingwithkid' },
]

const footerNavLinks = [
  { label: 'Features', href: '/bolo-buddy#features' },
  { label: 'Pricing', href: '/bolo-buddy#pricing' },
  { label: 'About', href: '/bolo-buddy/about' },
  { label: 'Papa Ki Awaaz', href: '/bolo-buddy/papa-ki-awaaz' },
  { label: 'Terms', href: '/bolo-buddy/terms' },
  { label: 'Privacy', href: '/bolo-buddy/privacy' },
  { label: 'Contact', href: 'mailto:growingwithkid@gmail.com', external: true },
]

interface BoloFooterProps {
  /** When "full", shows two-row layout: brand + links, then copy + social (About page mockup). */
  variant?: 'default' | 'full'
}

export default function BoloFooter({ variant = 'default' }: BoloFooterProps) {
  if (variant === 'full') {
    return (
      <footer className="w-full bg-[#2D2D2D] text-white px-6 py-14">
        <div className="max-w-[900px] mx-auto">
          <div className="flex flex-wrap gap-6 justify-between items-start mb-8">
            <div>
              <p className="font-['Nunito',sans-serif] font-black text-lg">
                🌙 Bolo <span className="text-[#FFD166]">Buddy</span>
              </p>
              <p className="text-xs text-white/40 mt-1.5 leading-relaxed max-w-[280px]">
                Bedtime stories rooted in Indian culture.<br />
                For parents, grandparents, and caregivers.
              </p>
            </div>
            <nav className="flex flex-wrap gap-5 mt-1.5" aria-label="Footer links">
              {footerNavLinks.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-[13px] text-white/45 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[13px] text-white/45 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>
          <div
            className="pt-5 border-t border-white/10 flex flex-wrap gap-3 justify-between items-center"
            style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}
          >
            <p className="text-xs text-white/30">
              © 2026 Growing With Kid · Faridabad, India · Made with care by Raghvendra
            </p>
            <div className="flex gap-4">
              {socialLinks.slice(0, 3).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/35 hover:text-white transition-colors"
                >
                  {link.emoji} {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer
      className="w-full bg-[#1A1A2E] text-center"
      style={{
        padding: '40px 24px 32px',
        paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <p
        className="text-xl font-bold text-white"
        style={{ fontFamily: 'var(--font-playfair-display)' }}
      >
        🌙 Bolo Buddy
      </p>
      <p
        className="mt-1 text-[13px] text-white/55"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        Bedtime stories rooted in Indian culture. For parents, grandparents, and caregivers.
      </p>

      <span
        className="mt-3 inline-block rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[1.5px]"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          background: 'rgba(255, 92, 26, 0.15)',
          border: '1px solid rgba(255, 92, 26, 0.3)',
          color: '#FF8C5A',
        }}
      >
        ✦ Beta · Building in Public
      </span>

      <p
        className="mx-auto mt-2.5 max-w-[280px] text-[13px] italic leading-[1.6] text-white/40"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        Made with care by Raghvendra — a parent, a designer, a storyteller.
      </p>

      <div
        className="my-6 w-full"
        style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
      />

      <div className="flex flex-wrap items-center justify-center gap-5">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-[12px] font-medium text-white/65 transition-all duration-200 hover:border-[#FF5C1A]/30 hover:bg-[#FF5C1A]/15 hover:text-[#FF8C5A]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            {link.emoji} {link.label}
          </a>
        ))}
      </div>

      <p
        className="mt-5 text-[11px] text-white/25"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        © 2026 Growing with Kid
      </p>
    </footer>
  )
}
