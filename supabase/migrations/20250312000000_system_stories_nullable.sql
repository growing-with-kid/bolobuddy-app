-- Allow system (pre-seeded) stories to have null user_id and child_profile_id.
-- System stories are identified by is_system = true and are visible to all users.

-- Add is_system and seed_batch if not already present (Day 1 columns)
ALTER TABLE public.stories
  ADD COLUMN IF NOT EXISTS is_system BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public.stories
  ADD COLUMN IF NOT EXISTS seed_batch TEXT;

-- Allow null user_id and child_profile_id for system stories
ALTER TABLE public.stories
  ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE public.stories
  ALTER COLUMN child_profile_id DROP NOT NULL;

-- RLS: users can read own stories OR any system story
DROP POLICY IF EXISTS "Users can read own stories" ON public.stories;
CREATE POLICY "Users can read own stories or system stories"
  ON public.stories FOR SELECT
  USING (auth.uid() = user_id OR (is_system = true));
