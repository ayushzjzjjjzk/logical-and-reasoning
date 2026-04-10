import { useState } from "react";
import { Link } from "react-router-dom";
import quizData from "../data/quizData";
import StarParticle from "./StarParticle";
import SetResults from "./SetResults";
import { fetchLeaderboard, saveLeaderboardEntry, supabaseEnabled } from "../lib/supabase";

const QUESTIONS_PER_SET = 10;

export default function QuizPage() {
  const [currentSet, setCurrentSet] = useState(0);
  const [currentQuestionInSet, setCurrentQuestionInSet] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState(null);
  const [setScore, setSetScore] = useState({ correct: 0, wrong: 0 });
  const [overallScore, setOverallScore] = useState({ correct: 0, wrong: 0 });
  const [setFinished, setSetFinished] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quitOpen, setQuitOpen] = useState(false);
  const [quitName, setQuitName] = useState("");
  const [quitSaved, setQuitSaved] = useState(false);
  const [quitLeaderboard, setQuitLeaderboard] = useState([]);

  const totalSets = Math.ceil(quizData.length / QUESTIONS_PER_SET);
  const startIndex = currentSet * QUESTIONS_PER_SET;
  const endIndex = Math.min(startIndex + QUESTIONS_PER_SET, quizData.length);
  const currentQuestionIndex = startIndex + currentQuestionInSet;
  const question = quizData[currentQuestionIndex];
  const answeredQuestions = startIndex + currentQuestionInSet + (selected !== null ? 1 : 0);

  const handleSelect = (index) => {
    if (selected !== null) return;

    setSelected(index);
    const isCorrect = index === question.correctAnswer;
    setStatus(isCorrect ? "correct" : "wrong");
    const newSetScore = {
      correct: setScore.correct + (isCorrect ? 1 : 0),
      wrong: setScore.wrong + (isCorrect ? 0 : 1)
    };
    setSetScore(newSetScore);
  };

  const nextQuestion = () => {
    if (currentQuestionInSet < QUESTIONS_PER_SET - 1 && currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionInSet(currentQuestionInSet + 1);
      setSelected(null);
      setStatus(null);
    } else {
      // Set finished
      setOverallScore(prev => ({
        correct: prev.correct + setScore.correct,
        wrong: prev.wrong + setScore.wrong
      }));
      setSetFinished(true);
    }
  };

  const loadQuitLeaderboard = async () => {
    try {
      const data = await fetchLeaderboard(5);
      setQuitLeaderboard(data);
    } catch (err) {
      const fallback = JSON.parse(localStorage.getItem("quizLeaderboard") || "[]");
      setQuitLeaderboard(fallback.slice(0, 5));
    }
  };

  const openQuit = () => {
    setQuitOpen(true);
    setQuitSaved(false);
    loadQuitLeaderboard();
  };

  const saveQuitScore = async () => {
    const answeredQuestions = currentSet * QUESTIONS_PER_SET + currentQuestionInSet + (selected !== null ? 1 : 0);
    if (!quitName.trim() || answeredQuestions === 0) return;

    const percentage = Math.round((setScore.correct / Math.max(answeredQuestions, 1)) * 100);
    const entry = {
      name: quitName.trim(),
      score: setScore.correct,
      total: answeredQuestions,
      percentage,
      sets: totalSets,
      quit: true,
      date: new Date().toISOString(),
    };

    const { error } = await saveLeaderboardEntry(entry);
    if (error) {
      console.error(error);
      return;
    }

    setQuitSaved(true);
    const updated = await fetchLeaderboard(5).catch(() => JSON.parse(localStorage.getItem("quizLeaderboard") || "[]").slice(0, 5));
    setQuitLeaderboard(updated);
  };

  const closeQuit = () => {
    setQuitOpen(false);
    setQuitName("");
  };

  const nextSet = () => {
    if (currentSet < totalSets - 1) {
      setCurrentSet(currentSet + 1);
      setCurrentQuestionInSet(0);
      setSelected(null);
      setStatus(null);
      setSetScore({ correct: 0, wrong: 0 });
      setSetFinished(false);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    return <SetResults
      score={overallScore}
      total={quizData.length}
      isFinal={true}
      setNumber={currentSet + 1}
      totalSets={totalSets}
    />;
  }

  if (setFinished) {
    return <SetResults
      score={setScore}
      total={endIndex - startIndex}
      isFinal={false}
      setNumber={currentSet + 1}
      totalSets={totalSets}
      onNextSet={nextSet}
    />;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 text-white overflow-hidden">

      {/* 🌌 BASE BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-black" />

      {/* ⭐ FALLING STAR PARTICLES */}
      <div className="absolute inset-0 -z-10">
        <StarParticle />
      </div>

      {/* 🌈 LIGHT RAYS */}
      <div
        className={`
          absolute inset-0 z-0 transition-all duration-700 ease-in-out

          ${
            status === "correct"
              ? "bg-[radial-gradient(circle_at_60%_40%,rgba(34,255,150,0.25)_0%,transparent_60%)]"
              : ""
          }

          ${
            status === "wrong"
              ? "bg-[radial-gradient(circle_at_60%_40%,rgba(255,60,60,0.25)_0%,transparent_60%)]"
              : ""
          }
        `}
      />

      {/* ✨ BLUR GLOW LAYER */}
      <div
        className={`
          absolute inset-0 z-0 blur-3xl opacity-80 transition-all duration-700

          ${
            status === "correct"
              ? "bg-[radial-gradient(circle,rgba(34,255,150,0.35)_0%,transparent_70%)]"
              : ""
          }

          ${
            status === "wrong"
              ? "bg-[radial-gradient(circle,rgba(255,60,60,0.35)_0%,transparent_70%)]"
              : ""
          }
        `}
      />

      {/* 📦 MAIN CONTENT */}
      <div className="relative z-10 w-full max-w-4xl">

        {/* 🧠 QUESTION CARD */}
        <div className="
          bg-white/10 backdrop-blur-xl 
          p-8 rounded-2xl border border-white/10 mb-8
          shadow-[0_0_40px_rgba(255,255,255,0.05)]
        ">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm text-gray-400">
              Set {currentSet + 1} of {totalSets} • Question {currentQuestionInSet + 1} of {endIndex - startIndex}
            </h2>
            <div className="text-sm text-gray-400">
              {question.category}
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold leading-relaxed">
            {question.question}
          </h1>
        </div>

        {/* ✅ OPTIONS */}
        <div className="space-y-5">
          {question.options.map((opt, i) => {
            const isCorrect = i === question.correctAnswer;
            const isSelected = i === selected;

            return (
              <div
                key={i}
                onClick={() => handleSelect(i)}
                className={`
                  flex items-center gap-4
                  p-6 rounded-2xl cursor-pointer
                  border transition-all duration-300
                  bg-white/5 hover:bg-white/10

                  ${
                    selected !== null
                      ? isCorrect
                        ? "border-green-400 shadow-[0_0_25px_rgba(34,255,150,0.6)]"
                        : isSelected
                        ? "border-red-400 shadow-[0_0_25px_rgba(255,60,60,0.6)]"
                        : "border-white/10"
                      : "border-white/10"
                  }
                `}
              >
                <div className="w-5 h-5 rounded-full border border-gray-400"></div>

                <span className="text-lg md:text-xl">
                  {opt}
                </span>
              </div>
            );
          })}
        </div>

        {/* 📖 EXPLANATION */}
        {selected !== null && (
          <p className="mt-6 text-gray-300 text-lg">
            {question.explanation}
          </p>
        )}

        {/* 🔘 NEXT BUTTON */}
        <button
          onClick={nextQuestion}
          className="
            mt-8 w-full py-3 rounded-xl font-semibold text-black text-lg
            bg-green-500 transition-all duration-300
            hover:bg-green-400
            hover:shadow-[0_0_30px_rgba(34,255,150,0.8)]
          "
        >
          Next
        </button>

        <button
          onClick={openQuit}
          className="
            mt-4 w-full py-3 rounded-xl font-semibold text-white text-lg
            bg-red-500 transition-all duration-300
            hover:bg-red-400
          "
        >
          Quit and save score
        </button>

      </div>

      {quitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-3xl rounded-3xl bg-slate-950/95 border border-white/10 p-8 text-white shadow-2xl">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Quit Quiz</h2>
                  <p className="text-sm text-gray-400">Save current progress to the leaderboard or continue the quiz.</p>
                </div>
                <button
                  onClick={closeQuit}
                  className="text-gray-400 hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-white/5 p-5 rounded-3xl border border-white/10">
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Answered</div>
                  <div className="text-3xl font-semibold text-green-400">
                    {currentSet * QUESTIONS_PER_SET + currentQuestionInSet + (selected !== null ? 1 : 0)}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Current score</div>
                  <div className="text-3xl font-semibold text-green-400">{setScore.correct} / {Math.max(currentSet * QUESTIONS_PER_SET + currentQuestionInSet + (selected !== null ? 1 : 0), 1)}</div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Save your score</h3>
                <input
                  type="text"
                  value={quitName}
                  onChange={(e) => setQuitName(e.target.value)}
                  placeholder="Your name"
                  className="w-full p-4 rounded-2xl bg-black/70 border border-white/10 text-white placeholder-gray-500 focus:border-green-400 focus:outline-none mb-4"
                  maxLength={20}
                />
                <button
                  onClick={saveQuitScore}
                  disabled={!quitName.trim() || currentSet * QUESTIONS_PER_SET + currentQuestionInSet + (selected !== null ? 1 : 0) === 0}
                  className="w-full py-4 rounded-2xl font-semibold text-black bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {quitSaved ? "Saved!" : "Save to Leaderboard"}
                </button>
                {quitSaved && (
                  <p className="mt-3 text-green-300">Your score is now saved. You can continue or go to the leaderboard.</p>
                )}
              </div>

              <div className="bg-white/10 p-6 rounded-3xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Leaderboard preview</h3>
                {quitLeaderboard.length > 0 ? (
                  <div className="space-y-3">
                    {quitLeaderboard.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between rounded-2xl bg-black/40 p-3">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{index + 1}.</span>
                          <span>{entry.name}</span>
                        </div>
                        <span className="text-green-400 font-semibold">{entry.score}/{entry.total}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No leaderboard entries yet.</p>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={closeQuit}
                  className="w-full py-4 rounded-2xl font-semibold text-white bg-gray-700 hover:bg-gray-600 transition-all duration-300"
                >
                  Continue Quiz
                </button>
                <Link
                  to="/leaderboard"
                  className="w-full inline-flex items-center justify-center py-4 rounded-2xl font-semibold text-white bg-purple-500 hover:bg-purple-400 transition-all duration-300"
                >
                  Go to Leaderboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}