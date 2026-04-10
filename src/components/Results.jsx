import { useState } from "react";
import { Link } from "react-router-dom";
import StarParticle from "./StarParticle";

export default function Results({ score, total }) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const percentage = Math.round((score.correct / total) * 100);

  const saveToLeaderboard = () => {
    if (!name.trim()) return;

    const leaderboard = JSON.parse(localStorage.getItem("quizLeaderboard") || "[]");
    leaderboard.push({
      name: name.trim(),
      score: score.correct,
      total,
      percentage,
      date: new Date().toISOString()
    });

    // Sort by score descending, then by date descending
    leaderboard.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.date) - new Date(a.date);
    });

    // Keep only top 10
    if (leaderboard.length > 10) {
      leaderboard.splice(10);
    }

    localStorage.setItem("quizLeaderboard", JSON.stringify(leaderboard));
    setSubmitted(true);
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
      <div className="absolute inset-0 z-0 blur-3xl opacity-80 bg-[radial-gradient(circle,rgba(34,255,150,0.35)_0%,transparent_70%)]" />

      {/* 📦 MAIN CONTENT */}
      <div className="relative z-10 w-full max-w-2xl text-center">

        {/* 🎉 TITLE */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-green-400">
          Quiz Complete!
        </h1>

        {/* 📊 SCORE CARD */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 mb-8 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
          <div className="text-6xl font-bold text-green-400 mb-4">
            {percentage}%
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{score.correct}</div>
              <div className="text-gray-300">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{score.wrong}</div>
              <div className="text-gray-300">Wrong</div>
            </div>
          </div>

          <div className="text-gray-300">
            You answered {score.correct} out of {total} questions correctly
          </div>
        </div>

        {/* 🏆 LEADERBOARD ENTRY */}
        {!submitted ? (
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 mb-8">
            <h3 className="text-xl font-semibold mb-4">Enter your name for the leaderboard</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full p-3 rounded-lg bg-black/50 border border-white/20 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none mb-4"
              maxLength={20}
            />
            <button
              onClick={saveToLeaderboard}
              disabled={!name.trim()}
              className="w-full py-3 rounded-xl font-semibold text-black bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Save Score
            </button>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 mb-8">
            <div className="text-green-400 font-semibold">✓ Score saved to leaderboard!</div>
          </div>
        )}

        {/* 🔘 BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-400 transition-all duration-300 text-center"
          >
            Home
          </Link>
          <Link
            to="/leaderboard"
            className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-purple-500 hover:bg-purple-400 transition-all duration-300 text-center"
          >
            View Leaderboard
          </Link>
        </div>

      </div>
    </div>
  );
}