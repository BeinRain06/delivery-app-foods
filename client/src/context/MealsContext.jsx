import React, { useReducer, useContext, createContext, useState } from "react";
import moment from "moment";

/*reducer*/
export const INITIAL_STATE = {
  meals: [],
  users: [],
  user: {},
  seaFoods: [],
  meats: [],
  vegetarians: [],
  desserts: [],
  ratings: {},
  openWeek: false,
  indexDayFormat: "",
  openTagRatings: false,
  registerForm: {},
  loginForm: {},
};

export const ACTIONS_TYPES = {
  OPEN_WEEK: "OPEN_WEEK",
  MEALS: "MEALS",
  SEAFOODS: "SEAFOODS",
  VEGETARIANS: "VEGETARIANS",
  MEATS: "MEATS",
  DESSERTS: "DESSERTS",
  USERS: "USERS",
  USER: "USER",
  RATINGS: "USER_RATING",
  NEW_RATING: "NEW_RATING",
  ORDERS: "ORDERS",
  INDEX_DAY: "INDEX_DAY",
  OPEN_TAG_RATING: "OPEN_TAG_RATING",
  REGISTER_FORM: "REGISTER_FORM",
  LOGIN_FORM: "LOGIN_FORM",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.OPEN_WEEK:
      return { ...state, openWeek: !state.openWeek };
    case ACTIONS_TYPES.MEALS:
      return { ...state, meals: action.payload };
    case ACTIONS_TYPES.DESSERTS:
      return { ...state, desserts: action.payload };
    case ACTIONS_TYPES.SEAFOODS:
      return { ...state, seaFoods: action.payload };
    case ACTIONS_TYPES.VEGETARIANS:
      return { ...state, vegetarians: action.payload };
    case ACTIONS_TYPES.MEATS:
      return { ...state, meats: action.payload };
    case ACTIONS_TYPES.USER:
      return { ...state, UserActivation: action.payload };

    case ACTIONS_TYPES.RATINGS:
      return { ...state, ratings: action.payload };

    case ACTIONS_TYPES.NEW_RATING:
      return { ...state, newStandRating: action.payload };

    case ACTIONS_TYPES.ORDERS:
      return { ...state, orders: action.payload };

    case ACTIONS_TYPES.INDEX_DAY:
      return { ...state, indexDayFormat: action.payload };

    case ACTIONS_TYPES.REGISTER_FORM:
      return { ...state, registerForm: action.payload };

    case ACTIONS_TYPES.LOGIN_FORM:
      return { ...state, loginForm: action.payload };

    default:
      throw new Error("Something wrong in case type");
  }
};

const functionsDeliveryContext = (INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleMeals = (meals) => {
    dispatch({ type: ACTIONS_TYPES.MEALS, payload: meals });
  };

  const handleVegetarians = (vegetarians) => {
    dispatch({ type: ACTIONS_TYPES.VEGETARIANS, payload: vegetarians });
  };

  const handleDesserts = (desserts) => {
    dispatch({ type: ACTIONS_TYPES.DESSERTS, payload: desserts });
  };

  const handleMeats = (meats) => {
    dispatch({ type: ACTIONS_TYPES.MEATS, payload: meats });
  };

  const handleSeaFoods = (seafoods) => {
    dispatch({ type: ACTIONS_TYPES.SEAFOODS, payload: seafoods });
  };

  const handleOrders = (orders) => {
    const updateOrders = orders;

    dispatch({ type: ACTIONS_TYPES.ORDERS, payload: updateOrders });
  };

  const handleUser = (user) => {
    dispatch({ type: ACTIONS_TYPES.ORDERS, payload: user });
  };

  const handleDayShift = (e) => {
    const i = e.target.id;

    let current = moment().startof("week").add(i, "days");

    dispatch({
      type: ACTIONS_TYPES.INDEX_DAY,
      payload: current.format("MMM D"),
    });
  };
  const handleOpenTagsRatings = () => {
    dispatch({ type: ACTIONS_TYPES.OPEN_TAG_RATING });
  };

  const handleRatings = (ratings) => {
    dispatch({ type: ACTIONS_TYPES.RATINGS, payload: ratings });
  };

  const handleRegisterForm = (registerData) => {
    dispatch({ type: ACTIONS_TYPES.REGISTER_FORM, payload: registerData });
    handleOpenTagsRatings();
  };

  const handleLoginForm = (loginData) => {
    dispatch({ type: ACTIONS_TYPES.LOGIN_FORM, payload: loginData });
    handleOpenTagsRatings();
  };

  return {
    state,
    handleMeals,
    handleMeats,
    handleSeaFoods,
    handleVegetarians,
    handleDesserts,
    handleOrders,
    handleUser,
    handleDayShift,
    handleOpenTagsRatings,
    handleRatings,
    handleRegisterForm,
    handleLoginForm,
  };
};

export const MealContext = createContext({});

function MealContextProvider({ children, ...INITIAL_STATE }) {
  return (
    <MealContext.Provider value={functionsDeliveryContext(INITIAL_STATE)}>
      {children}
    </MealContext.Provider>
  );
}

export default MealContextProvider;
