import { useContext } from "react";
import { ThemeDispatchContext, ThemeStateContext } from "./ThemeContext";

export const useTheme = () => useContext(ThemeStateContext);
export const useThemeDispatch = () => useContext(ThemeDispatchContext);
