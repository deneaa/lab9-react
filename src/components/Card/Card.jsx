import React, { useState } from "react";
import styles from "./Card.module.css";

const Card = ({ request }) => {
  const { question, selectedAnswer } = request;

  const [open, setOpen] = useState(false);

  const hasAnswered = selectedAnswer !== null && selectedAnswer !== undefined;

  const isCorrect = hasAnswered && selectedAnswer === question.answer;

  const statusLabel = !hasAnswered
    ? "No answer"
    : isCorrect
      ? "Correct"
      : "Wrong";

  return (
    <div className={styles.card}>
      <div className={styles.header} onClick={() => setOpen((p) => !p)}>
        <h4 className={styles.title}>{question.question}</h4>

        <div className={styles.badges}>
          <span className={styles.badge}>{question.difficulty}</span>

          <span
            className={`${styles.badge} ${
              hasAnswered
                ? isCorrect
                  ? styles.correct
                  : styles.wrong
                : styles.wrong
            }`}
          >
            {statusLabel}
          </span>
        </div>
      </div>

      {open && (
        <div className={styles.body}>
          <p>
            <strong>Your answer:</strong>{" "}
            {hasAnswered ? selectedAnswer : "No answer (timeout)"}
          </p>

          <p>
            <strong>Correct answer:</strong> {question.answer}
          </p>

          <p>
            <strong>Difficulty:</strong> {question.difficulty}
          </p>
        </div>
      )}
    </div>
  );
};


export default Card;
