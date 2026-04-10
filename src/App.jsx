import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import QuizPage from "./components/Quizpage";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
}

export default App;