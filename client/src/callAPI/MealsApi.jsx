import React, { useContext } from "react";
import { TemplateContext } from "../context/TemplateContext";
import axios from "axios";

export async function getMeals() {
  /* const {
    state: { meals, meats, seaFoods, vegetarians, desserts },
    handleMeals, handleMeats, handleSeaFoods, handleVegetarians, handleDesserts
  } = useContext(TemplateContext); */

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

export async function* getAllTypesFoods() {
  const {
    state: { meals, meats, seaFoods, vegetarians, desserts },
    handleMeals,
    handleMeats,
    handleSeaFoods,
    handleVegetarians,
    handleDesserts,
  } = useContext(TemplateContext);
  let sendMeals = [];
  let sendMeats = [];
  let sendVegetarians = [];
  let sendDesserts = [];
  let sendSeaFoods = [];
  try {
    const api_url = "http://localhost:3000/api/meals";

    //GET MEALS
    const resMeals = await axios.get(`${api_url}`);
    sendMeals = resMeals.data.data; //res.data(axios res) - .data (structured data response in backend)
    handleMeals(sendMeals);
    yield "Entire Meals Send !";
    //GET MEATS
    const resMeats = await axios.get(`${api_url}/${process.env.ID_MEATS}`);
    sendMeats = resMeats.data.data; //res.data(axios res) - .data (structured data response in backend)
    handleMeats(sendMeats);
    yield "Meats Send !";
    //GET DESSERTS
    const resDesserts = await axios.get(
      `${api_url}/${process.env.ID_DESSERTS}`
    );
    sendDesserts = resDesserts.data.data; //res.data(axios res) - .data (structured data response in backend)
    handleDesserts(sendDesserts);
    yield "Desserts Send !";
    //GET VEGETARIANS
    const resVegetarians = await axios.get(
      `${api_url}/${process.env.ID_VEGETARIANS}`
    );
    sendVegetarians = resVegetarians.data.data; //res.data(axios res) - .data (structured data response in backend)
    handleVegetarians(sendVegetarians);
    yield "Vegetarians Send !";
    //GET SEAFOODS
    const resSeaFoods = await axios.get(
      `${api_url}/${process.env.ID_SEAFOODS}`
    );
    sendSeaFoods = resSeaFoods.data.data; //res.data(axios res) - .data (structured data response in backend)
    handleSeaFoods(sendSeaFoods);
    yield "seaFoods Send !";
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: "Error Sending all eventually data types of Foods",
    });
  }
}
