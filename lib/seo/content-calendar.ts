import { boloUrl, gwkUrl } from './domains'

export type ContentPlatform = 'gwk-blog' | 'gwk-product' | 'gwk-memory-library' | 'bolo-buddy' | 'bolo-feature'

export type ContentStatus = 'planned' | 'draft' | 'published'

export type ContentCalendarEntry = {
  id: string
  title: string
  platforms: ContentPlatform[]
  primaryKeyword: string
  slug: string
  /** Absolute URL on the owning platform */
  url: string
  status: ContentStatus
  crossLinkTargets: { label: string; url: string }[]
  toneNote: string
}

/** Editorial guardrails — Meera/Pushkar brief, Raghvendra voice first. */
export const CONTENT_TONE_RULES = [
  'Indian culture authentic: festivals, joint families, charpoy nights — never paste-on "exotic India" tropes.',
  'Raghvendra voice first: tired papa honesty, Hinglish warmth, founder story beats — SEO second.',
  'Parent-first, screen-light: activities and audio over screen time; never lead with "download the app".',
  'Child-safe and DPDP-aware: no medical advice, no fear-based parenting hooks.',
  'Cross-link naturally: one warm sentence, not keyword-stuffed anchor text.',
] as const

export const SEO_CONTENT_CALENDAR: ContentCalendarEntry[] = [
  {
    id: 'hindi-bedtime-stories-3-8',
    title: 'Hindi Bedtime Stories for Kids Aged 3–8',
    platforms: ['gwk-blog', 'bolo-buddy'],
    primaryKeyword: 'Hindi bedtime stories for kids aged 3-8',
    slug: 'hindi-bedtime-stories-kids-3-8',
    url: gwkUrl('/blog/hindi-bedtime-stories-kids-3-8'),
    status: 'planned',
    crossLinkTargets: [
      { label: 'Try a Hindi story tonight', url: boloUrl('/bolo-buddy/stories') },
      { label: 'Bolo Buddy — free sample stories', url: boloUrl('/bolo-buddy/sample') },
    ],
    toneNote:
      'Lead with the 9pm exhaustion every Indian parent knows. Mention Devanagari, dadi-style narration, and age-appropriate length — not "AI bedtime app".',
  },
  {
    id: 'ramayan-stories-simple-hindi',
    title: 'Ramayan Stories for Children in Simple Hindi',
    platforms: ['bolo-buddy'],
    primaryKeyword: 'Ramayan stories for children in simple Hindi',
    slug: 'mythology-ramayan',
    url: boloUrl('/bolo-buddy/stories?mood=mythology'),
    status: 'planned',
    crossLinkTargets: [
      { label: 'Screen-light Ramayan activity cards', url: gwkUrl('/memory-library/ramayan-bedtime') },
      { label: 'Growing With Kid — mythology activities', url: gwkUrl('/memory-library') },
    ],
    toneNote:
      'Devotion without sermonising. Simple Hindi, one moral per story, Pari as gentle guide — respect festivals without politics.',
  },
  {
    id: 'hinglish-bedtime-story-ideas',
    title: 'Hinglish Bedtime Story Ideas',
    platforms: ['gwk-memory-library'],
    primaryKeyword: 'Hinglish bedtime story ideas',
    slug: 'hinglish-bedtime-story-ideas',
    url: gwkUrl('/memory-library/hinglish-bedtime-ideas'),
    status: 'planned',
    crossLinkTargets: [
      { label: 'Generate a Hinglish story', url: boloUrl('/bolo-buddy/stories') },
      { label: 'Bolo Buddy home', url: boloUrl('/bolo-buddy') },
    ],
    toneNote:
      'Celebrate code-switching as normal — "Beta, lights off" energy. Prompt cards parents can read aloud, not grammar lessons.',
  },
  {
    id: 'panchatantra-life-lessons',
    title: 'Panchatantra Stories with Life Lessons in English',
    platforms: ['bolo-buddy', 'gwk-blog'],
    primaryKeyword: 'Panchatantra stories with life lessons in English',
    slug: 'panchatantra-life-lessons-english',
    url: gwkUrl('/blog/panchatantra-stories-life-lessons-english'),
    status: 'planned',
    crossLinkTargets: [
      { label: 'Courage & kindness stories', url: boloUrl('/bolo-buddy/stories?mood=courage') },
      { label: 'Panchatantra printable activity', url: gwkUrl('/memory-library/panchatantra-lessons') },
    ],
    toneNote:
      'One animal, one lesson, one quiet minute after. English accessible to NRI and urban parents; tie to Indian folktale roots.',
  },
  {
    id: 'bedtime-routine-working-parents',
    title: 'Bedtime Routine for Indian Working Parents',
    platforms: ['gwk-blog'],
    primaryKeyword: 'bedtime routine for Indian working parents',
    slug: 'bedtime-routine-indian-working-parents',
    url: gwkUrl('/blog/bedtime-routine-indian-working-parents'),
    status: 'planned',
    crossLinkTargets: [
      { label: 'Audio stories when you are still at work', url: boloUrl('/bolo-buddy') },
      { label: 'Papa Ki Awaaz — your voice at bedtime', url: boloUrl('/bolo-buddy/papa-ki-awaaz') },
    ],
    toneNote:
      'Late shifts, joint-family handoffs, no guilt parenting. Practical 20-minute routine — story last, screen off first.',
  },
  {
    id: 'dadi-ki-kahaniyaan',
    title: 'Dadi Ki Kahaniyaan — Grandparent Storytelling Prompts',
    platforms: ['gwk-product'],
    primaryKeyword: 'Dadi ki kahaniyaan grandparent storytelling prompts',
    slug: 'dadi-ki-kahaniyaan',
    url: gwkUrl('/dadi-ki-kahaniyaan'),
    status: 'planned',
    crossLinkTargets: [
      { label: 'Mythology mood — Ramayan & Krishna', url: boloUrl('/bolo-buddy/stories?mood=mythology') },
      { label: 'Hindi bedtime on Bolo Buddy', url: boloUrl('/bolo-buddy/stories') },
    ],
    toneNote:
      'Grandparents as heroes, not babysitters. Printable prompt decks + "record Dadi\'s version" — warm, never patronising.',
  },
  {
    id: 'papa-ki-awaaz',
    title: "Papa Ki Awaaz — Father's Voice at Bedtime",
    platforms: ['bolo-feature'],
    primaryKeyword: "Papa ki awaaz father's voice at bedtime",
    slug: 'papa-ki-awaaz',
    url: boloUrl('/bolo-buddy/papa-ki-awaaz'),
    status: 'planned',
    crossLinkTargets: [
      { label: 'Bedtime routine for working parents', url: gwkUrl('/blog/bedtime-routine-indian-working-parents') },
      { label: 'Founder story — why Bolo Buddy exists', url: boloUrl('/bolo-buddy/about') },
    ],
    toneNote:
      'Founder story forward: late office, beti awake, papa guilt. Waitlist CTA soft — emotion before feature list.',
  },
]

export function getCalendarEntry(id: string): ContentCalendarEntry | undefined {
  return SEO_CONTENT_CALENDAR.find((entry) => entry.id === id)
}

export function getEntriesByPlatform(platform: ContentPlatform): ContentCalendarEntry[] {
  return SEO_CONTENT_CALENDAR.filter((entry) => entry.platforms.includes(platform))
}
