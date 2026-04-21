import React, { useEffect, useState } from "react";
import questions from "../../../data/questions.json";
import { useQuizDispatch, useQuizState } from "../../context/useQuiz";
import styles from "./Quiz.module.css";

const Quiz = () => {
  const { configuration, questionNumber, currentStreak, results } =
    useQuizState();
  const dispatch = useQuizDispatch();

  const [timeLeft, setTimeLeft] = useState(
    configuration.timer === "unlimited" ? null : Number(configuration.timer),
  );

  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const category = configuration.category;

  const quizQuestions = questions[category].slice(
    0,
    configuration.numberOfQuestions,
  );

  const question = quizQuestions[questionNumber - 1];

  console.log(results);

  useEffect(() => {
    if (configuration.timer === "unlimited") return;

    setTimeLeft(Number(configuration.timer));

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAnswer(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [questionNumber]);

  const handleAnswer = (selectedAnswer) => {
    // previne daca am raspuns deja
    if (!selected) return;

    setSelected(selectedAnswer);

    const correct = selectedAnswer === question.answer;
    setIsCorrect(correct);

    dispatch({
      type: "ANSWER_QUESTION",
      payload: {
        question: question.question,
        selectedAnswer,
        correctAnswer: question.answer,
      },
    });

    setTimeout(() => {
      dispatch({ type: "NEXT_QUESTION" });
      setSelected(null);
      setIsCorrect(null);
    }, 800);
  };

  if (!question) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      {currentStreak >= 2 && (
        <div className={styles.streakTop}>🔥 Streak: {currentStreak}</div>
      )}

      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h3>
              Întrebarea {questionNumber} din {configuration.numberOfQuestions}
            </h3>
            <span
              className={`${styles.difficulty} ${styles[question.difficulty]}`}
            >
              {question.difficulty}
            </span>
          </div>

          <span className={styles.category}>{category}</span>
        </div>

        {configuration.timer !== "unlimited" && (
          <div className={styles.timer}>⏱ {timeLeft}s</div>
        )}

        <p className={styles.question}>{question.question}</p>

        <div className={styles.options}>
          {question.options.map((opt, index) => (
            <button
              key={index}
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
