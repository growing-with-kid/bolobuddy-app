# SEO Content Calendar — GWK × Bolo Buddy

> **Tone rules (all content):** Indian culture authentic · Raghvendra voice first · SEO second · Parent-first, screen-light · One natural cross-link per piece · Child-safe, DPDP-aware.

Source of truth for sitemaps and internal links: [`lib/seo/content-calendar.ts`](../lib/seo/content-calendar.ts).

| # | Title | Platform(s) | Primary keyword | Slug / URL | Status | Cross-links | Tone note |
|---|-------|-------------|-----------------|------------|--------|-------------|-----------|
| 1 | Hindi Bedtime Stories for Kids Aged 3–8 | GWK blog + Bolo Buddy | Hindi bedtime stories for kids aged 3-8 | `/blog/hindi-bedtime-stories-kids-3-8` → [bolobuddy.in/stories](https://www.bolobuddy.in/bolo-buddy/stories) | planned | Bolo stories, sample | 9pm exhaustion; dadi-style Hindi; not "AI app" lead |
| 2 | Ramayan Stories for Children in Simple Hindi | Bolo Buddy mythology | Ramayan stories for children in simple Hindi | `/bolo-buddy/stories?mood=mythology` | planned | GWK Ramayan activity, Memory Library | Devotion without sermonising; one moral per story |
| 3 | Hinglish Bedtime Story Ideas | GWK Memory Library | Hinglish bedtime story ideas | `/memory-library/hinglish-bedtime-ideas` | planned | Bolo Hinglish generator | Code-switching normal; prompt cards for read-aloud |
| 4 | Panchatantra Stories with Life Lessons in English | Bolo Buddy + GWK | Panchatantra stories with life lessons in English | `/blog/panchatantra-stories-life-lessons-english` | planned | Bolo courage/kindness moods, printable | One animal, one lesson; NRI-friendly English |
| 5 | Bedtime Routine for Indian Working Parents | GWK blog | bedtime routine for Indian working parents | `/blog/bedtime-routine-indian-working-parents` | planned | Bolo home, Papa Ki Awaaz | Late shifts; 20-min routine; no guilt hooks |
| 6 | Dadi Ki Kahaniyaan | GWK product | Dadi ki kahaniyaan grandparent storytelling prompts | `/dadi-ki-kahaniyaan` | planned | Bolo mythology, Hindi stories | Grandparents as heroes; printable prompts |
| 7 | Papa Ki Awaaz | Bolo Buddy feature | Papa ki awaaz father's voice at bedtime | `/bolo-buddy/papa-ki-awaaz` | planned | GWK routine post, About | Founder guilt story; soft waitlist CTA |

## Blog → Bolo Buddy footer template

Use `gwkBlogBoloBuddyFooter(topic)` from [`lib/seo/internal-links.ts`](../lib/seo/internal-links.ts). Example for working-parent routine:

> P.S. Step 4 of the routine: one story, lights dim. → Bolo Buddy — audio bedtime stories: https://www.bolobuddy.in/bolo-buddy

## Ownership

- **Meera / Pushkar:** GWK blog + Memory Library drafts  
- **Raghvendra:** voice review before publish  
- **Engineering:** calendar status + sitemap via `lib/seo/content-calendar.ts`

_Last updated: June 2026 · Growing with Kid OPC Private Limited_
