import React, { useEffect, useReducer } from "react";
import {
  ThemeStateContext,
  ThemeDispatchContext,
} from "../themeContext/ThemeContext";
import { themeInitialState, themeReducer } from "../themeContext/themeReducer.js";

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, themeInitialState);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch({ type: "SET_THEME", payload: savedTheme });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", state.theme);
    document.body.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  return (
    <ThemeStateContext.Provider value={state}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
};

export default ThemeProvider;
