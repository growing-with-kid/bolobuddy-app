type AnalyticsPayload = Record<string, unknown>

type AnalyticsWindow = Window & {
  dataLayer?: AnalyticsPayload[]
  gtag?: (...args: unknown[]) => void
}

/** Fire a custom analytics event (GTM dataLayer / gtag when present). */
export function trackEvent(eventName: string, properties?: AnalyticsPayload) {
  if (typeof window === 'undefined') return

  try {
    const w = window as AnalyticsWindow
    const payload = { event: eventName, ...properties }

    w.dataLayer?.push(payload)
    w.gtag?.('event', eventName, properties)

    window.dispatchEvent(
      new CustomEvent('bolo:analytics', { detail: payload })
    )
  } catch {
    // ignore analytics failures
  }
}
