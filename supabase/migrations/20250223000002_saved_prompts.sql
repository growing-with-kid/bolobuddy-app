-- Saved conversation prompts (max 10 per user, enforced in app)
create table if not exists public.saved_prompts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  prompt_text text not null,
  story_id text,
  theme text,
  created_at timestamptz not null default now()
);

create index if not exists idx_saved_prompts_user
  on public.saved_prompts (user_id);

alter table public.saved_prompts enable row level security;

create policy "Users can read own saved_prompts"
  on public.saved_prompts for select
  using (auth.uid() = user_id);

create policy "Users can insert own saved_prompts"
  on public.saved_prompts for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own saved_prompts"
  on public.saved_prompts for delete
  using (auth.uid() = user_id);
