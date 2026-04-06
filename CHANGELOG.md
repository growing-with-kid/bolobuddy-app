# Changelog

Progress and changes for the Bolo Buddy / GWK landing page.

---

## 2025-02-23 — Landing design match & polish

### Nav
- Nav is **transparent**, `position: absolute`, floating over hero (no background, border, or shadow).
- **Left:** Features, Languages. **Center:** GWK logo (`/GWK - Logo.svg`, 56×56). **Right:** Pricing, About.
- Link color: `text-gray-800` (readable on hero). Container: `max-w-3xl` so links sit closer to logo.

### Hero
- **Subtitle** “Try a sample—no signup needed.” uses `text-body-charcoal` for contrast.
- **CTA button** color: `#FBA81A` (inline style; also in `--cta-orange` in `globals.css`).
- **Background image:** `object-position: 50% -50px` so image sits slightly lower.
- **Section:** `min-h-[65vh]`, `pt-16 pb-0` to reduce gap below hero.

### How It Works
- **Spacing:** `mt-12 pt-12 pb-20 px-6` so there’s less empty space between hero and “Pick age & mood”.
- Content and phone mockup unchanged.

### Feature Cards (`FeatureCards.tsx`)
- **Icons:** Replaced SVG/emoji with PNGs: `Try_Sample.png`, `Audio_Stories.png`, `Gentle_Stories.png` (files in `public/` renamed to use underscores).
- **Card container:** White card enforced with **inline styles** (bg `#ffffff`, border, shadow, `rounded-24px`, padding) so it always shows.
- **Icon area:** Full-width, 160px tall, so the image fills the top of the card. Card has `minHeight: 320px`.
- **Copy:** Updated titles and descriptions per reference. Grid: `max-w-4xl` / 900px, 3 cols on md+.
- **next.config.ts:** `images: { unoptimized: true }` for local images.

### Sample Stories
- **Background:** SVG blob replaced with **CSS radial gradients** (warm orange/pink glow) for reliable visibility; no SVG dependency.
- Section padding and content (heading, story pills, CTA) unchanged.

### Pricing (`Pricing.tsx`)
- **Labels:** “Free forever” → **FREE PLAN**; “COMING SOON” → **PREMIUM**.
- **Subtitle:** “Per member, monthly” on both cards.
- **Left card:** “Bedtime Stories:” + list (3 stories/month, 8 themes, 3 languages, save & replay, 3 voices).
- **Right card:** “Premium Services:” + list (unlimited stories, 30+ languages, 191 voices, save/replay, priority support).
- **Cards:** `rounded-3xl`, `max-w-4xl mx-auto` grid. Buttons unchanged (black “Start Free →”, “Get started”).
- **Rupee text:** `font-serif` removed from ₹0 and ₹299 so they use the **current/body font** instead of Playfair Display.

### Other
- **Dev server:** Restarted; process on port 3000 killed when needed; `npm run dev` runs on 3000.
- **React error #299:** Confirmed from a Chrome extension’s `createRoot` call, not from app code.

### Files touched
- `components/landing/Nav.tsx`
- `components/landing/Hero.tsx`
- `components/landing/HowItWorks.tsx`
- `components/landing/FeatureCards.tsx`
- `components/landing/SampleStories.tsx`
- `components/landing/Pricing.tsx`
- `app/globals.css` (CTA color)
- `next.config.ts` (images)
- `public/`: renamed `Try Sample.png` → `Try_Sample.png`, etc.

---

## Resume tomorrow

- [ ] Review landing in browser (all sections, mobile).
- [ ] Any remaining design tweaks from reference.
- [ ] Optional: revert rupee to serif if design prefers it.
- [ ] Continue from here.

---

*Changelog started 2025-02-23. Add new entries above this line.*
