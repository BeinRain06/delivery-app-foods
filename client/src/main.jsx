import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MealContextProvider from "./context/MealsContext.jsx";
import TemplateContextProvider from "./context/TemplateContext.jsx";
import "@fortawesome/fontawesome-free/js/all.js";
import "@fortawesome/fontawesome-free/css/all.css";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MealContextProvider>
        <TemplateContextProvider>
          <App />
        </TemplateContextProvider>
      </MealContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
