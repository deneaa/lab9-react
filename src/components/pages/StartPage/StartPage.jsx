import React from "react";
import categories from "../../../data/categories.json";
import timer from "../../../data/timer.json";
import numberOfQuestions from "../../../data/numberOfQuestions.json";
import styles from "./StartPage.module.css";
import { useQuizDispatch, useQuizState } from "../../context/useQuiz";
import { useNavigate } from "react-router";

const StartPage = () => {
  const { configuration } = useQuizState();
  const dispatch = useQuizDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: "SET_CONFIGURATION",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  const handleStart = () => {
    dispatch({ type: "START_QUIZ" });
    navigate("/quiz");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎯 Quiz App</h1>

      <div className={styles.card}>
        <label className={styles.label}>Categorie</label>
        <select
          name="category"
          value={configuration.category}
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
          value={configuration.timer}
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
          value={configuration.numberOfQuestions}
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
