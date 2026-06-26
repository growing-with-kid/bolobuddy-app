import type { MetadataRoute } from 'next'
import { BOLO_ORIGIN, GWK_ORIGIN } from './domains'
import { SEO_CONTENT_CALENDAR } from './content-calendar'

type SitemapEntry = MetadataRoute.Sitemap[number]

/** In-app routes served from this Next.js deployment (bolobuddy.in + growingwithkid.com root). */
const LOCAL_STATIC_ROUTES: { path: string; priority: number; changeFrequency: SitemapEntry['changeFrequency'] }[] = [
  { path: '/', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/bolo-buddy', priority: 1, changeFrequency: 'weekly' },
  { path: '/bolo-buddy/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/bolo-buddy/sample', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/bolo-buddy/papa-ki-awaaz', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/bolo-buddy/pricing', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
]

/**
 * Cross-domain SEO mesh entries.
 * GWK blog/product URLs are included even when not yet live — status tracked in content-calendar.
 * Search engines may crawl 404s until published; calendar status remains `planned`.
 */
function crossDomainEntries(): SitemapEntry[] {
  const now = new Date()
  const boloLocal = new Set(LOCAL_STATIC_ROUTES.map((r) => r.path))

  const fromCalendar: SitemapEntry[] = SEO_CONTENT_CALENDAR.flatMap((entry) => {
    const isBolo = entry.url.startsWith(BOLO_ORIGIN)
    const isGwk = entry.url.startsWith(GWK_ORIGIN)

    if (isBolo) {
      try {
        const path = new URL(entry.url).pathname
        if (boloLocal.has(path)) return []
      } catch {
        /* keep external-style bolo URLs */
      }
    }

    if (!isBolo && !isGwk) return []

    return [
      {
        url: entry.url,
        lastModified: now,
        changeFrequency: entry.status === 'published' ? 'monthly' : 'yearly',
        priority: entry.status === 'published' ? 0.75 : 0.5,
      },
    ]
  })

  const gwkHub: SitemapEntry[] = [
    {
      url: `${GWK_ORIGIN}/memory-library`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  return [...fromCalendar, ...gwkHub]
}

export function buildSitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? BOLO_ORIGIN).replace(/\/$/, '')

  const local: SitemapEntry[] = LOCAL_STATIC_ROUTES.map((route) => ({
    url: `${appUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  return [...local, ...crossDomainEntries()]
}
