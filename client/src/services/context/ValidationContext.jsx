import React, {
  useReducer,
  useContext,
  useCallback,
  createContext,
} from "react";

//process valisation hook
export const INIT_STATE = {
  isAnOrderDay: false,
  openFinalValidation: false,
  isOneMoreStep: false,
  applyText: "Apply",
  forseen: false,
  componentSectionName: "",
  messageError: "",
  isError: false,
  timerIn: "00:00:00",
};

const ACTIONS_TYPES = {
  AN_ORDER_DAY: "AN_ORDER_DAY",
  OPEN_FINAL: "OPEN_FINAL",
  ONE_MORE_STEP: "ONE_MORE_STEP",
  APPLY_TEXT: "APPLY_TEXT",
  FOR_SEEN: "FOR_SEEN",
  SECTION_NAME: "SECTION_NAME",
  MSG_ERROR: "MSG_ERROR",
  IS_ERROR: "IS_ERROR",
  TIMER_IN: "TIMER_IN",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.AN_ORDER_DAY:
      return { ...state, isAnOrderDay: !state.isAnOrderDay };
    case ACTIONS_TYPES.OPEN_FINAL:
      return { ...state, openFinalValidation: !state.openFinalValidation };
    case ACTIONS_TYPES.ONE_MORE_STEP:
      return { ...state, isOneMoreStep: !state.isOneMoreStep };
    case ACTIONS_TYPES.APPLY_TEXT:
      return { ...state, applyText: action.payload };
    case ACTIONS_TYPES.FOR_SEEN:
      return { ...state, forseen: !state.forseen };
    case ACTIONS_TYPES.SECTION_NAME:
      return { ...state, componentSectionName: action.payload };
    case ACTIONS_TYPES.MSG_ERROR:
      return { ...state, messageError: action.payload };
    case ACTIONS_TYPES.IS_ERROR:
      return { ...state, isError: !state.isError };
    case ACTIONS_TYPES.TIMER_IN:
      return { ...state, timerIn: action.payload };
    default:
      throw new Error("Something wrong in case type");
  }
};

const functionsValidationContext = (INIT_STATE) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const handleIsAnOrderDay = useCallback(async () => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.AN_ORDER_DAY,
      });

      setTimeout(resolve, 1000);
    });
  }, []);

  const handleOpenFinalValidation = useCallback(async () => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.OPEN_FINAL,
      });

      setTimeout(resolve, 1000);
    });
  }, []);

  const handleIsOneMoreStep = useCallback(async () => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.ONE_MORE_STEP,
      });

      setTimeout(resolve, 1000);
    });
  }, []);

  const handleApplyText = useCallback(async () => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.APPLY_TEXT,
      });

      setTimeout(resolve, 1000);
    });
  }, []);

  const handleForSeen = useCallback(async () => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.FOR_SEEN,
      });

      setTimeout(resolve, 1000);
    });
  }, []);

  const handleSectionName = useCallback(async (sectionName) => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.SECTION_NAME,
        payload: sectionName,
      });

      setTimeout(resolve, 1000);
    });
  }, []);

  const handleMessageError = useCallback(async (message) => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.MSG_ERROR,
        payload: message,
      });

      setTimeout(resolve, 1000);
    });
  }, []);

  const handleIsError = useCallback(async () => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.IS_ERROR,
      });

      setTimeout(resolve, 1000);
    });
  }, []);

  const handleTimerIn = useCallback(async (timerClock) => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.TIMER_IN,
        payload: timerClock,
      });

      setTimeout(resolve, 1000);
    });
  }, []);

  return {
    state,
    handleIsAnOrderDay,
    handleOpenFinalValidation,
    handleIsOneMoreStep,
    handleApplyText,
    handleForSeen,
    handleSectionName,
    handleMessageError,
    handleIsError,
    handleTimerIn,
  };
};

const initStateContext = {
  state: INIT_STATE,
  handleIsAnOrderDay: () => {},
  handleOpenFinalValidation: () => {},
  handleIsOneMoreStep: () => {},
  handleApplyText: () => {},
  handleForSeen: () => {},
  handleSectionName: () => {},
  handleMessageError: () => {},
  handleIsError: () => {},
  handleTimerIn: () => {},
};

const ValidationContext = createContext(initStateContext);

function ValidationContextProvider({ children, ...INIT_STATE }) {
  return (
    <ValidationContext.Provider value={functionsValidationContext(INIT_STATE)}>
      {children}
    </ValidationContext.Provider>
  );
}

export default ValidationContextProvider;
