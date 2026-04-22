import { useContext } from "react";
import { QuizDispatchContext, QuizStateContext } from "./quizContext";

export function useQuizState() {
  return useContext(QuizStateContext);
}

export function useQuizDispatch() {
  return useContext(QuizDispatchContext);
}
