import React, { useContext } from "react";
import { ACTIONS_TYPES, MealContext } from "../context/MealsContext";
import axios from "axios";

export async function updateRatedMeal(ratedMealId, meal, note, feedback) {
  try {
    let ratedMeal;
    const api_url = "http://localhost:5000/api/delivery/ratedMeals/ratedmeal";

    const res = await axios.put(`${api_url}/${ratedMealId}`, {
      method: "put",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      data: {
        meal: meal,
        note: note,
        feedback: feedback,
      },
    });

    ratedMeal = res.data.data;
    console.log(ratedMeal);
  } catch (err) {
    console.log(err);
  }
}

export async function postRatedMeal(meal, note, feedback) {
  try {
    let ratedMeal;
    const api_url =
      "http://localhost:5000/api/delivery/ratedMeals/newratedmeal";

    const res = await axios.post(api_url, {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      data: {
        meal: meal,
        note: note,
        feedback: feedback,
      },
    });

    ratedMeal = res.data.data;
    console.log(ratedMeal);
  } catch (err) {
    console.log(err);
  }
}
