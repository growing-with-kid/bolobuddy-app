-- Referral program: referrals table, RLS, lookup function.
-- referral_code is stored in user_metadata (auth.updateUser) and read via raw_user_meta_data in get_referrer_id_by_code.
-- Supabase does not allow altering auth.users; do not add a column there.

create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid references auth.users(id) on delete cascade not null,
  referred_id uuid references auth.users(id) on delete cascade not null unique,
  created_at timestamptz default now()
);

alter table referrals enable row level security;

drop policy if exists "Users can view own referrals" on referrals;
create policy "Users can view own referrals"
  on referrals for select
  using (auth.uid() = referrer_id);

-- Lookup referrer by referral code (user_metadata); used by bolo-buddy auth callback with service role
create or replace function get_referrer_id_by_code(ref_code text)
returns uuid
language sql
security definer
set search_path = public
as $$
  select id from auth.users where raw_user_meta_data->>'referral_code' = ref_code limit 1;
$$;
