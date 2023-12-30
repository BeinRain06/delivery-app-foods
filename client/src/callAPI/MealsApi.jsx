import React, { useContext } from "react";
import { ACTIONS_TYPES, MealContext } from "../context/MealsContext";
import axios from "axios";

export async function getMeals() {
  /* const {
    state: { meals, meats, seaFoods, vegetarians, desserts },
    handleUpstreamOrder,
  } = useContext(MealContext); */

  const api_url = "http://localhost:5000/api/delivery/meals";
  let meals = [];
  try {
    const res = await axios.get(api_url);
    meals = res.data.data; //res.data(axios res) - .data (structured data response in backend)
    dispatch({ type: ACTIONS_TYPES.MEALS, payload: meals });
  } catch (err) {
    console.log(err);
  }
}

export async function getDesserts() {
  const { state, dispatch } = useContext(MealContext);

  const api_url = "http://localhost:3000/api/meals";
  let desserts = [];
  try {
    const res = await axios.get(`${api_url}/desserts`);
    desserts = res.data.data; //res.data(axios res) - .data (structured data response in backend)
    dispatch({ type: ACTIONS_TYPES.DESSERTS, payload: desserts });
  } catch (err) {
    console.log(err);
  }
}

export async function getSeaFoods() {
  const { state, dispatch } = useContext(MealContext);

  const api_url = "http://localhost:3000/api/meals";
  let seafoods = [];
  try {
    const res = await axios.get(`${api_url}/seafoods`);
    seafoods = res.data.data; //res.data(axios res) - .data (structured data response in backend)
    dispatch({ type: ACTIONS_TYPES.SEAFOODS, payload: seafoods });
  } catch (err) {
    console.log(err);
  }
}

export async function getVegetarians() {
  const { state, dispatch } = useContext(MealContext);

  const api_url = "http://localhost:3000/api/meals";
  let vegetarians = [];
  try {
    const res = await axios.get(`${api_url}/vegetarians`);
    vegetarians = res.data.data; //res.data(axios res) - .data (structured data response in backend)
    dispatch({ type: ACTIONS_TYPES.VEGETARIANS, payload: vegetarians });
  } catch (err) {
    console.log(err);
  }
}

export async function getSeaMeats() {
  const { state, dispatch } = useContext(MealContext);

  const api_url = "http://localhost:3000/api/meals";
  let meats = [];
  try {
    const res = await axios.get(`${api_url}/meats`);
    meats = res.data.data; //res.data(axios res) - .data (structured data response in backend)
    dispatch({ type: ACTIONS_TYPES.MEATS, payload: meats });
  } catch (err) {
    console.log(err);
  }
}
