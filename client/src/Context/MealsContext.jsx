import React, { useReducer, useContext, createContext } from "react";

/*reducer*/
const INITIAL_STATE = {
  meals: [],
  users: [],
  seaFoods: [],
  meats: [],
  vegetarians: [],
  desserts: [],
  openWeek: false,
};

export const ACTIONS_TYPES = {
  OPEN_WEEK: "OPEN_WEEK",
  MEALS: "MEALS",
  SEAFOODS: "SEAFOODS",
  VEGETARIANS: "VEGETARIANS",
  MEATS: "MEATS",
  DESSERTS: "DESSERTS",
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

    default:
      return state;
  }
};

export const MealContext = createContext({});

function MealContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <MealContext.Provider value={{ state, dispatch }}>
      {children}
    </MealContext.Provider>
  );
}

export default MealContextProvider;
