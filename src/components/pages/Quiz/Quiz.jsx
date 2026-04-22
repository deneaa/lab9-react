import React, { useState, useMemo } from "react";
import questions from "../../../data/questions.json";
import { useQuizDispatch, useQuizState } from "../../quizContext/useQuiz";
import styles from "./Quiz.module.css";
import useTimer from "../../hooks/useTimer";
import { useNavigate } from "react-router";

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const Quiz = () => {
  const { config, quiz, answers } = useQuizState();
  const dispatch = useQuizDispatch();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const quizQuestions = useMemo(() => {
    let all = [];

    if (config.category === "All") {
      for (let cat in questions) {
        questions[cat].forEach((q) => {
          all.push({ ...q, category: cat });
        });
      }
    } else {
      all = questions[config.category].map((q) => ({
        ...q,
        category: config.category,
      }));
    }

    return shuffle(all).slice(0, config.numberOfQuestions);
  }, [config]);

  const question = quizQuestions[quiz.currentIndex];
  const isLast = quiz.currentIndex === quizQuestions.length - 1;

  const finishQuiz = () => {
    const correct = answers.filter((a) => a.isCorrect).length;
    const total = answers.length;
    const score = total ? Math.round((correct / total) * 100) : 0;

    dispatch({ type: "SAVE_RESULT", payload: { score } });
    navigate("/results");
  };

  const handleTimeout = () => {
    if (!question) return;

    dispatch({
      type: "ANSWER_QUESTION",
      payload: { question, selectedAnswer: null },
    });

    if (isLast) finishQuiz();
    else dispatch({ type: "NEXT_QUESTION" });
  };

  const { timeLeft, stop } = useTimer(
    config.timer === "unlimited" ? null : Number(config.timer),
    handleTimeout,
    quiz.timerStart,
  );

  const handleAnswer = (answer) => {
    if (selected !== null || !question) return;

    stop();

    const correct = answer === question.answer;

    setSelected(answer);
    setIsCorrect(correct);

    dispatch({
      type: "ANSWER_QUESTION",
      payload: { question, selectedAnswer: answer },
    });

    if (isLast) {
      finishQuiz();
      return;
    }

    setTimeout(() => {
      dispatch({ type: "NEXT_QUESTION" });
      setSelected(null);
      setIsCorrect(null);
    }, 700);
  };

  if (!question) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      {quiz.currentStreak >= 2 && (
        <div className={styles.streakTop}>🔥 Streak: {quiz.currentStreak}</div>
      )}

      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h3>
              Întrebarea {quiz.currentIndex + 1} din {quizQuestions.length}
            </h3>

            <span
              className={`${styles.difficulty} ${styles[question.difficulty]}`}
            >
              {question.difficulty}
            </span>
          </div>

          <span className={styles.category}>{question.category}</span>
        </div>

        {timeLeft !== null && <div className={styles.timer}>⏱ {timeLeft}s</div>}

        <p className={styles.question}>{question.question}</p>

        <div className={styles.options}>
          {question.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={selected !== null}
              className={`${styles.optionButton} ${
                selected === opt
                  ? isCorrect
                    ? styles.correct
                    : styles.wrong
                  : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
