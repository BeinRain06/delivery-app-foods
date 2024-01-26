import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const mealSplice = createSlice({
  name: "mealPrime",
  initialState: {
    meals: [],
    users: [],
    user: {},
    seaFoods: [],
    meats: [],
    vegetarians: [],
    desserts: [],
    orders: [],
    ratings: [],
    openWeek: false,
    indexDayFormat: "",
    openTagRatings: false,
    registerForm: {},
    loginForm: {},
    welcome: true,
  },
  reducers: {
    handleMeals: (state, action) => {
      state.meals = action.payload;
    },
    handleVegetarians: (state, action) => {
      state.vegetarians = action.payload;
    },
    handleDesserts: (state, action) => {
      state.desserts = action.payload;
    },
    handleMeats: (state, action) => {
      state.meats = action.payload;
    },
    handleSeaFoods: (state, action) => {
      state.seaFoods = action.payload;
    },
    handleOrders: (state, action) => {
      state.orders = action.payload;
    },
    handleUser: (state, action) => {
      state.user = action.payload;
    },
    handleDayShift: (state, action) => {
      const e = action.payload;
      const i = e.target.id;
      let current = moment().startof("week").add(i, "days");
      state.indexDayFormat = current.format("MMM D");
    },
    handleOpenTagsRatings: (state, action) => {
      state.openTagRatings = action.payload;
    },
    handleRatings: (state, action) => {
      state.ratings = action.payload;
    },
    handleRegisterForm: (state, action) => {
      state.loginForm = action.payload;
      handleOpenTagsRatings();
    },
    handleWelcome: (state, action) => {
      state.welcome = action.payload;
    },
  },
});

//export actions changing state
export const mealActions = mealSplice.actions;

//export Fn reporting entire state
export const recordAllMealSliceState = (state) => {
  const meals = state.mealPrime.meals;
  const users = state.mealPrime.users;
  const user = state.mealPrime.user;
  const seaFoods = state.mealPrime.seaFoods;
  const meats = state.mealPrime.meats;
  const vegetarians = state.mealPrime.vegetarians;
  const desserts = state.mealPrime.desserts;
  const orders = state.mealPrime.orders;
  const ratings = state.mealPrime.ratings;
  const openWeek = state.mealPrime.openWeek;
  const indexDayFormat = state.mealPrime.indexDayFormat;
  const openTagRatings = state.mealPrime.openTagRatings;
  const registerForm = state.mealPrime.registerForm;
  const loginForm = state.mealPrime.loginForm;
  const welcome = state.mealPrime.welcome;

  return {
    meals,
    users,
    user,
    seaFoods,
    meats,
    vegetarians,
    desserts,
    orders,
    ratings,
    openWeek,
    indexDayFormat,
    openTagRatings,
    registerForm,
    loginForm,
    welcome,
  };
};

//export the entire slice
export default mealSplice;
