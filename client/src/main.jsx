import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import MealContextProvider from "./context/MealsContext.jsx";
import TemplateContextProvider from "./context/TemplateContext.jsx";
import DailyContextProvider from "./context/DailyContext.jsx";
import { INITIAL_STATE } from "./context/MealsContext.jsx";
import { INITIAL_STATE_ONE } from "./context/TemplateContext.jsx";
import { INITIAL_STATE_TWO } from "./context/DailyContext.jsx";
import { store } from "./redux/store/store.jsx";
import "@fortawesome/fontawesome-free/js/all.js";
import "@fortawesome/fontawesome-free/css/all.css";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

/* ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MealContextProvider {...INITIAL_STATE}>
        <TemplateContextProvider {...INITIAL_STATE_ONE}>
          <DailyContextProvider {...INITIAL_STATE_TWO}>
            <App />
          </DailyContextProvider>
        </TemplateContextProvider>
      </MealContextProvider>
    </BrowserRouter>
  </React.StrictMode>
); */
