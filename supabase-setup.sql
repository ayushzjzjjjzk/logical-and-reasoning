-- Create the leaderboard table in Supabase SQL Editor

CREATE TABLE leaderboard (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  sets INTEGER DEFAULT 1,
  quit BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert scores (for the quiz app)
CREATE POLICY "Anyone can insert scores" ON leaderboard
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read scores (for the leaderboard)
CREATE POLICY "Anyone can read scores" ON leaderboard
  FOR SELECT USING (true);

-- Optional: Create an index for better performance
CREATE INDEX idx_leaderboard_score ON leaderboard (score DESC, percentage DESC, created_at DESC);