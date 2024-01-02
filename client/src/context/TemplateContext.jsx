import React, { useReducer, createContext, useState } from "react";

import { MealContext } from "./MealsContext";

export const INITIAL_STATE = {
  isNewLocation: false,
  dataNewLocation: {},
  firstTimeOrder: false,
  thisOrder: {},
  ticketNumber: "_ _ _ _ _ _",
  hoursPrinted: "time",
  totalPrice: "_ _ _ _",
  timer: "00:00:00",
  payment: {},
  orderSpecsCurrent: [],
  countDownDownTimerArr: [], //arr of string
  dataTemplatesOrdersDay: [], // arr of obj
};

export const ACTIONS_TYPES = {
  OPEN_NEW_LOCATION: "OPEN_NEW_LOCATION",
  DATA_NEW_LOCATION: "DATA_NEW_LOCATION",
  ORDER_SPECS: "ORDER_SPECS",
  FIRST_TIME_ORDER: "FIRST_TIME_ORDER",
  THIS_ORDER: "THIS_ORDER",
  TICKET_NUMBER: "TICKET_NUMBER",
  HOURS_PRINT: "HOURS_PRINT",
  TOTAL_PRICE: "TOTAL_PRICE",
  TIMER: "TIMER",
  PAYMENT: "PAYMENT",
  COUNT_DOWN_TIMER: "COUNT_DOWN_TIMER",
  TEMPLATE_ORDERS_DAY: "TEMPLATE_ORDERS_DAY",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.OPEN_NEW_LOCATION:
      return { ...state, isNewLocation: action.payload };

    case ACTIONS_TYPES.DATA_NEW_LOCATION:
      return { ...state, dataNewLocation: action.payload };

    case ACTIONS_TYPES.ORDER_SPECS:
      return { ...state, orderSpecsCurrent: action.payload };

    case ACTIONS_TYPES.FIRST_TIME_ORDER:
      return { ...state, firstTimeOrder: action.payload };

    case ACTIONS_TYPES.THIS_ORDER:
      return { ...state, thisOrder: action.payload };

    case ACTIONS_TYPES.TICKET_NUMBER:
      return { ...state, ticketNumber: action.payload };

    case ACTIONS_TYPES.HOURS_PRINT:
      return { ...state, hoursPrinted: action.payload };

    case ACTIONS_TYPES.TOTAL_PRICE:
      return { ...state, totalPrice: action.payload };

    case ACTIONS_TYPES.TIMER:
      return { ...state, timer: action.payload };

    case ACTIONS_TYPES.PAYMENT:
      return { ...state, payment: action.payload };

    case ACTIONS_TYPES.COUNT_DOWN_TIMER:
      return { ...state, countDownDownTimerArr: action.payload };

    case ACTIONS_TYPES.TEMPLATE_ORDERS_DAY:
      return { ...state, dataTemplatesOrdersDay: action.payload };

    default:
      throw new Error("Something wrong in case type");
  }
};

const functionsTemplateContext = (INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleIncrease = (mealId) => {
    const newOrderSpecs = state.orderSpecsCurrent.map((item) => {
      if (item.meal === mealId) {
        item.quantity += 1;
      }
    });

    dispatch({ type: ACTIONS_TYPES.ORDER_SPECS, payload: newOrderSpecs });
  };

  const handleDecrease = (mealId) => {
    const newOrderSpecs = state.orderSpecsCurrent.map((item) => {
      if (item.meal === mealId) {
        item.quantity -= 1;
      }
    });

    dispatch({ type: ACTIONS_TYPES.ORDER_SPECS, payload: newOrderSpecs });
  };

  const handleClear = (mealId) => {
    const newOrderSpecs = state.orderSpecsCurrent.map((item) => {
      if (item.meal === mealId) {
        item.quantity = 0;
      }
    });

    dispatch({ type: ACTIONS_TYPES.ORDER_ITEM, payload: newOrderSpecs });
  };

  const handleNewLocation = (isOpen) => {
    dispatch({
      type: ACTIONS_TYPES.OPEN_NEW_LOCATION,
      payload: isOpen,
    });
  };

  const handleFirstTimeOrder = (nextState) => {
    dispatch({
      type: ACTIONS_TYPES.FIRST_TIME_ORDER,
      payload: nextState,
    });
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

  const handleTimer = (newTimer) => {
    dispatch({ type: ACTIONS_TYPES.TIMER, payload: newTimer });
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

    dispatch({ type: ACTIONS_TYPES.ORDER_SPECS, payload: orderItems });
  };

  const handleClearOrderSpecs = (emptySpecs) => {
    dispatch({ type: ACTIONS_TYPES.ORDER_SPECS, payload: emptySpecs });
  };

  const useAsyncGenerator = (generatorFn) => {
    const [state, setState] = useState({ loading: true, refetch: () => {} });

    useEffect(() => {
      //(iterator Fn <-- commit to *gnrtor*)
      async function executeTemplate(gnrtor) {
        try {
          const { value, done } = await gnrtor.next(); //  push gnrtor to the next value
          if (!done) {
            //setState and either continue or not (if ... else)
            setState((prevState) => ({
              ...prevState,
              loading: false,
              data: value,
            }));
            executeTemplate(gnrtor);
          } else {
            setState((prevState) => ({
              ...prevState,
              loading: false,
              data: value,
            }));
          }
        } catch (err) {
          console.log(err);
          setState((prevState) => ({
            ...prevState,
            loading: false,
            error,
          }));
        }
      }

      const refetch = () => {
        setState((prevState) => ({
          ...prevState,
          loading: true,
        }));
        executeTemplate(generatorFn());
      };

      executeTemplate(generatorFn());

      setState((prevState) => ({
        ...prevState,
        refetch,
      }));

      return state;
    }, []);

    return state;
  };

  return {
    state,
    handleDecrease,
    handleIncrease,
    handleClear,
    handleNewLocation,
    handleFirstTimeOrder,
    handleThisOrder,
    handleTicketNumber,
    handleHoursPrint,
    handleTotalPrice,
    handlePayment,
    handleTimer,
    handleTemplateOrdersDay,
    handleUpstreamOrder,
    handleClearOrderSpecs,
    wholeCountDownTimersDay,
    useAsyncGenerator,
  };
};

export const TemplateContext = createContext({});

function TemplateContextProvider({ children, ...INITIAL_STATE }) {
  return (
    <TemplateContext.Provider value={functionsTemplateContext(INITIAL_STATE)}>
      {children}
    </TemplateContext.Provider>
  );
}

export default TemplateContextProvider;
