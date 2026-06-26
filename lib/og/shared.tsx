import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 } as const
export const OG_CONTENT_TYPE = 'image/png'

export const OG_BACKGROUND = '#FFF8F0'
export const GWK_ACCENT = '#FBA81A'
export const BOLO_BUDDY_ACCENT = '#FF6B35'
export const OG_MUTED = '#8A7F76'
export const OG_HEADLINE_COLOR = '#1A0A00'

export const GWK_DEFAULT_TITLE =
  'Growing With Kid | Screen-Light Parenting for Indian Families'
export const BOLO_BUDDY_DEFAULT_TITLE =
  'Bolo Buddy | Bedtime Stories for Indian Children'

type OgFont = {
  name: string
  data: ArrayBuffer
  style: 'normal'
  weight: 400 | 600 | 700
}

let fontsPromise: Promise<OgFont[]> | null = null

async function loadOgFonts(): Promise<OgFont[]> {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      fetch(
        'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQ.ttf',
      ).then((res) => res.arrayBuffer()),
      fetch(
        'https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTg.ttf',
      ).then((res) => res.arrayBuffer()),
    ]).then(([playfair, dmSans]) => [
      {
        name: 'Playfair Display',
        data: playfair,
        style: 'normal',
        weight: 700,
      },
      {
        name: 'DM Sans',
        data: dmSans,
        style: 'normal',
        weight: 400,
      },
    ])
  }

  return fontsPromise
}

export function getOgBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'http://localhost:3000'
}

/** Prefer the descriptive segment after " | " for the OG headline. */
export function formatOgHeadline(title: string): string {
  const parts = title.split(' | ')
  return parts.length > 1 ? parts.slice(1).join(' | ').trim() : title.trim()
}

type BrandHeaderProps = {
  logoSrc: string
  brandName: string
  subBrand?: string
}

type OgImageOptions = {
  title: string
  accentColor: string
  footer: string
  header: BrandHeaderProps
  subtitle?: string
}

function BrandHeader({ logoSrc, brandName, subBrand }: BrandHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      {/* @vercel/og / Satori requires a native img element */}
      <img src={logoSrc} width={60} height={60} alt="" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <div
          style={{
            fontFamily: 'Playfair Display',
            fontSize: 30,
            fontWeight: 700,
            color: OG_HEADLINE_COLOR,
            lineHeight: 1.1,
          }}
        >
          {brandName}
        </div>
        {subBrand ? (
          <div
            style={{
              fontFamily: 'DM Sans',
              fontSize: 18,
              color: GWK_ACCENT,
            }}
          >
            {subBrand}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export async function createOgImage({
  title,
  accentColor,
  footer,
  header,
  subtitle,
}: OgImageOptions) {
  const fonts = await loadOgFonts()
  const headline = formatOgHeadline(title)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: OG_BACKGROUND,
          padding: '56px 72px 48px',
          justifyContent: 'space-between',
        }}
      >
        <BrandHeader {...header} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            flex: 1,
            justifyContent: 'center',
            paddingTop: 24,
            paddingBottom: 24,
          }}
        >
          <div
            style={{
              fontFamily: 'Playfair Display',
              fontSize: 58,
              fontWeight: 700,
              color: OG_HEADLINE_COLOR,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              maxWidth: 960,
            }}
          >
            {headline}
          </div>
          {subtitle ? (
            <div
              style={{
                fontFamily: 'DM Sans',
                fontSize: 28,
                color: '#4A4038',
                lineHeight: 1.35,
                maxWidth: 900,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontFamily: 'DM Sans',
              fontSize: 22,
              color: OG_MUTED,
            }}
          >
            {footer}
          </div>
          <div
            style={{
              marginTop: 20,
              height: 4,
              width: '100%',
              backgroundColor: accentColor,
            }}
          />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts,
    },
  )
}

export async function createGwkOgImage(title: string = GWK_DEFAULT_TITLE) {
  const baseUrl = getOgBaseUrl()

  return createOgImage({
    title,
    accentColor: GWK_ACCENT,
    footer: 'growingwithkid.com',
    subtitle: 'Stories. Activities. Connection. For Indian families.',
    header: {
      logoSrc: `${baseUrl}/${encodeURIComponent('GWK - Logo.svg')}`,
      brandName: 'Growing With Kid',
    },
  })
}

export async function createBoloBuddyOgImage(
  title: string = BOLO_BUDDY_DEFAULT_TITLE,
) {
  const baseUrl = getOgBaseUrl()

  return createOgImage({
    title,
    accentColor: BOLO_BUDDY_ACCENT,
    footer: 'bolobuddy.in',
    header: {
      logoSrc: `${baseUrl}/icons/owl-logo.svg`,
      brandName: 'Bolo Buddy',
      subBrand: 'by Growing With Kid',
    },
  })
}
