import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import QuizPage from "./components/Quizpage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<QuizPage />} />
    </Routes>
  );
}

export default App;