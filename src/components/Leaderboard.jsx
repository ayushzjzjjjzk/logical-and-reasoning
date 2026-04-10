import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StarParticle from "./StarParticle";
import { fetchLeaderboard, supabaseEnabled } from "../lib/supabase";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchLeaderboard(10);
        setLeaderboard(data);
      } catch (err) {
        setError(err.message || "Unable to load leaderboard.");
      }
    };

    load();
  }, []);

  const clearLeaderboard = () => {
    if (!supabaseEnabled) {
      localStorage.removeItem("quizLeaderboard");
      setLeaderboard([]);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 text-white overflow-hidden">
      {/* 🌌 BASE BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-black" />

      {/* ⭐ FALLING STAR PARTICLES */}
      <div className="absolute inset-0 -z-10">
        <StarParticle />
      </div>

      {/* ✨ GLOW LAYER */}
      <div className="absolute inset-0 z-0 blur-3xl opacity-80 bg-[radial-gradient(circle,rgba(147,51,234,0.35)_0%,transparent_70%)]" />

      {/* 📦 MAIN CONTENT */}
      <div className="relative z-10 w-full max-w-4xl">

        {/* 🏆 TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-300">Top quiz performers</p>
        </div>

        {/* 📊 LEADERBOARD TABLE */}
        {leaderboard.length > 0 ? (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] overflow-hidden mb-8">
            <div className="p-6">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-300 border-b border-white/10 pb-4 mb-4">
                <div className="col-span-1">#</div>
                <div className="col-span-4">Name</div>
                <div className="col-span-3">Score</div>
                <div className="col-span-2">%</div>
                <div className="col-span-1">Sets</div>
                <div className="col-span-1">Date</div>
              </div>

              {leaderboard.map((entry, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 py-3 border-b border-white/5 last:border-b-0">
                  <div className="col-span-1 font-bold text-lg">
                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"}
                    {index > 2 && `#${index + 1}`}
                  </div>
                  <div className="col-span-4 font-semibold">{entry.name}</div>
                  <div className="col-span-3">{entry.score}/{entry.total}</div>
                  <div className="col-span-2 text-green-400 font-semibold">{entry.percentage}%</div>
                  <div className="col-span-1 text-purple-400">{entry.sets || 1}</div>
                  <div className="col-span-1 text-gray-400 text-xs">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 mb-8 text-center">
            <div className="text-gray-400 mb-4">No scores yet!</div>
            <Link
              to="/quiz"
              className="inline-block py-3 px-6 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-400 transition-all duration-300"
            >
              Take the Quiz
            </Link>
          </div>
        )}

        {/* 🔘 BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-400 transition-all duration-300 text-center max-w-xs"
          >
            Home
          </Link>
          <Link
            to="/quiz"
            className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-400 transition-all duration-300 text-center max-w-xs"
          >
            Take Quiz
          </Link>
          {leaderboard.length > 0 && !supabaseEnabled && (
            <button
              onClick={clearLeaderboard}
              className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-400 transition-all duration-300 text-center max-w-xs"
            >
              Clear Scores
            </button>
          )}
          {error && (
            <div className="text-center text-red-300">{error}</div>
          )}
        </div>

      </div>
    </div>
  );
}