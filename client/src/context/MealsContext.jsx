import React, { useReducer, useContext, createContext } from "react";

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
  ratedMeals: [],
  spottedForRating: {}, // id(meal), name
  newStandRating: {}, //meal(id), note, feedback
  openWeek: false,
  orderSpecs: [],
  hoursDelivery: {
    hrs: 0,
    min: 0,
    sec: 0,
  },
  timeToWait: 7200, //(2 hrs in sec)
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
  RATEDMEALS: "USER_RATED_MEALS",
  SPOTTED_FOR_RATING: "SPOTTED_FOR_RATINGS",
  NEW_RATING: "NEW_RATING",
  ORDER_ITEM: "ORDER_ITEM",
  DELIVERY_HOURS: "DELIVERY_HOME",
  WAITING_TIME: "WAITING_TIME",
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
    case ACTIONS_TYPES.RATEDMEALS:
      return { ...state, ratedMeals: action.payload };
    case ACTIONS_TYPES.RATINGS:
      return { ...state, ratings: action.payload };
    case ACTIONS_TYPES.SPOTTED_FOR_RATING:
      return { ...state, spottedForRating: action.payload };

    case ACTIONS_TYPES.NEW_RATING:
      return { ...state, newStandRating: action.payload };

    case ACTIONS_TYPES.ORDER_ITEM:
      return { ...state, orderSpecs: action.payload };

    case ACTIONS_TYPES.DELIVERY_HOURS:
      return { ...state, hoursDelivery: action.payload };

    case ACTIONS_TYPES.WAITING_TIME:
      return { ...state, timeToWait: action.payload };

    default:
      throw new Error("Something wrong in case type");
  }
};

const functionsDeliveryContext = (INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleUpstreamOrder = (e) => {
    const mealID = e.target.parentElement.getAttribute("mealID");
    const mealName = e.target.parentElement.getAttribute("mealName");
    const mealPrice = e.target.parentElement.getAttribute("mealPrice");

    let orderItems = [];
    let qty;
    if (state.orderSpecs.length === 0) {
      qty += 1;
      orderItems.push({
        meal: mealID,
        name: mealName,
        quantity: qty,
        price: mealPrice,
      });
    }

    orderItems = state.orderSpecs.map((item) => {
      if (item.meal === mealId) {
        item.quantity += 1;
      }
    });

    dispatch({ type: ACTIONS_TYPES.ORDER_ITEM, payload: orderItems });
  };

  const handleIncrease = (mealId) => {
    const newOrderSpecs = state.orderSpecs.map((item) => {
      if (item.meal === mealId) {
        item.quantity += 1;
      }
    });

    dispatch({ type: ACTIONS_TYPES.ORDER_ITEM, payload: newOrderSpecs });
  };

  const handleDecrease = (mealId) => {
    const newOrderSpecs = state.orderSpecs.map((item) => {
      if (item.meal === mealId) {
        item.quantity -= 1;
      }
    });

    dispatch({ type: ACTIONS_TYPES.ORDER_ITEM, payload: newOrderSpecs });
  };

  const delayTimeDelivery = (hrs, min, sec) => {
    let hoursDelivery = {
      hrs: hrs,
      min: min,
      sec: sec,
    };

    dispatch({
      type: ACTIONS_TYPES.DELIVERY_HOURS,
      payload: hoursDelivery,
    });
  };

  const waitingTimeDelivery = (timeInput) => {
    dispatch({
      type: ACTIONS_TYPES.WAITING_TIME,
      payload: timeInput,
    });
  };

  const handleClear = (mealId) => {
    const newOrderSpecs = state.orderSpecs.map((item) => {
      if (item.meal === mealId) {
        item.quantity = 0;
      }
    });

    dispatch({ type: ACTIONS_TYPES.ORDER_ITEM, payload: newOrderSpecs });
  };

  return {
    state,
    handleUpstreamOrder,
    delayTimeDelivery,
    waitingTimeDelivery,
    handleIncrease,
    handleDecrease,
    handleClear,
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
