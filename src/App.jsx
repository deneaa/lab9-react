import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import StartPage from "./components/pages/StartPage/StartPage";
import { useQuizState } from "./components/quizContext/useQuiz.js";
import Quiz from "./components/pages/Quiz/Quiz.jsx";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle.jsx";
import Results from "./components/pages/Results/Results.jsx";

const App = () => {
  const { ui } = useQuizState();
  return (
    <div>
      <div className="themeToggle">
        <ThemeToggle />
      </div>
      <Routes>
        <Route path="/" element={<Navigate to={`/${ui.page}`} />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
};

export default App;
