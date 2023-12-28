import React, { useContext } from "react";
import axios from "axios";
import { MealContext } from "../context/MealsContext";

export const createfirstOrder = () => {
  const {
    state: { firstTimeOrder, orderSpecs },
    handleClear,
  } = useContext(MealContext);
};
