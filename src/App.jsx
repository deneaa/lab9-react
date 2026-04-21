import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import StartPage from "./components/pages/StartPage/StartPage";
import { useQuizState } from "./components/context/useQuiz";
import Quiz from "./components/pages/Quiz/Quiz.jsx";

const App = () => {
  const { page } = useQuizState();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={`/${page}`} />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/start" element={<StartPage />} />
      </Routes>
    </div>
  );
};

export default App;
