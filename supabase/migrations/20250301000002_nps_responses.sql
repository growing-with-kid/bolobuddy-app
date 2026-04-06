create table if not exists nps_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  score integer not null check (score >= 0 and score <= 10),
  comment text,
  created_at timestamptz default now()
);

alter table nps_responses enable row level security;

drop policy if exists "Users can insert own NPS" on nps_responses;
create policy "Users can insert own NPS"
  on nps_responses for insert
  with check (auth.uid() = user_id);
