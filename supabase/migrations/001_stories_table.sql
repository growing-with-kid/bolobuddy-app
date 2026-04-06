CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  text_content TEXT NOT NULL,
  audio_url TEXT,
  language TEXT NOT NULL,
  mood TEXT NOT NULL,
  child_profile_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  duration_seconds INTEGER,
  status TEXT NOT NULL DEFAULT 'completed',
  audio_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for monthly count query (free tier limit check)
CREATE INDEX IF NOT EXISTS idx_stories_user_created 
  ON stories(user_id, created_at DESC);

-- Index for child's story library
CREATE INDEX IF NOT EXISTS idx_stories_child 
  ON stories(child_profile_id, created_at DESC);

-- RLS
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own stories"
  ON stories FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stories"
  ON stories FOR INSERT
  WITH CHECK (auth.uid() = user_id);
