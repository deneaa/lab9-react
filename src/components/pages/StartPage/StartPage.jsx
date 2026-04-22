import React, { useCallback, useState } from "react";
import categories from "../../../data/categories.json";
import timer from "../../../data/timer.json";
import numberOfQuestions from "../../../data/numberOfQuestions.json";
import styles from "./StartPage.module.css";
import { useQuizDispatch, useQuizState } from "../../quizContext/useQuiz";
import { useNavigate } from "react-router";

const StartPage = () => {
  const { config, user } = useQuizState();
  const dispatch = useQuizDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleChange = useCallback(
    (e) => {
      dispatch({
        type: "SET_CONFIG",
        payload: {
          name: e.target.name,
          value: e.target.value,
        },
      });
    },
    [dispatch],
  );

  const handleStart = useCallback(() => {
    if (!user.name.trim()) {
      setError("Introdu numele înainte să începi quiz-ul");
      return;
    }

    setError("");

    dispatch({ type: "START_QUIZ" });
    navigate("/quiz");
  }, [dispatch, navigate, user.name]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎯 Quiz App</h1>

      <div className={styles.card}>
        <label className={styles.label}>Nume</label>

        <input
          value={user.name}
          onChange={(e) =>
            dispatch({
              type: "SET_NAME",
              payload: { name: e.target.value },
            })
          }
          placeholder="Introdu numele..."
          className={`${styles.input} ${error ? styles.inputError : ""}`}
        />

        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.label}>Categorie</label>
        <select
          name="category"
          value={config.category}
          onChange={handleChange}
          className={styles.select}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label className={styles.label}>Timp per întrebare</label>
        <select
          name="timer"
          value={config.timer}
          onChange={handleChange}
          className={styles.select}
        >
          {timer.map((t) => (
            <option key={t.label} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        <label className={styles.label}>Număr întrebări</label>
        <select
          name="numberOfQuestions"
          value={config.numberOfQuestions}
          onChange={handleChange}
          className={styles.select}
        >
          {numberOfQuestions.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <button className={styles.button} onClick={handleStart}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartPage;
