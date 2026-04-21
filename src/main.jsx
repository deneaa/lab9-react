import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import QuizProvider from "./components/provider/QuizProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QuizProvider>
      <App />
    </QuizProvider>
  </BrowserRouter>,
);
