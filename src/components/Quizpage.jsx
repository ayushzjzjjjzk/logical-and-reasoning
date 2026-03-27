import { useState } from "react";
import quizData from "../data/quizData";
import StarParticle from "./StarParticle";

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState(null);

  const question = quizData[current];

  const handleSelect = (index) => {
    if (selected !== null) return;

    setSelected(index);
    setStatus(index === question.correctAnswer ? "correct" : "wrong");
  };

  const nextQuestion = () => {
    if (current < quizData.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setStatus(null);
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
          <h2 className="text-sm text-gray-400 mb-3">
            {question.category}
          </h2>

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

      </div>
    </div>
  );
}