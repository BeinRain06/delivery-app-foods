import React, { useContext } from "react";
import { ACTIONS_TYPES, MealContext } from "../context/MealsContext";
import axios from "axios";

//ratings : {} , ratedMeals : []  (GET METHOD)
export async function getThisUserRatings() {
  const {
    state: { meals, user },
    handleRatings,
    handleRatedMeals,
  } = useContext(MealContext);

  const userId = user.id;

  let api_url = "http://localhost:5000/api/delivery/ratings";

  try {
    let ratings = {};
    const res = await axios.get(api_url);
    ratings = res.data.data; //res.data(axios res) - .data (structured data response in backend)
    let ratedMeals = ratings.ratedMeals;

    handleRatings();

    handleRatedMeals();
  } catch (err) {
    console.log(err);
  }
}

/* export async function getMealOnCurrentRatings(userId) {} */

//ratings : {} , ratedMeals : []  (POST/PUT METHOD)
export async function postOrUpdateRatings() {
  const { state, dispatch } = useContext(MealContext);

  let api_url1, api_url2;

  try {
    let ratedMeals = state.ratedMeals;
    let potentialNewRating = state.newStandRating;
    let ratedPulse = { success: false, index: null };

    let ratedMeal, userId;

    const mealId = state.spottedForRating.meal;

    let potentialNewRatedMeals =
      ratedMeals.length !== 0 &&
      ratedMeals.forEach((item, index) => {
        if (item.meal === mealId) {
          item.note = potentialNewRating.note;
          item.feedback = potentialNewRating.feedback;

          ratedPulse = { success: true, index: index };
        }
      });

    //  ==> HERE YOU ARE
    if (ratedMeals.length === 0) {
      //POST METHOD Rating  & RatedMeal -axios

      /* RatedMeal */
      api_url1 = `http://localhost:5000/api/delivery/ratedmeals`;

      const res = await axios.post(api_url1, {
        method: "post",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        data: {
          meal: potentialNewRating.meal,
          note: potentialNewRating.note,
          feedback: potentialNewRating.feedback,
        },
      });

      const catchRes = res.data.data;

      ratedMeals.push(catchRes);

      /* Rating*/
      api_url2 = `http://localhost:5000/api/delivery/ratings`;

      const res1 = await axios.post(api_url2, {
        method: "post",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        data: {
          user: ratedMeal.userId,
          ratedMeals: ratedMeals,
        },
      });
    }

    if (ratedPulse.success) {
      let index = ratedPulse.index;

      ratedMeal = potentialNewRatedMeals[index];

      //PUT METHOD Rating  & RatedMeal -axios

      /* RatedMeal */
      api_url1 = `http://localhost:5000/api/delivery/ratedmeals/${ratedMeal._id}`;

      const res = await axios.put(api_url1, {
        method: "put",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: {
          meal: ratedMeal.meal,
          note: ratedMeal.note,
          feedback: ratedMeal.feedback,
        },
      });

      /* Rating*/
      api_url2 = `http://localhost:5000/api/delivery/ratings/${userId}`;

      const res1 = await axios.put(api_url2, {
        method: "put",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: {
          user: ratedMeal.userId,
          ratedMeals: potentialNewRatedMeals,
        },
      });
    } else {
      //POST METHOD  RatedMeal  &  PUT METHOD Rating -axios

      /* RatedMeal */
      api_url1 = `http://localhost:5000/api/delivery/ratedmeals`;

      const res = await axios.post(api_url1, {
        method: "post",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: {
          meal: potentialNewRating.meal,
          note: potentialNewRating.note,
          feedback: potentialNewRating.feedback,
        },
      });

      const catchRes = res.data.data;

      potentialNewRatedMeals.push(catchRes);

      /* Rating*/
      api_url2 = `http://localhost:5000/api/delivery/ratings/${userId}`;

      const res1 = await axios.put(api_url2, {
        method: "put",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: {
          user: ratedMeal.userId,
          ratedMeals: potentialNewRatedMeals,
        },
      });
    }

    /*  dispatch({ type: ACTIONS_TYPES.RATINGS, payload: ratedMeals }); */
  } catch (err) {
    console.log(err);
  }
}
