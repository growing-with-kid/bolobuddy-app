# System stories seed

Seeds 18 pre-written system stories: generates TTS audio via Sarvam Bulbul v3, uploads to Supabase Storage, and inserts rows into `public.stories` with `is_system = true`.

## Prerequisite

Apply the migration that allows system stories to have null `user_id` and `child_profile_id`:

1. Open your **Supabase project** (staging) → **SQL Editor**.
2. Run the contents of `supabase/migrations/20250312000000_system_stories_nullable.sql`.

If you use Supabase CLI with a linked project: `npx supabase db push`.

## Run

From project root, with `.env.local` containing `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SARVAM_API_KEY`:

```bash
npx dotenv -e .env.local -- npx ts-node --project tsconfig.scripts.json scripts/seed/seed-system-stories.ts
```

Stories are processed in batches of 3 with pauses to respect TTS rate limits. Audio is stored in the `story-audio` bucket under `system/<slug>.wav`.

## Verification

In Supabase SQL Editor, run the queries from the Day 2 task (count = 18, missing_audio = 0, orphaned_system_stories = 0).
