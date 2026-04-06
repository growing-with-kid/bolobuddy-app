'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const FLOATING_HERO_THRESHOLD = 400;

interface NavbarProps {
  variant?: 'light' | 'dark' | 'transparent';
  /** When true, nav is transparent and text/logo switch by scroll (light over dark hero, dark over light sections). */
  floating?: boolean;
  /** When true, nav is a floating pill: top 20px, side margins 16px, rounded-[20px], cream bg with blur. Use on home page. */
  pill?: boolean;
}

const NAV_LINKS = [
  { label: 'Features', href: '/bolo-buddy#features' },
  { label: 'How it works', href: '/bolo-buddy#how-it-works' },
  { label: 'Languages', href: '/bolo-buddy#languages' },
];

const NAV_LINKS_RIGHT = [
  { label: 'Pricing', href: '/bolo-buddy#pricing' },
  { label: 'About', href: '/bolo-buddy/about' },
];

export default function Navbar({ variant = 'light', floating = false, pill = false }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [overDarkHero, setOverDarkHero] = useState(true);

  useEffect(() => {
    if (!floating || typeof window === 'undefined') return;
    const onScroll = () => setOverDarkHero(window.scrollY < FLOATING_HERO_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [floating]);

  const useDarkStyle = floating ? !overDarkHero : variant === 'light';
  const effectiveVariant = floating ? (overDarkHero ? 'dark' : 'light') : variant;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '#');

  const textColor = !useDarkStyle
    ? 'text-white/80 hover:text-white'
    : 'text-[#2D2D2D]/70 hover:text-[#FF6B35]';

  const activeColor = !useDarkStyle
    ? 'text-white border-b-2 border-white'
    : 'text-[#FF6B35] border-b-2 border-[#FF6B35]';

  const bgColor = pill
    ? 'bg-[#FFF8F0]/97 backdrop-blur-[16px] border border-[#FFD166]/35 rounded-[20px] shadow-[0_4px_24px_rgba(45,45,45,0.08)]'
    : floating
      ? 'bg-transparent border-0'
      : effectiveVariant === 'dark'
        ? 'bg-[#0D0520]/80 backdrop-blur-sm border-b border-white/10'
        : effectiveVariant === 'transparent'
          ? 'bg-transparent'
          : 'bg-[#FFF8F0] border-b border-[#2D2D2D]/[0.12] shadow-[0_1px_0_0_rgba(45,45,45,0.06)]';

  const logoColor = !useDarkStyle ? 'text-white' : 'text-[#2D2D2D]';
  const hamburgerColor = !useDarkStyle ? 'bg-white' : 'bg-[#2D2D2D]';
  const mobileMenuBg = !useDarkStyle ? 'bg-[#0D0520]/95 border-b border-white/10' : 'bg-[#FFF8F0] border-b border-[#2D2D2D]/10';
  const mobileLinkColor = !useDarkStyle ? 'text-white/80' : 'text-[#2D2D2D]';

  const navPosition = pill ? 'top-5 left-4 right-4' : 'top-0 left-0 right-0';

  return (
    <nav className={`fixed ${navPosition} z-[100] h-16 ${bgColor} ${pill ? 'flex items-center' : ''}`}>
      <div className={`w-full h-full flex items-center justify-between relative ${pill ? 'px-7 max-w-6xl mx-auto' : 'max-w-6xl mx-auto px-6'}`}>

        {/* Left nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors duration-200 pb-0.5
                ${isActive(link.href) ? activeColor : textColor}
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile: left-aligned logo */}
        <div className="md:hidden">
          <Link href="/bolo-buddy" className={`flex items-center gap-2 ${logoColor}`}>
            <span className="text-2xl">🌙</span>
            <span className="font-extrabold text-base">
              Bolo Buddy
            </span>
          </Link>
        </div>

        {/* Centre logo — desktop only */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <Link href="/bolo-buddy" className={`flex items-center gap-2 ${logoColor}`}>
            <span className="text-2xl">🌙</span>
            <span className="font-extrabold text-base">
              Bolo Buddy
            </span>
          </Link>
        </div>

        {/* Right nav links — desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS_RIGHT.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors duration-200 pb-0.5
                ${isActive(link.href) ? activeColor : textColor}
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-0.5 mb-1 transition-all ${hamburgerColor}`} />
          <div className={`w-5 h-0.5 mb-1 ${hamburgerColor}`} />
          <div className={`w-5 h-0.5 ${hamburgerColor}`} />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className={`md:hidden px-6 py-4 flex flex-col gap-4 ${mobileMenuBg}`}>
          {[...NAV_LINKS, ...NAV_LINKS_RIGHT].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold ${mobileLinkColor} ${isActive(link.href) ? activeColor : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
