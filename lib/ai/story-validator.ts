// Bolo Buddy — Story quality validation before TTS
// Catches issues that would make narration feel rushed or robotic.

export interface ValidationResult {
  passed: boolean
  issues: string[]
  score: number // 0–100
}

/**
 * Validate generated story quality for bedtime narration.
 * Returns passed: true when score >= 70.
 */
export function validateStoryQuality(story: string, childName: string): ValidationResult {
  const issues: string[] = []
  let score = 100

  // Exclamation marks — not allowed
  const exclamationCount = (story.match(/!/g) || []).length
  if (exclamationCount > 0) {
    issues.push(`Found ${exclamationCount} exclamation mark(s) — remove all`)
    score -= exclamationCount * 10
  }

  // Sentence length — flag if many sentences exceed 14 words
  const sentences = story.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 10)
  const longSentences = sentences.filter((s) => s.split(/\s+/).length > 14)
  if (longSentences.length > 2) {
    issues.push(`${longSentences.length} sentences exceed 14 words`)
    score -= longSentences.length * 5
  }

  // Child name usage — aim for 3–5
  const nameCount = (story.match(new RegExp(escapeRegExp(childName), 'gi')) || []).length
  if (nameCount < 2) {
    issues.push(`Child name "${childName}" used only ${nameCount} time(s) — aim for 3–5`)
    score -= 10
  }

  // Pauses (ellipses) — need some for natural pacing
  const pauseCount = (story.match(/\.\.\./g) || []).length
  if (pauseCount < 3) {
    issues.push(`Only ${pauseCount} pause(s) — add more ellipses for natural pacing`)
    score -= 10
  }

  // Calming refrain — simple heuristic: any phrase of 3+ words appearing 2+ times
  const phrases = story.match(/\b\w+(?:\s+\w+){2,}[^.!?]*/g) || []
  const phraseCounts = phrases.reduce<Record<string, number>>((acc, p) => {
    const normalized = p.toLowerCase().trim().replace(/\s+/g, ' ')
    if (normalized.length < 8) return acc
    acc[normalized] = (acc[normalized] || 0) + 1
    return acc
  }, {})
  const hasRefrain = Object.values(phraseCounts).some((count) => count >= 2)
  if (!hasRefrain) {
    issues.push('No calming refrain found — add a phrase that repeats 2–3 times')
    score -= 15
  }

  return {
    passed: score >= 70,
    issues,
    score: Math.max(0, score),
  }
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
