export const initialState = {
  user: {
    name: "",
  },

  ui: {
    page: "start",
  },

  config: {
    category: "JavaScript",
    numberOfQuestions: 15,
    timer: "unlimited",
  },

  quiz: {
    currentIndex: 0,
    isStarted: false,
    timerStart: null,
    currentStreak: 0,
    maxStreak: 0,
  },

  answers: [],

  history: [],
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
        },
      };

    case "SET_PAGE":
      return {
        ...state,
        ui: {
          ...state.ui,
          page: action.payload.page,
        },
      };

    case "SET_CONFIG":
      return {
        ...state,
        config: {
          ...state.config,
          [action.payload.name]: action.payload.value,
        },
      };

    case "START_QUIZ":
      return {
        ...state,
        ui: { ...state.ui, page: "quiz" },
        quiz: {
          ...state.quiz,
          isStarted: true,
          currentIndex: 0,
          currentStreak: 0,
          maxStreak: 0,
          timerStart: Date.now(),
        },
        answers: [],
      };

    case "NEXT_QUESTION":
      return {
        ...state,
        quiz: {
          ...state.quiz,
          currentIndex: state.quiz.currentIndex + 1,
          timerStart: Date.now(),
        },
      };

    case "ANSWER_QUESTION": {
      const { question, selectedAnswer } = action.payload;

      const isCorrect = selectedAnswer === question.answer;
      const newStreak = isCorrect ? state.quiz.currentStreak + 1 : 0;

      return {
        ...state,
        answers: [
          ...state.answers,
          {
            question,
            selectedAnswer,
            correctAnswer: question.answer,
            isCorrect,
            category: state.config.category,
          },
        ],
        quiz: {
          ...state.quiz,
          currentStreak: newStreak,
          maxStreak: Math.max(state.quiz.maxStreak, newStreak),
        },
      };
    }

    case "SAVE_RESULT": {
      const correct = state.answers.filter((a) => a.isCorrect).length;
      const total = state.answers.length;

      const score = total ? Math.round((correct / total) * 100) : 0;

      return {
        ...state,
        history: [
          ...state.history,
          {
            user: state.user.name,
            date: Date.now(),
            score,
            category: state.config.category,
            maxStreak: state.quiz.maxStreak,
          },
        ],
      };
    }

    case "TRY_AGAIN":
      return {
        ...state,
        ui: { ...state.ui, page: "start" },

        quiz: {
          currentIndex: 0,
          isStarted: false,
          timerStart: null,
          currentStreak: 0,
          maxStreak: 0,
        },

        answers: [],
      };

    case "SET_STATE":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
