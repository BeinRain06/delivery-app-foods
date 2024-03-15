import axios from "axios";

axios.defaults.withCredentials = true;

export async function postForFirstTimeRatedMeal(mealId, rating, feedback) {
  try {
    let api_url = `http://localhost:5000/api/delivery/ratedmeals/`;

    const response = await axios.post(
      api_url,
      {
        meal: mealId,
        rating: rating,
        feedback: feedback,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("new First Time POST in rateMead collection:", response);

    return response;
  } catch (err) {
    console.log(err);
  }
}

//PUT(new UPDATE) - RATED MEAL Collection
export async function putNewItemRatedMeal(
  ratedMealId,
  mealId,
  rating,
  feedback
) {
  try {
    let api_url = `http://localhost:5000/api/delivery/ratedmeals/ratedmeal/${ratedMealId}`;

    const response = await axios.put(
      api_url,
      {
        meal: mealId,
        rating: rating,
        feedback: feedback,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("response putNewRtedMeals --API:", response);

    return response;
  } catch (err) {
    console.log(err);
  }
}

//UPDATE(PUT) - Rated MEAL EXISTING
export async function updateRatedMeal(
  ratedMealId,
  mealId,
  rating,
  feedback,
  indArr
) {
  try {
    let api_url = `http://localhost:5000/api/delivery/ratedmeals/ratedmeal/${ratedMealId}`;

    const response = await axios.put(
      api_url,
      {
        meal: mealId,
        rating: rating,
        feedback: feedback,
        indArr: indArr,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("my API after Updating in Rated Meal :", response);

    return response;
  } catch (err) {
    console.log(err);
  }
}
