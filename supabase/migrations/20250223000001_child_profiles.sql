-- Child profiles: free max 2, premium unlimited (enforced in app)
create table if not exists public.child_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  age_group text not null,
  preferred_language text not null default 'en',
  created_at timestamptz not null default now()
);

create index if not exists idx_child_profiles_user
  on public.child_profiles (user_id);

alter table public.child_profiles enable row level security;

create policy "Users can read own child_profiles"
  on public.child_profiles for select
  using (auth.uid() = user_id);

create policy "Users can insert own child_profiles"
  on public.child_profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update own child_profiles"
  on public.child_profiles for update
  using (auth.uid() = user_id);

create policy "Users can delete own child_profiles"
  on public.child_profiles for delete
  using (auth.uid() = user_id);
