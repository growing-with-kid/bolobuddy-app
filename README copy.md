This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Supabase Auth

If you see **"Unsupported provider: provider is not enabled"** when signing up or signing in:

1. Open your [Supabase Dashboard](https://supabase.com/dashboard) → your project.
2. Go to **Authentication** → **Providers**.
3. Enable **Email** (for email/password signup and sign-in).
4. If you use "Continue with Google", enable **Google** and add your OAuth client ID/secret.

## Bolo Buddy — Save Story (saved_stories) Runbook

If users see **"Could not find the table 'public.saved_stories' in the schema cache"** when clicking **Save Story**:

1. **Apply migrations**  
   - Supabase Dashboard → **SQL Editor** → New Query. Run the migration that creates `public.saved_stories` (see `supabase/migrations/20250223000000_story_plays_and_saved_stories.sql`), or run `supabase db push` / `supabase migration up` for your environment.

2. **Reload the PostgREST schema cache** (required after creating or changing tables)  
   - **Dashboard**: Project Settings → **API** → scroll to the bottom → click **"Reload schema"**.  
   - **SQL**: In the SQL Editor, run: `NOTIFY pgrst, 'reload schema';`  
   - **Local dev**: `supabase db reset` or `supabase functions restart` as appropriate.

3. **Verify**  
   - Click **Save Story** again — the error should be gone and the story should save.  
   - Confirm the story appears in the user’s saved list and that Row Level Security (RLS) is working: a different user cannot see another user’s saved stories.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
