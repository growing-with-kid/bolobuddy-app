import type { MetadataRoute } from 'next'
import { buildSitemap } from '@/lib/seo/sitemap-entries'

/**
 * Unified sitemap: bolobuddy.in app routes + planned GWK cross-links.
 * See lib/seo/content-calendar.ts for editorial status per URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap()
}
