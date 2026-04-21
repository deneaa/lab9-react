import React, { useReducer } from "react";
import { QuizDispatchContext, QuizStateContext } from "../context/quizContext";
import { initialState, reducer } from "../context/quizReducer";

const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuizStateContext.Provider value={state}>
      <QuizDispatchContext.Provider value={dispatch}>
        {children}
      </QuizDispatchContext.Provider>
    </QuizStateContext.Provider>
  );
};

export default QuizProvider;
