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
  /* ratedMeals: [], */
  spottedForRating: {}, // id(meal), name
  newStandRating: {}, //meal(id), note, feedback
  openWeek: false,
  isNewLocation: false,
  orderSpecsCurrent: [], // of the current order in the day
  orders: [], // all user's orders
  thisOrder: {},
  ticketNumber: "_ _ _ _ _ _",
  hoursPrinted: "time",
  totalPrice: "_ _ _ _",
  timer: "00:00:00",
  payment: {},
  firstTimeOrder: false,
  indexDayFormat: "",
  openTagRatings: false,
  registerForm: {},
  loginForm: {},
  countDownDownTimerArr: [], //arr of string
  dataTemplatesOrdersDay: [], // arr of obj
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
  /* RATEDMEALS: "USER_RATED_MEALS", */
  SPOTTED_FOR_RATING: "SPOTTED_FOR_RATINGS",
  NEW_RATING: "NEW_RATING",
  ORDERS: "ORDERS",
  INDEX_DAY: "INDEX_DAY",
  OPEN_TAG_RATING: "OPEN_TAG_RATING",
  OPEN_NEW_LOCATION: "OPEN_NEW_LOCATION",
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

    case ACTIONS_TYPES.OPEN_TAG_RATING:
      return { ...state, openTagRatings: !state.openTagRatings };

    case ACTIONS_TYPES.OPEN_NEW_LOCATION:
      return { ...state, isNewLocation: action.payload };

    case ACTIONS_TYPES.SPOTTED_FOR_RATING:
      return { ...state, spottedForRating: action.payload };

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
    handleOrders,
    handleUser,
    handleDayShift,
    handleOpenTagsRatings,
    handleRatings,
    /*  handleRatedMeals, */
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
