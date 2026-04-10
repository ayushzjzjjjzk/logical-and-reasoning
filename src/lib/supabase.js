import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey);
export const supabase = supabaseEnabled
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        detectSessionInUrl: false,
      },
    })
  : null;

const localLeaderboardKey = 'quizLeaderboard';

function sortLeaderboard(entries) {
  return [...entries].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.percentage !== a.percentage) return b.percentage - a.percentage;
    return new Date(b.date || b.created_at) - new Date(a.date || a.created_at);
  });
}

export async function fetchLeaderboard(limit = 10) {
  if (!supabaseEnabled) {
    const raw = JSON.parse(localStorage.getItem(localLeaderboardKey) || '[]');
    return sortLeaderboard(raw).slice(0, limit);
  }

  const { data, error } = await supabase
    .from('leaderboard')
    .select('id, name, score, total, percentage, sets, quit, created_at')
    .order('score', { ascending: false })
    .order('percentage', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data.map((row) => ({
    ...row,
    date: row.date || row.created_at,
  }));
}

export async function saveLeaderboardEntry(entry) {
  if (!supabaseEnabled) {
    const list = JSON.parse(localStorage.getItem(localLeaderboardKey) || '[]');
    const newList = sortLeaderboard([...list, entry]).slice(0, 10);
    localStorage.setItem(localLeaderboardKey, JSON.stringify(newList));
    return { data: newList, error: null };
  }

  const { data, error } = await supabase
    .from('leaderboard')
    .insert({
      name: entry.name,
      score: entry.score,
      total: entry.total,
      percentage: entry.percentage,
      sets: entry.sets,
      quit: entry.quit || false,
    })
    .select('id, name, score, total, percentage, sets, quit, created_at');

  return { data, error };
}
