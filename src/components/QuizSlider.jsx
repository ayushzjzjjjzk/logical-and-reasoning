import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

const questions = [
  {
    id: 1,
    question:
      "If all Bloops are Razzies and all Razzies are Lazzies, then which of the following is definitely true?",
    options: [
      { text: "All Bloops are Lazzies", correct: true },
      { text: "All Lazzies are Bloops", correct: false },
    ],
    code: `Bloops -> Razzies -> Lazzies`,
  },
];

export default function QuizSlider() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);

  const current = questions[index];

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">

          {/* Neon Border */}
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-green-400 via-emerald-500 to-green-400">

            <motion.div
              key={current.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                y: [0, -8, 0],
              }}
              exit={{ x: -100, opacity: 0 }}
              transition={{
                duration: 0.4,
                y: { duration: 4, repeat: Infinity },
              }}
              className="
                backdrop-blur-2xl
                bg-green-900/40
                border border-green-400/20
                rounded-2xl
                p-6
                shadow-[0_0_60px_rgba(34,197,94,0.3)]
              "
            >
              {/* Header */}
              <div className="flex justify-between mb-6">
                <span className="text-xs bg-green-400/20 px-3 py-1 rounded text-green-300 font-medium">
                  Logical and Analytical Reasoning
                </span>

                <div className="flex gap-1">
                  <div className="w-2 h-6 bg-green-300/40 rounded"></div>
                  <div className="w-2 h-6 bg-green-300/60 rounded"></div>
                  <div className="w-2 h-6 bg-green-300/80 rounded"></div>
                </div>
              </div>

              {/* Question */}
              <h2 className="text-green-100 text-lg font-semibold">
                {current.question}
              </h2>

              {/* Code Block */}
              <pre className="mt-4 bg-black/60 p-4 rounded-lg text-green-200 text-sm overflow-x-auto">
                {current.code}
              </pre>

              {/* Options */}
              <div className="mt-6 space-y-4">
                {current.options.map((opt, i) => {
                  const isCorrect = selected && opt.correct;
                  const isWrong = selected === opt && !opt.correct;

                  return (
                    <div
                      key={i}
                      onClick={() => !selected && setSelected(opt)}
                      className={`relative cursor-pointer rounded-xl p-4 border transition

                        ${
                          isCorrect
                            ? "border-green-400 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.6)]"
                            : ""
                        }
                        ${
                          isWrong
                            ? "border-red-400 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.6)]"
                            : ""
                        }
                        ${
                          !selected
                            ? "border-green-400/20 hover:bg-green-400/10"
                            : ""
                        }
                      `}
                    >
                      {/* Icon */}
                      {selected && (
                        <div className="absolute right-3 top-3">
                          {opt.correct ? (
                            <Check className="text-green-400" />
                          ) : selected === opt ? (
                            <X className="text-red-400" />
                          ) : null}
                        </div>
                      )}

                      <span className="text-green-100">{opt.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Next */}
              <button
                onClick={() => {
                  setSelected(null);
                  setIndex((prev) => (prev + 1) % questions.length);
                }}
                className="mt-6 w-full py-3 rounded-xl bg-green-500 hover:bg-green-400 font-semibold shadow-[0_0_20px_rgba(34,197,94,0.6)]"
              >
                Next
              </button>
            </motion.div>
          </div>

        </AnimatePresence>
      </div>
    </div>
  );
}