import type { MetadataRoute } from 'next'
import { GWK_ORIGIN } from '@/lib/seo/domains'

export default function robots(): MetadataRoute.Robots {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.bolobuddy.in').replace(/\/$/, '')

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: [`${appUrl}/sitemap.xml`, `${GWK_ORIGIN}/sitemap.xml`],
  }
}
