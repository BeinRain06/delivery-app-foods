import { configureStore } from "@reduxjs/toolkit";
import dailySplice from "../services/DailySplice";
import mealSplice from "../services/MealSplice";
import templateSlice from "../services/TemplateSlice";

export const store = configureStore({
  reducer: {
    orderPrime: templateSlice.reducer,
    mealPrime: mealSplice.reducer,
    dailyPrime: dailySplice.reducer,
  },
});
