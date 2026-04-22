import React, { useMemo, useCallback, useState } from "react";
import { useQuizState, useQuizDispatch } from "../../quizContext/useQuiz";
import Card from "../../Card/Card";
import { useNavigate } from "react-router";
import styles from "./Results.module.css";
import Tab from "./Tab";
import Stat from "./Stat";

const Results = () => {
  const { answers, config, quiz, history } = useQuizState();
  const dispatch = useQuizDispatch();
  const navigate = useNavigate();

  const [tab, setTab] = useState("all");

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const total = answers.length;
  const score = total ? Math.round((correctCount / total) * 100) : 0;

  const filteredResults = useMemo(() => {
    if (tab === "correct") return answers.filter((a) => a.isCorrect);
    if (tab === "wrong") return answers.filter((a) => !a.isCorrect);
    return answers;
  }, [answers, tab]);

  const leaderboard = useMemo(() => {
    const best = new Map();

    history?.forEach((h) => {
      const prev = best.get(h.user);
      if (!prev || h.score > prev.score) {
        best.set(h.user, h);
      }
    });

    return [...best.values()].sort((a, b) => b.score - a.score);
  }, [history]);

  const handleTryAgain = useCallback(() => {
    dispatch({ type: "TRY_AGAIN" });
    navigate("/start");
  }, [dispatch, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Quiz Results</h2>
        <p className={styles.category}>{config.category}</p>
      </div>

      <div className={styles.stats}>
        <Stat label="Score" value={`${score}%`} />
        <Stat label="Correct" value={`${correctCount}/${total}`} />
        <Stat label="Timer" value={config.timer} />
        <Stat label="Max Streak" value={quiz.maxStreak} />
      </div>

      <button className={styles.tryAgainButton} onClick={handleTryAgain}>
        Try Again
      </button>

      <div className={styles.leaderboard}>
        <h4>Top scoruri utilizatori</h4>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Loc</th>
              <th>User</th>
              <th>Score</th>
              <th>Category</th>
              <th>Streak</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.user}</td>
                <td>{item.score}%</td>
                <td>{item.category}</td>
                <td>{item.maxStreak}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.tabs}>
        <Tab active={tab === "all"} onClick={() => setTab("all")}>
          Toate
        </Tab>
        <Tab active={tab === "correct"} onClick={() => setTab("correct")}>
          Corecte
        </Tab>
        <Tab active={tab === "wrong"} onClick={() => setTab("wrong")}>
          Greșite
        </Tab>
      </div>

      <div className={styles.list}>
        {filteredResults.length ? (
          filteredResults.map((r, i) => (
            <Card key={r.question.id || i} request={r} />
          ))
        ) : (
          <p className={styles.empty}>Nu exista rezultate.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
