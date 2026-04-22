import React, { useEffect, useReducer } from "react";
import {
  QuizDispatchContext,
  QuizStateContext,
} from "../quizContext/quizContext";
import { initialState, reducer } from "../quizContext/quizReducer";

const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("quizState");

    if (saved) {
      dispatch({
        type: "SET_STATE",
        payload: JSON.parse(saved),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quizState", JSON.stringify(state));
  }, [state]);

  return (
    <QuizStateContext.Provider value={state}>
      <QuizDispatchContext.Provider value={dispatch}>
        {children}
      </QuizDispatchContext.Provider>
    </QuizStateContext.Provider>
  );
};

export default QuizProvider;
