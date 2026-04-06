'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

// ─────────────────────────────────────────────────────────
// BoloNav — shared navigation bar for all Bolo Buddy pages
//
// variant="default"     → cream bg, dark/purple links
//                          Use on: About, inner pages
//
// variant="dark"        → near-black bg, white/yellow links
//                          Use on: Papa Ki Awaaz (dark hero)
//
// variant="transparent" → transparent bg, white links
//                          Use on: Home (overlays hero image)
//
// centerLogo=true      → Growing with Kid logo in center (Home, About)
// floating=true        → no bg; when over dark hero use light text, over cream use dark text
// ─────────────────────────────────────────────────────────

const FLOATING_HERO_THRESHOLD = 400; // scroll Y (px) below which nav is over dark hero → use light text

type NavVariant = 'default' | 'dark' | 'transparent';

interface BoloNavProps {
  variant?: NavVariant;
  /** When true, nav is flush with top (e.g. About page). When false, nav has 20px top offset. */
  flushTop?: boolean;
  /** When true, show GWK logo centered with links on left/right (e.g. Home, About). */
  centerLogo?: boolean;
  /** When true, nav is a floating pill (inset mx, no bg). Use on About page. */
  floating?: boolean;
}

export function BoloNav({ variant = 'default', flushTop = false, centerLogo = false, floating = false }: BoloNavProps) {
  const [open, setOpen] = useState(false);
  const [overDarkHero, setOverDarkHero] = useState(true);
  const [hash, setHash] = useState('');
  const pathname = usePathname();
  const isAbout = pathname === '/bolo-buddy/about';
  const isPapa  = pathname === '/bolo-buddy/papa-ki-awaaz';
  const isHome = pathname === '/bolo-buddy' || pathname === '/bolo-buddy/';
  const isFeaturesActive = isHome && (hash === '' || hash === 'features');
  const isLanguagesActive = isHome && hash === 'languages';
  const isPricingActive = isHome && hash === 'pricing';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setHash(window.location.hash.slice(1).toLowerCase());
    const onHashChange = () => setHash(window.location.hash.slice(1).toLowerCase());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [pathname]);

  useEffect(() => {
    if (!floating) return;
    const onScroll = () => setOverDarkHero(typeof window !== 'undefined' ? window.scrollY < FLOATING_HERO_THRESHOLD : true);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [floating]);

  const useLightText = floating ? overDarkHero : (variant === 'dark' || variant === 'transparent');

  // ── Nav background ── (when floating, outer is transparent)
  const navBg =
    floating
      ? 'bg-transparent border-0'
      : variant === 'dark'
      ? 'bg-[#0D0520]/90 backdrop-blur-md border-b border-[#FFD166]/15'
      : variant === 'transparent'
      ? 'bg-transparent border-b border-transparent'
      : 'bg-transparent border-b border-transparent';

  // ── Logo: when floating over dark hero, add drop-shadow so logo is visible
  const logoColor =
    useLightText ? 'text-white' : (variant === 'default' ? 'text-[#7B2FBE]' : 'text-white');

  // ── Regular link style (default variant uses orange hover/active per design)
  const linkBase =
    useLightText
      ? 'text-white/90 hover:text-[#FFD166]'
      : variant === 'default'
      ? 'text-[#2D2D2D] hover:text-[#FF6B35]'
      : 'text-white/65 hover:text-white';

  // ── Active link style (default variant: orange)
  const activeLink =
    useLightText
      ? 'text-[#FFD166] font-semibold border-b-2 border-[#FFD166] pb-0.5'
      : variant === 'default'
      ? 'text-[#FF6B35] font-semibold border-b-2 border-[#FF6B35] pb-0.5'
      : 'text-[#FFD166] font-semibold border-b-2 border-[#FFD166] pb-0.5';

  // ── Hamburger line color ──
  const hamburgerColor =
    useLightText ? 'bg-white' : (variant === 'default' ? 'bg-[#2D2D2D]' : 'bg-white');

  // ── Mobile menu (when floating over dark hero: dark bg + light text)
  const mobileMenuBg =
    useLightText
      ? 'bg-[#0D0520]/95 border-t border-white/10'
      : variant === 'dark'
      ? 'bg-[#0D0520] border-t border-[#FFD166]/15'
      : 'bg-transparent border-t border-transparent';

  const mobileLinkColor =
    useLightText
      ? 'text-white/70 hover:text-white'
      : variant === 'dark' || variant === 'transparent'
      ? 'text-white/70 hover:text-white'
      : 'text-[#2D2D2D] hover:text-[#7B2FBE]';

  const mobileActiveColor =
    useLightText
      ? 'text-[#FFD166] font-semibold'
      : variant === 'dark' || variant === 'transparent'
      ? 'text-[#FFD166] font-semibold'
      : 'text-[#FF6B35] font-semibold';

  const getLinkClass = (active: boolean) =>
    `text-sm font-semibold transition-colors duration-200 ${active ? activeLink : linkBase}`;

  const getMobileLinkClass = (active: boolean) =>
    `text-sm font-medium transition-colors ${active ? mobileActiveColor : mobileLinkColor}`;

  const topClass = flushTop ? 'top-0' : 'top-5';
  const logoDropShadow =
    (floating && overDarkHero) || variant === 'dark' || variant === 'transparent'
      ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
      : '';

  const innerClassName = floating
    ? 'mx-4 rounded-[20px] px-6 h-16 flex items-center justify-between relative'
    : 'max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative';

  return (
    <nav className={`fixed ${topClass} left-0 right-0 z-50 ${navBg}`}>
      <div className={innerClassName}>

        {centerLogo ? (
          <>
            {/* Desktop: left links | center logo | right links */}
            {/* Mobile: logo left, hamburger right (logo left-aligned to avoid nav pushed off-screen) */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/bolo-buddy#features"  className={getLinkClass(isFeaturesActive)}>Features</Link>
              <Link href="/bolo-buddy#languages" className={getLinkClass(isLanguagesActive)}>Languages</Link>
            </div>
            {/* Mobile: logo left. Desktop: logo centered absolutely */}
            <div className={`flex-shrink-0 md:flex-1 flex justify-center md:justify-center ${logoDropShadow} md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:pointer-events-none`}>
              <Link href="/bolo-buddy" className="block md:pointer-events-auto" aria-label="Growing with Kid — Home">
                <Image
                  src="/GWK - Logo.svg"
                  alt="Growing with Kid"
                  width={56}
                  height={56}
                  priority
                  unoptimized
                  className="h-12 w-auto md:h-14"
                />
              </Link>
            </div>
            {/* On mobile this spacer pushes hamburger to the right */}
            <div className="flex-1 min-w-0 md:flex-initial md:contents" aria-hidden />

            <div className="hidden md:flex items-center gap-8 flex-shrink-0">
              <Link href="/bolo-buddy#pricing"   className={getLinkClass(isPricingActive)}>Pricing</Link>
              <Link href="/bolo-buddy/about"     className={getLinkClass(isAbout)}>About</Link>
            </div>
            <button
              className="md:hidden p-2 flex flex-col gap-1.5 flex-shrink-0 min-h-[44px] min-w-[44px] items-center justify-center"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 ${hamburgerColor} transition-transform`} />
              <span className={`block w-5 h-0.5 ${hamburgerColor}`} />
              <span className={`block w-5 h-0.5 ${hamburgerColor} transition-transform`} />
            </button>
          </>
        ) : (
          <>
            {/* Logo — left-aligned */}
            <Link
              href="/bolo-buddy"
              className={`font-['Nunito',sans-serif] font-black text-lg ${logoColor} flex items-center gap-2 no-underline`}
            >
              🌙 Bolo Buddy
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/bolo-buddy#features"   className={getLinkClass(false)}>Features</Link>
              <Link href="/bolo-buddy#languages"  className={getLinkClass(false)}>Languages</Link>
              <Link href="/bolo-buddy#pricing"    className={getLinkClass(false)}>Pricing</Link>
              <Link href="/bolo-buddy/about"      className={getLinkClass(isAbout)}>About</Link>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 flex flex-col gap-1.5"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 ${hamburgerColor} transition-transform`} />
              <span className={`block w-5 h-0.5 ${hamburgerColor}`} />
              <span className={`block w-5 h-0.5 ${hamburgerColor} transition-transform`} />
            </button>
          </>
        )}
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={`md:hidden ${mobileMenuBg} px-4 py-4 flex flex-col gap-4`}>
          <Link href="/bolo-buddy#features"  onClick={() => setOpen(false)} className={getMobileLinkClass(isFeaturesActive)}>Features</Link>
          <Link href="/bolo-buddy#languages" onClick={() => setOpen(false)} className={getMobileLinkClass(isLanguagesActive)}>Languages</Link>
          <Link href="/bolo-buddy#pricing"   onClick={() => setOpen(false)} className={getMobileLinkClass(isPricingActive)}>Pricing</Link>
          <Link href="/bolo-buddy/about"     onClick={() => setOpen(false)} className={getMobileLinkClass(isAbout)}>About</Link>
          <Link
            href="/bolo-buddy/papa-ki-awaaz"
            onClick={() => setOpen(false)}
            className={getMobileLinkClass(isPapa)}
          >
            Papa Ki Awaaz ✦
          </Link>
        </div>
      )}
    </nav>
  );
}
