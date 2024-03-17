import { updateMealScoreRating } from "../../../callAPI/MealsApi";
import { getAllRatings } from "../../../callAPI/RatingsApi";

export const recallAllRatingAndUpdateMeal = async (mealId) => {
  const allRatings = await getAllRatings();

  const allRatedMeals = allRatings.map((ratingsUnit) => ratingsUnit.ratedMeals);
  let entireRatedMealsObj = { ...allRatedMeals };

  const entireRatedMealskeys = Object.keys(entireRatedMealsObj);

  const resultArrRating = entireRatedMealskeys.reduce((acc, val, i) => {
    const insideArr = entireRatedMealsObj[val];
    const filterArr = insideArr.filter((item) => item.meal === mealId);

    console.log("filterArr:", filterArr);
    if (filterArr.length !== 0) {
      const rating = filterArr[0].rating;
      const newAcc = [...acc, rating];
      return newAcc;
    } else {
      return acc;
    }
  }, []);

  console.log("resultArrRating:", resultArrRating);

  const newRatingSide = updateMealScoreRating(mealId, resultArrRating);

  console.log("the new Meals data after Ratings:", newRatingSide);
};
