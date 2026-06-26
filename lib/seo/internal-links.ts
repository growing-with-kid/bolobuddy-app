import { boloUrl, gwkUrl } from './domains'
import { getCalendarEntry, type ContentCalendarEntry } from './content-calendar'

export type BoloSeoPage =
  | 'home'
  | 'about'
  | 'stories'
  | 'stories-mythology'
  | 'stories-bedtime'
  | 'papa-ki-awaaz'
  | 'sample'

export type GwkSeoTopic =
  | 'hindi-bedtime-stories-3-8'
  | 'ramayan-stories-simple-hindi'
  | 'hinglish-bedtime-story-ideas'
  | 'panchatantra-life-lessons'
  | 'bedtime-routine-working-parents'
  | 'dadi-ki-kahaniyaan'
  | 'papa-ki-awaaz'

export type CrossLink = {
  label: string
  href: string
  context: string
}

const BOLO_PAGE_PATHS: Record<BoloSeoPage, string> = {
  home: '/bolo-buddy',
  about: '/bolo-buddy/about',
  stories: '/bolo-buddy/stories',
  'stories-mythology': '/bolo-buddy/stories?mood=mythology',
  'stories-bedtime': '/bolo-buddy/stories?mood=bedtime',
  'papa-ki-awaaz': '/bolo-buddy/papa-ki-awaaz',
  sample: '/bolo-buddy/sample',
}

/** Bolo Buddy page → related GWK URLs (activities, blog, product). */
const BOLO_TO_GWK: Record<BoloSeoPage, CrossLink[]> = {
  home: [
    {
      label: 'Hands-on bedtime activities',
      href: gwkUrl('/memory-library'),
      context: 'Screen-light follow-ups after tonight’s story.',
    },
    {
      label: 'Bedtime routine for working parents',
      href: gwkUrl('/blog/bedtime-routine-indian-working-parents'),
      context: 'Practical routine when office runs late.',
    },
  ],
  about: [
    {
      label: 'Growing With Kid — our parent brand',
      href: gwkUrl('/'),
      context: 'Screen-light parenting from the same founder.',
    },
    {
      label: 'Hindi bedtime stories guide',
      href: gwkUrl('/blog/hindi-bedtime-stories-kids-3-8'),
      context: 'Why we built culturally rooted stories.',
    },
  ],
  stories: [
    {
      label: 'Hinglish story prompt cards',
      href: gwkUrl('/memory-library/hinglish-bedtime-ideas'),
      context: 'Ideas when you want to read aloud yourself.',
    },
    {
      label: 'Memory Library',
      href: gwkUrl('/memory-library'),
      context: 'Match tonight’s story with a quiet activity.',
    },
  ],
  'stories-mythology': [
    {
      label: 'Ramayan bedtime activity',
      href: gwkUrl('/memory-library/ramayan-bedtime'),
      context: 'After Ramayan stories — one calm drawing prompt.',
    },
    {
      label: 'Dadi Ki Kahaniyaan prompts',
      href: gwkUrl('/dadi-ki-kahaniyaan'),
      context: 'Grandparents can tell their version tomorrow.',
    },
  ],
  'stories-bedtime': [
    {
      label: 'Hindi bedtime stories (GWK guide)',
      href: gwkUrl('/blog/hindi-bedtime-stories-kids-3-8'),
      context: 'Age 3–8 tips from a tired papa.',
    },
    {
      label: 'Bedtime routine checklist',
      href: gwkUrl('/blog/bedtime-routine-indian-working-parents'),
      context: 'Story fits the last 10 minutes of wind-down.',
    },
  ],
  'papa-ki-awaaz': [
    {
      label: 'Working-parent bedtime routine',
      href: gwkUrl('/blog/bedtime-routine-indian-working-parents'),
      context: 'When you cannot be home — routine still holds.',
    },
    {
      label: 'Dadi Ki Kahaniyaan',
      href: gwkUrl('/dadi-ki-kahaniyaan'),
      context: 'Another way to keep family voices in the room.',
    },
  ],
  sample: [
    {
      label: 'Try a matching activity',
      href: gwkUrl('/memory-library'),
      context: 'After the sample — one screen-free minute.',
    },
  ],
}

/** GWK blog/topic → Bolo Buddy destinations. */
const GWK_TO_BOLO: Record<GwkSeoTopic, CrossLink[]> = {
  'hindi-bedtime-stories-3-8': [
    {
      label: 'Generate a Hindi bedtime story',
      href: boloUrl('/bolo-buddy/stories'),
      context: 'P.S. — free stories in Hindi, Hinglish, and English.',
    },
    {
      label: 'Listen to a sample',
      href: boloUrl('/bolo-buddy/sample'),
      context: 'Hear Pari before you sign up.',
    },
  ],
  'ramayan-stories-simple-hindi': [
    {
      label: 'Mythology stories on Bolo Buddy',
      href: boloUrl('/bolo-buddy/stories?mood=mythology'),
      context: 'Ramayan & Krishna — simple Hindi, child-safe.',
    },
  ],
  'hinglish-bedtime-story-ideas': [
    {
      label: 'Create a Hinglish story tonight',
      href: boloUrl('/bolo-buddy/stories'),
      context: 'Pick Hinglish — beta, pari, and ghar feel included.',
    },
  ],
  'panchatantra-life-lessons': [
    {
      label: 'Kindness & courage stories',
      href: boloUrl('/bolo-buddy/stories?mood=kindness'),
      context: 'Folktale morals — audio, screen-light.',
    },
    {
      label: 'Courage mood stories',
      href: boloUrl('/bolo-buddy/stories?mood=courage'),
      context: 'Brave heroes without scary violence.',
    },
  ],
  'bedtime-routine-working-parents': [
    {
      label: 'Bolo Buddy — audio bedtime stories',
      href: boloUrl('/bolo-buddy'),
      context: 'Step 4 of the routine: one story, lights dim.',
    },
    {
      label: 'Papa Ki Awaaz waitlist',
      href: boloUrl('/bolo-buddy/papa-ki-awaaz'),
      context: 'Your voice when shift ends after bedtime.',
    },
  ],
  'dadi-ki-kahaniyaan': [
    {
      label: 'Mythology bedtime stories',
      href: boloUrl('/bolo-buddy/stories?mood=mythology'),
      context: 'When Dadi wants a ready-made Ramayan tonight.',
    },
  ],
  'papa-ki-awaaz': [
    {
      label: 'Join the Papa Ki Awaaz waitlist',
      href: boloUrl('/bolo-buddy/papa-ki-awaaz'),
      context: 'Record once — stories in your voice every night.',
    },
    {
      label: 'Our founder story',
      href: boloUrl('/bolo-buddy/about'),
      context: 'Built by a papa who was late home too often.',
    },
  ],
}

export function getGwkLinksForBoloPage(page: BoloSeoPage): CrossLink[] {
  return BOLO_TO_GWK[page] ?? []
}

export function getBoloLinksForGwkTopic(topic: GwkSeoTopic): CrossLink[] {
  return GWK_TO_BOLO[topic] ?? []
}

/** Map story mood from play/generate flow → SEO page key for cross-links. */
export function boloPageFromMood(mood: string): BoloSeoPage {
  if (mood === 'mythology') return 'stories-mythology'
  if (mood === 'bedtime') return 'stories-bedtime'
  return 'stories'
}

export function getGwkLinksForStoryMood(mood: string): CrossLink[] {
  return getGwkLinksForBoloPage(boloPageFromMood(mood))
}

/** Primary GWK Memory Library URL — used by post-story cross-promo. */
export function getDefaultGwkMemoryLibraryLink(mood?: string): CrossLink {
  const moodLinks = mood ? getGwkLinksForStoryMood(mood) : []
  const primary = moodLinks[0]
  if (primary) return primary
  return {
    label: 'See tonight’s activity',
    href: gwkUrl('/memory-library'),
    context: 'Growing With Kid — screen-light follow-up.',
  }
}

/**
 * Template for GWK blog authors (Meera/Pushkar) — paste footer CTA block.
 * Not rendered in-app; consumed by newsletter tooling or CMS handoff.
 */
export function gwkBlogBoloBuddyFooter(topic: GwkSeoTopic): {
  primary: CrossLink
  secondary?: CrossLink
  footnote: string
} {
  const links = getBoloLinksForGwkTopic(topic)
  const primary = links[0]
  const secondary = links[1]
  const entry = getCalendarEntry(topic)
  const footnote = entry
    ? `P.S. ${primary.context} → ${primary.label}: ${primary.href}`
  : `P.S. ${primary.context} → ${primary.href}`

  return { primary, secondary, footnote }
}

export function getAllCrossLinkPairs(): {
  boloPage: BoloSeoPage
  gwkTopic: GwkSeoTopic
  boloPath: string
  calendarEntry: ContentCalendarEntry | undefined
}[] {
  const topics = Object.keys(GWK_TO_BOLO) as GwkSeoTopic[]
  return topics.map((topic) => {
    const entry = getCalendarEntry(topic)
    const boloPage: BoloSeoPage =
      topic === 'papa-ki-awaaz'
        ? 'papa-ki-awaaz'
        : topic === 'ramayan-stories-simple-hindi'
          ? 'stories-mythology'
          : topic === 'hindi-bedtime-stories-3-8'
            ? 'stories-bedtime'
            : 'home'
    return {
      boloPage,
      gwkTopic: topic,
      boloPath: BOLO_PAGE_PATHS[boloPage],
      calendarEntry: entry,
    }
  })
}
