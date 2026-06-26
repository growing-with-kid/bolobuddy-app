/** Canonical origins for the GWK ↔ Bolo Buddy SEO mesh. */
export const GWK_ORIGIN = 'https://www.growingwithkid.com' as const
export const BOLO_ORIGIN = 'https://www.bolobuddy.in' as const

export function gwkUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${GWK_ORIGIN}${normalized}`
}

export function boloUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${BOLO_ORIGIN}${normalized}`
}
