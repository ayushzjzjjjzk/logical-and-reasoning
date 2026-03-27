import { parseQuizText } from "../utils/parseQuiz";
import rawText from "./rawQuestions.txt?raw";

const quizData = parseQuizText(rawText);

export default quizData;