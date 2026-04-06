-- Story quality validation log for tuning prompts from beta feedback.
-- One row per story with the validator result for the text we actually saved.
CREATE TABLE IF NOT EXISTS story_quality_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  issues JSONB NOT NULL DEFAULT '[]',
  passed BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_story_quality_log_story_id ON story_quality_log(story_id);
CREATE INDEX IF NOT EXISTS idx_story_quality_log_created_at ON story_quality_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_story_quality_log_passed ON story_quality_log(passed) WHERE NOT passed;

ALTER TABLE story_quality_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert own story quality log" ON story_quality_log;
CREATE POLICY "Users can insert own story quality log"
  ON story_quality_log FOR INSERT
  WITH CHECK (
    (SELECT user_id FROM stories WHERE id = story_id) = auth.uid()
  );

DROP POLICY IF EXISTS "Users can read own story quality log" ON story_quality_log;
CREATE POLICY "Users can read own story quality log"
  ON story_quality_log FOR SELECT
  USING (
    (SELECT user_id FROM stories WHERE id = story_id) = auth.uid()
  );

-- ---------------------------------------------------------------------------
-- Analytics: run in Supabase SQL Editor once you have 50–100+ stories
-- ---------------------------------------------------------------------------
-- Most common quality issues across all stories
-- SELECT
--   issue,
--   COUNT(*) AS frequency,
--   ROUND(AVG(score), 1) AS avg_score_when_present
-- FROM story_quality_log,
--   jsonb_array_elements_text(issues) AS issue
-- GROUP BY issue
-- ORDER BY frequency DESC;
