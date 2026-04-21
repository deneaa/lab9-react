export const initialState = {
  page: "start",
  theme: "light",
  results: [],
  isStarted: false,
  currentStreak: 0,
  maxStreak: 0,
  questionNumber: 0,
  configuration: {
    category: "JavaScript",
    numberOfQuestions: 15,
    timer: "unlimited",
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PAGE": {
      return { ...state, page: action.payload.page };
    }
    case "SET_CONFIGURATION": {
      const { name, value } = action.payload;

      return {
        ...state,
        configuration: {
          ...state.configuration,
          [name]: name === "numberOfQuestions" ? Number(value) : value,
        },
      };
    }
    case "START_QUIZ": {
      return { ...state, page: "quiz", isStarted: true, questionNumber: 1 };
    }
    case "NEXT_QUESTION": {
      return { ...state, questionNumber: state.questionNumber + 1 };
    }
    case "ANSWER_QUESTION": {
      const { question, selectedAnswer, correctAnswer } = action.payload;

      const isCorrect = selectedAnswer === correctAnswer;

      const newCurrentStreak = isCorrect ? state.currentStreak + 1 : 0;

      return {
        ...state,
        results: [
          ...state.results,
          { question, selectedAnswer, correctAnswer, isCorrect },
        ],
        currentStreak: newCurrentStreak,
        maxStreak: Math.max(state.maxStreak, newCurrentStreak),
      };
    }

    default:
      return state;
  }
};
