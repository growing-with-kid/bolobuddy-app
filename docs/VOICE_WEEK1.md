# Week 1 — Sarvam voice track (checklist)

## Environment variables

| Variable | Where | Notes |
|----------|--------|--------|
| `SARVAM_API_KEY` | `.env.local`, Vercel (Production + Preview) | Required for TTS |
| `ANTHROPIC_API_KEY` | Same | Story generation |
| `NEXT_PUBLIC_SUPABASE_URL` | Same | Storage + DB |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same | Auth (when using Bearer token) |
| `SUPABASE_SERVICE_ROLE_KEY` | Same | Storage upload from API route |

## Phase 3 preflight (~15 min)

Do this **now** before treating voice + storage as production-ready.

### Vercel (`gwk-app` org → `bolobuddy-app` project)

1. **Settings → Environment Variables**
   - Add **`SARVAM_API_KEY`** → **Production** and **Preview** (same value as `.env.local`).
   - Confirm **`SUPABASE_SERVICE_ROLE_KEY`** exists for **both** environments (required for [`/api/stories/generate`](../app/api/stories/generate/route.ts) uploads, [`scripts/test-tts.ts`](../scripts/test-tts.ts), and other server-side storage).
2. **Redeploy** after any env change (Deployments → … → **Redeploy**, or push to `main` / empty commit).

### Supabase (project **`ucyybcjkexavpusijwbx`** — `https://ucyybcjkexavpusijwbx.supabase.co`)

1. **Storage** → create bucket **`stories`** if it does not exist.
2. **Public read** for that bucket **or** a policy on **`storage.objects`**: **`SELECT`** where **`bucket_id = 'stories'`** (needed because the app uses **`getPublicUrl`** for `audioUrl`).
3. **Path convention:** `{storyId}/audio.wav` under bucket `stories` (see [`uploadAudioToSupabase`](../lib/tts/sarvam.ts)).

### Production smoke (run **after** Vercel + Supabase above)

Expect JSON with **`audioUrl`** when Sarvam and storage are wired. If `audioUrl` is missing but `success` is true, open **Vercel → project → Logs** (function logs): the route logs **`[story-generate] TTS or storage failed`** with the error message from Phase 2.

**Valid request shape** (see [`RequestBodySchema`](../app/api/stories/generate/route.ts)): `childAge` (number) and `language` are **required**; `mood` must be one of `bedtime` | `kindness` | `courage` | `nature` | `mythology` (lowercase) — not free text like `"Bedtime Calm"`.

Hindi + **Arjun** + bedtime mood + **`aarav`** voice (Sarvam **`aayan`** under the hood):

```bash
curl -sS -X POST https://www.bolobuddy.in/api/stories/generate \
  -H "Content-Type: application/json" \
  -d '{
    "childName": "Arjun",
    "childAge": 5,
    "language": "hindi",
    "mood": "bedtime",
    "speaker": "aarav"
  }'
```

Alternate (default-ish voice):

```bash
curl -sS -X POST https://www.bolobuddy.in/api/stories/generate \
  -H "Content-Type: application/json" \
  -d '{
    "childName": "Pari",
    "childAge": 5,
    "language": "hindi",
    "mood": "bedtime",
    "speaker": "shreya"
  }'
```

## Direct Sarvam API smoke test

The app calls `POST https://api.sarvam.ai/text-to-speech` first (same body shape as below). Some keys work with **`api-subscription-key`**; others with **`Authorization: Bearer`**. The legacy `POST https://api.sarvam.ai/bulbul` path may return **404** on current Sarvam accounts—use `text-to-speech` for isolation testing.

**Recommended (matches [`buildSarvamTextToSpeechPayload`](../lib/tts/sarvam.ts)):**

```bash
# Try subscription-key header first (often matches dashboard “API key”):
curl -sS -w "\nHTTP:%{http_code}\n" -X POST https://api.sarvam.ai/text-to-speech \
  -H "Content-Type: application/json" \
  -H "api-subscription-key: $SARVAM_API_KEY" \
  -d '{
    "inputs": ["यह एक परीक्षण है। यह सफल है।"],
    "target_language_code": "hi-IN",
    "speaker": "shreya",
    "model": "bulbul:v3",
    "pace": 0.85,
    "temperature": 0.4,
    "speech_sample_rate": 22050,
    "enable_preprocessing": true
  }' | head -c 200
```

If that returns **401**, retry the same JSON with `-H "Authorization: Bearer $SARVAM_API_KEY"` instead of `api-subscription-key`.

Expect **HTTP 200** and JSON with **`audios`** (array of base64 WAV strings) and/or **`audio_data`**, depending on Sarvam response shape.

## Local `/api/stories/generate`

API contract for Week 1:

- `language`: `hindi` | `english` | `hinglish` | `tamil` | `telugu` (not `hi` / `en` short codes).
- `speaker` (optional): `shreya` | `shubh` | `aarav`. If omitted, voice follows story `mood` via `VOICE_MAP`. The value `aarav` is mapped to Sarvam’s catalog speaker **`aayan`** in [`sarvamSpeakerId`](../lib/tts/sarvam.ts) (Sarvam does not list `aarav`).
- **`mood` (optional, default `bedtime`):** exactly these five strings — **`bedtime`** | **`kindness`** | **`courage`** | **`nature`** | **`mythology`**. Anything else (e.g. `"Bedtime Calm"`, `"sleepy"`, landing keys like `bedtime-calm`) fails Zod validation → **400** with `Validation failed`. Source of truth: [`RequestBodySchema`](../app/api/stories/generate/route.ts) (same literals as [`ApiMood`](../lib/ai/story-prompt.ts) and the authenticated generator UI in [`app/bolo-buddy/stories/page.tsx`](../app/bolo-buddy/stories/page.tsx)).

**UI alignment:** The main **“Generate story”** flow POSTs those exact `mood` strings from [`stories/page.tsx`](../app/bolo-buddy/stories/page.tsx). [`StoriesSelector.tsx`](../app/bolo-buddy/stories/StoriesSelector.tsx) uses different labels (`sleepy`, `happy`, …) and short language codes only for the **sample play** link (`/bolo-buddy/stories/play/1?...`) — it does **not** call `/api/stories/generate`; no mismatch on the API path. Internal prompt code maps API moods → `StoryMood` (`sleepy` / `kind` / …) inside [`apiParamsToStoryConfig`](../lib/ai/story-prompt.ts).

**Backlog (before scale / heavy beta):** API moods **`nature`** and **`mythology`** both map to internal **`magical`** today — same prompt themes and same `VOICE_MAP` branch as other magical paths. Parents who pick “Mythology & Devotion” vs “Nature Tales” may expect a clear difference; **split `mythology` into its own `StoryMood` (and `MOOD_CONFIG` / voice line)** when that feedback shows up.

```bash
curl -sS -X POST http://localhost:3000/api/stories/generate \
  -H "Content-Type: application/json" \
  -d '{
    "childName": "Pari",
    "childAge": 5,
    "language": "hindi",
    "mood": "bedtime",
    "speaker": "shreya"
  }'
```

Response includes `storyText`, optional `audioUrl`, and `speaker` (resolved voice used).

## Three-speaker comparison

Repeat with `"speaker": "shreya"`, `"shubh"`, `"aarav"` (TTS uses Sarvam `aayan`); score warmth, pacing, authenticity, sleepiness (1–10).

## TTS-only scripts

```bash
# Devanagari Hindi sample (default). Roman Hinglish: TTS_SCRIPT=roman
npx tsx scripts/test-tts.ts

# Optional: TTS_SPEAKER=Shubh TTS_LANGUAGE=hi-IN
npx tsx scripts/test-tts-debug.ts
```

## Deploy

1. `npm run build` — must pass with 0 errors.
2. Commit and push to `main`; confirm Vercel deployment is green.
3. Hit production health: `GET /api/health/supabase` (if used) and a controlled `POST /api/stories/generate` with real keys (mind quotas and cost).

## Rollback signals

- Build failures on `main` — fix before promoting.
- 401 from Sarvam — key missing or wrong header; verify `SARVAM_API_KEY` in Vercel.
- `audioUrl` missing but `success: true` — check dev/prod server logs for `[story-generate] TTS or storage failed`; confirm `NEXT_PUBLIC_SUPABASE_URL` is your real project (not a placeholder), **`stories`** bucket exists, and `SUPABASE_SERVICE_ROLE_KEY` is set for guest uploads.

---

Generated by BoloBuddy AI · Growing with Kid OPC Private Limited

## Production Confirmed (Apr 18, 2026)
- `SARVAM_MAX_CHUNK_CHARS = 500` confirmed working in production
- Increase only after Sarvam plan upgrade — test first with direct curl
- `audioUrl` confirmed live at bolobuddy.in (storyId: 6eefdd4f)
