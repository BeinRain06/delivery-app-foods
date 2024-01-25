import axios from "axios";

export async function updateRatedMeal(ratedMealId, meal, note, feedback) {
  try {
    let ratedMeal;
    const api_url = "http://localhost:5000/api/delivery/ratedMeals/ratedmeal";

    const res = await axios.put(
      `${api_url}/${ratedMealId}`,
      {
        meal: meal,
        note: note,
        feedback: feedback,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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

    const res = await axios.post(
      api_url,
      {
        meal: meal,
        note: note,
        feedback: feedback,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    ratedMeal = res.data.data;
    console.log(ratedMeal);
  } catch (err) {
    console.log(err);
  }
}
