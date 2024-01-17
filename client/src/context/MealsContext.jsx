import React, {
  useReducer,
  useContext,
  createContext,
  useState,
  useCallback,
} from "react";
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
  orders: [],
  ratings: {},
  openWeek: false,
  indexDayFormat: "",
  openTagRatings: false,
  registerForm: {},
  loginForm: {},
  welcome: true,
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
  WELCOME: "WELCOME",
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

    case ACTIONS_TYPES.WELCOME:
      return { ...state, welcome: action.payload };

    default:
      throw new Error("Something wrong in case type");
  }
};

const functionsDeliveryContext = (INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleMeals = useCallback((meals) => {
    dispatch({ type: ACTIONS_TYPES.MEALS, payload: meals });
  }, []);

  const handleVegetarians = useCallback((vegetarians) => {
    dispatch({ type: ACTIONS_TYPES.VEGETARIANS, payload: vegetarians });
  }, []);

  const handleDesserts = useCallback((desserts) => {
    dispatch({ type: ACTIONS_TYPES.DESSERTS, payload: desserts });
  }, []);

  const handleMeats = useCallback((meats) => {
    dispatch({ type: ACTIONS_TYPES.MEATS, payload: meats });
  }, []);

  const handleSeaFoods = useCallback((seafoods) => {
    dispatch({ type: ACTIONS_TYPES.SEAFOODS, payload: seafoods });
  }, []);

  const handleOrders = useCallback((orders) => {
    const updateOrders = orders;

    dispatch({ type: ACTIONS_TYPES.ORDERS, payload: updateOrders });
  }, []);

  const handleUser = useCallback((user) => {
    dispatch({ type: ACTIONS_TYPES.ORDERS, payload: user });
  }, []);

  const handleDayShift = useCallback((e) => {
    const i = e.target.id;

    let current = moment().startof("week").add(i, "days");

    dispatch({
      type: ACTIONS_TYPES.INDEX_DAY,
      payload: current.format("MMM D"),
    });
  }, []);

  const handleOpenTagsRatings = useCallback(() => {
    dispatch({ type: ACTIONS_TYPES.OPEN_TAG_RATING });
  }, []);

  const handleRatings = useCallback((ratings) => {
    dispatch({ type: ACTIONS_TYPES.RATINGS, payload: ratings });
  }, []);

  const handleRegisterForm = useCallback((registerData) => {
    dispatch({ type: ACTIONS_TYPES.REGISTER_FORM, payload: registerData });
    handleOpenTagsRatings();
  }, []);

  const handleLoginForm = useCallback((loginData) => {
    dispatch({ type: ACTIONS_TYPES.LOGIN_FORM, payload: loginData });
    handleOpenTagsRatings();
  }, []);

  const handleWelcome = useCallback((isWelcome) => {
    dispatch({ type: ACTIONS_TYPES.WELCOME, payload: isWelcome });
  }, []);

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
    handleWelcome,
  };
};

const initStateContext = {
  state: INITIAL_STATE,
  handleMeals: () => {},
  handleMeats: () => {},
  handleSeaFoods: () => {},
  handleVegetarians: () => {},
  handleDesserts: () => {},
  handleOrders: () => {},
  handleUser: () => {},
  handleDayShift: () => {},
  handleOpenTagsRatings: () => {},
  handleRatings: () => {},
  handleRegisterForm: () => {},
  handleLoginForm: () => {},
};

export const MealContext = createContext(initStateContext);

export const obtainUser = () => {
  const {
    state: { user },
  } = useContext(MealContext);

  return user;
};
function MealContextProvider({ children, ...INITIAL_STATE }) {
  return (
    <MealContext.Provider value={functionsDeliveryContext(INITIAL_STATE)}>
      {children}
    </MealContext.Provider>
  );
}

export default MealContextProvider;
