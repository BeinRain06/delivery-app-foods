import React, { useContext } from "react";
import { MealContext } from "../context/MealsContext";
import axios from "axios";

export async function getMeals() {
  const api_url = "http://localhost:5000/api/delivery/meals";

  /*  let desserts = [];
  let vegetarians = [];
  let seafoods = [];
  let meats = []; */

  try {
    const res = await axios.get(api_url);
    console.log("responseMeal: ", res);
    let meals = [];
    /* meals = await res.data.data; //res.data(axios res) - .data (structured data response in backend) */
    return res;

    /* meals.map((item) => {
      if (item.category === process.env.ID_DESSERTS) {
        desserts.push(item);
      } else if (item.category === process.env.ID_MEATS) {
        meats.push(item);
      } else if (item.category === process.env.ID_SEAFOODS) {
        seafoods.push(item);
      } else if (item.category === process.env.ID_VEGETARIANS) {
        vegetarians.push(item);
      }
    }); */

    /*  handleDesserts(desserts);
    handleMeats(meats);
    handleSeaFoods(seafoods);
    handleVegetarians(vegetarians); */
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
  try {
    const api_url = "http://localhost:3000/api/meals";

    //GET MEALS
    const resMeals = await axios.get(`${api_url}`);
    sendMeals = resMeals.data.data;

    yield sendMeals;

    //GET MEATS
    const resMeats = await axios.get(`${api_url}/${process.env.ID_MEATS}`);
    sendMeats = resMeats.data.data;

    yield sendMeats;

    //GET DESSERTS
    const resDesserts = await axios.get(
      `${api_url}/${process.env.ID_DESSERTS}`
    );
    sendDesserts = resDesserts.data.data;
    yield sendDesserts;
    //GET VEGETARIANS
    const resVegetarians = await axios.get(
      `${api_url}/${process.env.ID_VEGETARIANS}`
    );
    sendVegetarians = resVegetarians.data.data;
    yield sendVegetarians;

    //GET SEAFOODS
    const resSeaFoods = await axios.get(
      `${api_url}/${process.env.ID_SEAFOODS}`
    );
    sendSeaFoods = resSeaFoods.data.data;

    yield sendSeaFoods;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: "Error Sending all eventually data types of Foods",
    });
  }
}
