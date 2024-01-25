import { obtainUser, ratingsChange } from "../context/MealsContext";
import axios from "axios";

//ratings : {} , ratedMeals : []  (GET METHOD)
export async function getThisUserRatings(mealId) {
  const { user, handleUser } = obtainUser();
  const { ratings, handleRatings } = ratingsChange();

  const userId = user.id;

  let api_url = "http://localhost:5000/api/delivery/ratings";

  try {
    let ratings = {};
    const res = await axios.get(`${api_url}/${userId}/${mealId}`);
    ratings = res.data.data; //res.data(axios res) - .data (structured data response in backend)
    let ratedMeals = ratings.ratedMeals;

    handleRatings(ratings);

    handleRatedMeals(ratedMeals);
  } catch (err) {
    console.log(err);
  }
}

//ratings : {} , ratedMeals : []  (POST/PUT METHOD)
export async function postOrUpdateRatings(mealIdRef, note, feedback) {
  handleRatings(newRatings);

  console.log("new post rating:", result);

  try {
    const { user, handleUser } = obtainUser();
    const { ratings, handleRatings } = ratingsChange();

    const userId = user.id;

    api_url = `http://localhost:5000/api/delivery/ratings/${userId}`;

    const mealPresent = getThisUserRatings(mealIdRef);

    if (mealPresent._id) {
      //put(update) a new rating

      const res = await axios.put(
        api_url,
        {
          meal: mealIdRef,
          note: note,
          feedback: feedback,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = res.data.data;

      const newRatings = ratings.map((rating, i) => {
        if (rating._id === result._id) {
          rating = result;
        }
      });

      handleRatings(newRatings);

      console.log("new update rating:", result);
    } else {
      //post a new rating

      const res = await axios.post(
        api_url,
        {
          meal: mealIdRef,
          note: note,
          feedback: feedback,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = res.data.data;

      const newRatings = ratings.map((rating, i) => {
        if (rating._id === result._id) {
          rating = result;
        }
      });

      handleRatings(newRatings);

      console.log("new post rating:", result);
    }
  } catch (err) {
    console.log(err);
  }
}
