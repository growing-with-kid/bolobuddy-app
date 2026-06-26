const STORIES_COMPLETED_KEY = 'bolo_session_stories_completed'
const GWK_CARD_SHOWN_KEY = 'gwk_card_shown'

function readCount(): number {
  try {
    const raw = sessionStorage.getItem(STORIES_COMPLETED_KEY)
    const n = raw ? parseInt(raw, 10) : 0
    return Number.isFinite(n) ? n : 0
  } catch {
    return 0
  }
}

export function getSessionStoriesCompleted(): number {
  return readCount()
}

/** Increment completed-story count for this browser session. */
export function incrementSessionStoriesCompleted(): number {
  const next = readCount() + 1
  try {
    sessionStorage.setItem(STORIES_COMPLETED_KEY, String(next))
  } catch {
    // ignore
  }
  return next
}

export function hasGwkCardBeenShown(): boolean {
  try {
    return sessionStorage.getItem(GWK_CARD_SHOWN_KEY) === '1'
  } catch {
    return false
  }
}

export function markGwkCardShown(): void {
  try {
    sessionStorage.setItem(GWK_CARD_SHOWN_KEY, '1')
  } catch {
    // ignore
  }
}
