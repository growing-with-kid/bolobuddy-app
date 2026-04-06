-- Story plays: one row per play event (for last played / recent)
create table if not exists public.story_plays (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  story_id text not null,
  played_at timestamptz not null default now(),
  title text not null,
  language text not null default 'en',
  mood text not null default 'sleepy',
  duration_seconds int,
  created_at timestamptz not null default now()
);

create index if not exists idx_story_plays_user_played
  on public.story_plays (user_id, played_at desc);

alter table public.story_plays enable row level security;

create policy "Users can read own story_plays"
  on public.story_plays for select
  using (auth.uid() = user_id);

create policy "Users can insert own story_plays"
  on public.story_plays for insert
  with check (auth.uid() = user_id);

-- Saved stories: free plan max 3 (enforced in app/RPC)
create table if not exists public.saved_stories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  story_id text not null,
  title text not null,
  language text not null default 'en',
  mood text not null default 'sleepy',
  duration_seconds int,
  audio_url text,
  played_at timestamptz,
  created_at timestamptz not null default now(),
  unique(user_id, story_id)
);

create index if not exists idx_saved_stories_user
  on public.saved_stories (user_id);

alter table public.saved_stories enable row level security;

create policy "Users can read own saved_stories"
  on public.saved_stories for select
  using (auth.uid() = user_id);

create policy "Users can insert own saved_stories"
  on public.saved_stories for insert
  with check (auth.uid() = user_id);

create policy "Users can update own saved_stories"
  on public.saved_stories for update
  using (auth.uid() = user_id);

create policy "Users can delete own saved_stories"
  on public.saved_stories for delete
  using (auth.uid() = user_id);
