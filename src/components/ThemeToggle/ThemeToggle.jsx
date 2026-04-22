import React from "react";
import { useTheme, useThemeDispatch } from "../themeContext/useTheme";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const { theme } = useTheme();
  const dispatch = useThemeDispatch();

  return (
    <button
      onClick={() => dispatch({ type: "TOGGLE_THEME" })}
      className={`${styles.button} ${styles[theme]}`}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
