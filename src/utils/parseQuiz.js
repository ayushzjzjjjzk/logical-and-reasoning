export function parseQuizText(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  const questions = [];
  let current = null;

  lines.forEach(line => {
    if (line.startsWith("#Q")) {
      if (current) questions.push(current);

      current = {
        category: "general",
        tag: "general",
        question: line.replace("#Q", "").trim(),
        options: [],
        correctAnswer: null,
        explanation: ""
      };
    }

    else if (line.startsWith("^")) {
      current.correctText = line.replace("^", "").trim();
    }

    else if (/^[A-D]/.test(line)) {
      current.options.push(line.substring(1).trim());
    }
  });

  if (current) questions.push(current);

  questions.forEach(q => {
    q.correctAnswer = q.options.findIndex(
      opt => opt === q.correctText
    );
    q.explanation = `${q.correctText} is the correct answer`;
    delete q.correctText;
  });

  return questions;
}