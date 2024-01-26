import { createSlice } from "@reduxjs/toolkit";

const dailySplice = createSlice({
  name: "dailyPrime",
  initialState: {
    selectMeats: [],
    selectSeafoods: [],
    selectVegetarians: [],
    selectDesserts: [],
    endThisVar: "Meats",
    mondayMenu: {},
    lastActiveDay: {
      day: "Mon",
      isActive: true,
      index: 0,
    },
    arrayDayWeeK: [
      {
        day: "Mon",
        isActive: true,
        index: 0,
      },
      {
        day: "Tue",
        isActive: false,
        index: 0,
      },
      {
        day: "Wed",
        isActive: false,
        index: 0,
      },
      {
        day: "Thu",
        isActive: false,
        index: 0,
      },
      {
        day: "Fri",
        isActive: false,
        index: 0,
      },
      {
        day: "Sat",
        isActive: false,
        index: 0,
      },
      {
        day: "Sun",
        isActive: false,
        index: 0,
      },
    ],
  },
  reducers: {
    handleLastActiveDay: (state, action) => {
      state.lastActiveDay = action.payload;
    },
    handleActiveDayWeek: (state, action) => {
      state.arrayDayWeeK = action.payload;
    },
    handleMondayMenu: (state, action) => {
      state.mondayMenu = action.payload;
    },
    handleEndThisVar: (state, action) => {
      state.endThisVar = action.payload;
    },
    handleSelectedMeats: (state, action) => {
      state.selectMeats = action.payload;
    },
    handleSelectedSeafoods: (state, action) => {
      state.selectSeafoods = action.payload;
    },
    handleSelectedDesserts: (state, action) => {
      state.selectDesserts = action.payload;
    },

    handleSelectedVegetarians: (state, action) => {
      state.selectVegetarians = action.payload;
    },
  },
});

//export actions changing state
export const dailyActions = dailySplice.actions;

//export Fn reporting entire state
export const recordAllDailySliceState = (state) => {
  const selectMeats = state.dailyPrime.selectMeats;
  const selectSeafoods = state.dailyPrime.selectSeafoods;
  const selectVegetarians = state.dailyPrime.selectVegetarians;
  const selectDesserts = state.dailyPrime.selectDesserts;
  const endThisVar = state.dailyPrime.endThisVar;
  const mondayMenu = state.dailyPrime.mondayMenu;
  const lastActiveDay = state.dailyPrime.lastActiveDay;
  const arrayDayWeeK = state.dailyPrime.arrayDayWeeK;

  return {
    selectMeats,
    selectSeafoods,
    selectVegetarians,
    selectDesserts,
    endThisVar,
    mondayMenu,
    lastActiveDay,
    arrayDayWeeK,
  };
};

//export entire dailySplice
export default dailySplice;
