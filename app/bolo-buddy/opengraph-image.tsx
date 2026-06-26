import {
  BOLO_BUDDY_DEFAULT_TITLE,
  createBoloBuddyOgImage,
  OG_CONTENT_TYPE,
  OG_SIZE,
  formatOgHeadline,
} from '@/lib/og/shared'

export const alt = formatOgHeadline(BOLO_BUDDY_DEFAULT_TITLE)
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return createBoloBuddyOgImage(BOLO_BUDDY_DEFAULT_TITLE)
}
