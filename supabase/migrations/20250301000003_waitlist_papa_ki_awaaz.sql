-- Papa Ki Awaaz waitlist (email capture, no auth)
CREATE TABLE IF NOT EXISTS public.waitlist_papa_ki_awaaz (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_papa_ki_awaaz_email ON public.waitlist_papa_ki_awaaz (email);

ALTER TABLE public.waitlist_papa_ki_awaaz ENABLE ROW LEVEL SECURITY;

-- Allow insert from anyone (landing waitlist, no auth)
DROP POLICY IF EXISTS "Anyone can join Papa Ki Awaaz waitlist" ON public.waitlist_papa_ki_awaaz;
CREATE POLICY "Anyone can join Papa Ki Awaaz waitlist"
  ON public.waitlist_papa_ki_awaaz FOR INSERT
  WITH CHECK (true);

GRANT INSERT ON public.waitlist_papa_ki_awaaz TO anon;
