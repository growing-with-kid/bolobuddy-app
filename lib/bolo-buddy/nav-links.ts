/** Shared Bolo Buddy top-nav labels and hrefs — used by Navbar on every page. */
export const NAV_LINKS = [
  { label: 'What Bolo Does', href: '/bolo-buddy#features' },
  { label: 'How It Works', href: '/bolo-buddy#how-it-works' },
  { label: 'Stories', href: '/bolo-buddy#languages' },
] as const

export const NAV_LINKS_RIGHT = [
  { label: 'Plans', href: '/bolo-buddy#pricing' },
  { label: 'Our Story', href: '/bolo-buddy/about' },
] as const

export const NAV_LINKS_ALL = [...NAV_LINKS, ...NAV_LINKS_RIGHT] as const
