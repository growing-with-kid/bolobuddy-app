-- Waitlist for landing / beta signup (no auth required; email only)
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists idx_waitlist_email on public.waitlist (email);

alter table public.waitlist enable row level security;

-- Allow insert from anyone (landing page, no auth)
drop policy if exists "Allow insert waitlist" on public.waitlist;
create policy "Allow insert waitlist"
  on public.waitlist for insert
  with check (true);

-- Anon role needs table-level permission to insert (RLS policy allows the row)
grant insert on public.waitlist to anon;
