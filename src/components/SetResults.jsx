import { useState } from "react";
import { Link } from "react-router-dom";
import StarParticle from "./StarParticle";
import { saveLeaderboardEntry, supabaseEnabled } from "../lib/supabase";

export default function SetResults({ score, total, isFinal, setNumber, totalSets, onNextSet }) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const percentage = Math.round((score.correct / total) * 100);

  const saveToLeaderboard = async () => {
    if (!name.trim()) return;

    setSaving(true);
    setSubmitError("");

    const entry = {
      name: name.trim(),
      score: score.correct,
      total,
      percentage,
      sets: totalSets,
      quit: false,
      date: new Date().toISOString(),
    };

    const { error } = await saveLeaderboardEntry(entry);
    setSaving(false);

    if (error) {
      setSubmitError(error.message || "Unable to save score.");
      return;
    }

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
      <div className={`absolute inset-0 z-0 blur-3xl opacity-80 transition-all duration-700 ${
        isFinal
          ? "bg-[radial-gradient(circle,rgba(34,255,150,0.35)_0%,transparent_70%)]"
          : "bg-[radial-gradient(circle,rgba(147,51,234,0.35)_0%,transparent_70%)]"
      }`} />

      {/* 📦 MAIN CONTENT */}
      <div className="relative z-10 w-full max-w-2xl text-center">

        {/* 🎉 TITLE */}
        <h1 className={`text-4xl md:text-5xl font-bold mb-8 ${
          isFinal ? "text-green-400" : "text-purple-400"
        }`}>
          {isFinal ? "🎉 Quiz Complete!" : `🏆 Set ${setNumber} Complete!`}
        </h1>

        {/* 📊 SCORE CARD */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 mb-8 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
          <div className="text-6xl font-bold mb-4" style={{
            color: percentage >= 80 ? '#22ff96' : percentage >= 60 ? '#fbbf24' : '#ff6060'
          }}>
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
            {isFinal
              ? `Final Score: ${score.correct} out of ${total} questions correct`
              : `Set ${setNumber} Score: ${score.correct} out of ${total} questions correct`
            }
          </div>
        </div>

        {/* 🏆 LEADERBOARD ENTRY (only for final results) */}
        {isFinal && !submitted ? (
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
              disabled={!name.trim() || saving}
              className="w-full py-3 rounded-xl font-semibold text-black bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {saving ? "Saving..." : "Save Score"}
            </button>
            {submitError && (
              <p className="mt-3 text-red-300">{submitError}</p>
            )}
          </div>
        ) : null}

        {isFinal && submitted ? (
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 mb-8">
            <div className="text-green-400 font-semibold">✓ Score saved to leaderboard for {name}!</div>
          </div>
        ) : null}

        {/* 🔘 BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4">
          {!isFinal ? (
            <>
              <button
                onClick={onNextSet}
                className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-purple-500 hover:bg-purple-400 transition-all duration-300"
              >
                Next Set
              </button>
              <Link
                to="/"
                className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-gray-500 hover:bg-gray-400 transition-all duration-300 text-center"
              >
                End Quiz
              </Link>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

      </div>
    </div>
  );
}