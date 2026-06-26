import {
  createGwkOgImage,
  GWK_DEFAULT_TITLE,
  OG_CONTENT_TYPE,
  OG_SIZE,
  formatOgHeadline,
} from '@/lib/og/shared'

export const alt = formatOgHeadline(GWK_DEFAULT_TITLE)
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return createGwkOgImage(GWK_DEFAULT_TITLE)
}
