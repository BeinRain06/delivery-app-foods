import React, { useReducer, useContext, createContext } from "react";
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
  orderSpecsCurrent: [], // of the current order in the day
  orders: [], // all user's orders
  thisOrder: {},
  ticketNumber: "_ _ _ _ _ _",
  hoursPrinted: "time",
  totalPrice: "_ _ _ _",
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
  ORDER_ITEM: "ORDER_ITEM",
  ORDERS: "ORDERS",
  DELIVERY_HOURS: "DELIVERY_HOME",
  FIRST_TIME_ORDER: "FIRST_TIME_ORDER",
  THIS_ORDER: "THIS_ORDER",
  TICKET_NUMBER: "TICKET_NUMBER",
  HOURS_PRINT: "HOURS_PRINT",
  TOTAL_PRICE: "TOTAL_PRICE",
  PAYMENT: "PAYMENT",
  INDEX_DAY: "INDEX_DAY",
  OPEN_TAG_RATING: "OPEN_TAG_RATING",
  REGISTER_FORM: "REGISTER_FORM",
  LOGIN_FORM: "LOGIN_FORM",
  COUNT_DOWN_TIMER: "COUNT_DOWN_TIMER",
  TEMPLATE_ORDERS_DAY: "TEMPLATE_ORDERS_DAY",
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
    /* case ACTIONS_TYPES.RATEDMEALS:
      return { ...state, ratedMeals: action.payload }; */
    case ACTIONS_TYPES.RATINGS:
      return { ...state, ratings: action.payload };

    case ACTIONS_TYPES.OPEN_TAG_RATING:
      return { ...state, openTagRatings: !state.openTagRatings };

    case ACTIONS_TYPES.SPOTTED_FOR_RATING:
      return { ...state, spottedForRating: action.payload };

    case ACTIONS_TYPES.NEW_RATING:
      return { ...state, newStandRating: action.payload };

    case ACTIONS_TYPES.ORDER_ITEM:
      return { ...state, orderSpecsCurrent: action.payload };

    case ACTIONS_TYPES.FIRST_TIME_ORDER:
      return { ...state, firstTimeOrder: action.payload };

    case ACTIONS_TYPES.ORDERS:
      return { ...state, orders: action.payload };

    case ACTIONS_TYPES.THIS_ORDER:
      return { ...state, thisOrder: action.payload };

    case ACTIONS_TYPES.TICKET_NUMBER:
      return { ...state, ticketNumber: action.payload };

    case ACTIONS_TYPES.HOURS_PRINT:
      return { ...state, hoursPrinted: action.payload };

    case ACTIONS_TYPES.TOTAL_PRICE:
      return { ...state, totalPrice: action.payload };

    case ACTIONS_TYPES.PAYMENT:
      return { ...state, payment: action.payload };

    case ACTIONS_TYPES.INDEX_DAY:
      return { ...state, indexDayFormat: action.payload };

    case ACTIONS_TYPES.REGISTER_FORM:
      return { ...state, registerForm: action.payload };

    case ACTIONS_TYPES.LOGIN_FORM:
      return { ...state, loginForm: action.payload };

    case ACTIONS_TYPES.COUNT_DOWN_TIMER:
      return { ...state, countDownDownTimerArr: action.payload };

    case ACTIONS_TYPES.TEMPLATE_ORDERS_DAY:
      return { ...state, dataTemplatesOrdersDay: action.payload };

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
    let indexItem;
    let qty;

    let orderSpecsCurrent = state.orderSpecsCurrent;

    if (orderSpecsCurrent.length === 0) {
      qty += 1;
      orderItems.push({
        meal: mealID,
        name: mealName,
        quantity: qty,
        price: mealPrice,
      });
    } else {
      indexItem = orderSpecsCurrent.findIndex((item) => item.meal === mealId);
      if (indexItem) {
        orderItems = {
          ...orderSpecsCurrent,
          [indexItem]: { quantity: quantity + 1, ...rest },
        };
      } else {
        qty += 1;
        orderItems.push({
          meal: mealID,
          name: mealName,
          quantity: qty,
          price: mealPrice,
        });
      }
    }

    dispatch({ type: ACTIONS_TYPES.ORDER_ITEM, payload: orderItems });
  };

  const handleIncrease = (mealId) => {
    const newOrderSpecs = state.orderSpecsCurrent.map((item) => {
      if (item.meal === mealId) {
        item.quantity += 1;
      }
    });

    dispatch({ type: ACTIONS_TYPES.ORDER_ITEM, payload: newOrderSpecs });
  };

  const handleDecrease = (mealId) => {
    const newOrderSpecs = state.orderSpecsCurrent.map((item) => {
      if (item.meal === mealId) {
        item.quantity -= 1;
      }
    });

    dispatch({ type: ACTIONS_TYPES.ORDER_ITEM, payload: newOrderSpecs });
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

  /*  const handleRatedMeals = (ratedMeals) => {
    dispatch({ type: ACTIONS_TYPES.RATINGS, payload: ratedMeals });
  }; */

  const handleRegisterForm = (registerData) => {
    dispatch({ type: ACTIONS_TYPES.REGISTER_FORM, payload: registerData });
    handleOpenTagsRatings();
  };

  const handleLoginForm = (loginData) => {
    dispatch({ type: ACTIONS_TYPES.LOGIN_FORM, payload: loginData });
    handleOpenTagsRatings();
  };

  const handleThisOrder = (newOrder) => {
    dispatch({ type: ACTIONS_TYPES.THIS_ORDER, payload: newOrder });
  };

  const handleTicketNumber = (newOrder) => {
    dispatch({ type: ACTIONS_TYPES.TICKET_NUMBER, payload: newOrder });
  };

  const handleHoursPrint = (newHours) => {
    dispatch({ type: ACTIONS_TYPES.HOURS_PRINT, payload: newHours });
  };

  const handleTotalPrice = (totalPrice) => {
    dispatch({ type: ACTIONS_TYPES.TOTAL_PRICE, payload: totalPrice });
  };

  const handlePayment = (newPayment) => {
    dispatch({ type: ACTIONS_TYPES.TOTAL_PRICE, payload: newPayment });
  };

  const handleClearOrderSpecs = (emptySpecs) => {
    dispatch({ type: ACTIONS_TYPES.ORDER_ITEM, payload: emptySpecs });
  };

  const wholeCountDownTimersDay = (newTimer) => {
    const oldArrTimers = state.countDownDownTimerArr;
    const nextIndex = oldArrTimers.length + 1;
    let newArrTimers;
    newArrTimers = { ...oldArrTimers, [nextIndex]: newTimer };

    dispatch({
      type: ACTIONS_TYPES.COUNT_DOWN_TIMER,
      payload: newArrTimers,
    });
  };

  const handleTemplateOrdersDay = (newTemplate) => {
    const oldArrTemplate = state.dataTemplatesOrdersDay;
    const nextIndex = oldArrTemplate.length++;
    let newArrTemplateOrders;
    newArrTemplateOrders = { ...oldArrTimers, [nextIndex]: newTemplate };
    dispatch({
      type: ACTIONS_TYPES.TEMPLATE_ORDERS_DAY,
      payload: newArrTemplateOrders,
    });
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

  const handleFirstTimeOrder = (nextState) => {
    dispatch({
      type: ACTIONS_TYPES.FIRST_TIME_ORDER,
      payload: nextState,
    });
  };

  const handleClear = (mealId) => {
    const newOrderSpecs = state.orderSpecsCurrent.map((item) => {
      if (item.meal === mealId) {
        item.quantity = 0;
      }
    });

    dispatch({ type: ACTIONS_TYPES.ORDER_ITEM, payload: newOrderSpecs });
  };

  return {
    state,
    handleUpstreamOrder,
    handleClearOrderSpecs,
    delayTimeDelivery,
    handleIncrease,
    handleDecrease,
    handleOrders,
    handleThisOrder,
    handleFirstTimeOrder,
    handleTicketNumber,
    handleHoursPrint,
    handleTotalPrice,
    handlePayment,
    handleUser,
    handleDayShift,
    handleOpenTagsRatings,
    handleRatings,
    wholeCountDownTimersDay,
    handleTemplateOrdersDay,
    /*  handleRatedMeals, */
    handleRegisterForm,
    handleLoginForm,
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
