import React, { useState, useRef, useContext } from "react";
import { postOrUpdateRatings } from "../../callAPI/RatingsApi";
import { MealContext } from "../../services/context/MealsContext";
import getCookies from "../cookies/GetCookies";

import "./card-week-order.css";

const MiniCardWeekOrders = ({ meal }) => {
  const {
    state: { openTagRatings, user },
  } = useContext(MealContext);

  const [recordUser, setRecordUser] = useState(false);

  /* const [newRatings, setNewRatings] = useState({}); */

  const mealRef = useRef();

  /* const handleOpenBoxRatings = () => {}; */

  const handleNewRatings = async (e) => {
    e.preventDefault();
    console.log("e target New Ratings:", e.target);

    const mealId = mealRef.current.getAttribute("data-meals");

    let rating = e.target.elements.ratings.value;
    let feedback = e.target.elements.feedback.value;

    const cookies = getCookies();
    const userId = cookies.userId;

    if (userId === undefined) {
      alert("Can't rate for the moment. Please Try again Later!");
      return;
    }

    if (rating <= 1 || rating > 5) {
      alert("can't rate less than 1 or more than 5 ");
      return;
    } else if (rating === undefined) {
      alert("miss rating value! between 1 and 5 ");
    }

    if (ratedMeals.length === 0) {
      // first time indeed the user submit a rating
      /* create a new RatedMeal* (POST method)*/
      const uniquePost = await postForFirstTimeRatedMeal(
        mealId,
        rating,
        feedback
      );

      console.log("unique first time ratedMeal :", uniquePost);

      const mealSpecs = meals.find((meal) => meal._id === mealId);

      const mealSpecsSelect = {
        mealId: mealId,
        origin: mealSpecs.origin,
        category: mealSpecs.category,
        ingredients: mealSpecs.ingredients,
        longDesc: mealSpecs.longDesc,
      };

      const ratedMealId = uniquePost.id;

      const restItemRating = {
        rating: uniquePost.rating[0],
        feedback: uniquePost.feedback[0],
        dateMention: uniquePost.dateMention[0],
      };

      const rateAllFeatObj = {
        id: ratedMealId,
        ...mealSpecsSelect,
        ...restItemRating,
      };

      const rateAllFeatArr = [...rateAllFeatObj];

      handleRatedMeals(rateAllFeatArr);

      /* next create a new Rating* (POST method)*/
      const uniqueRating = await ratingFirstime(userId, ratedMealId);

      console.log("unique first time rating :", uniqueRating);
    }

    let existInRatedMeal = ratedMeals.reduce((acc, val, indexArr) => {
      if (val.mealId === mealId) {
        return { indexArr, ...acc };
      } else {
        const newAcc = { indexArr, ...val };
        return newAcc;
      }
    }, {});

    // id of ratedMeal in collection
    const ratedMealId = existInRatedMeal.id;

    if (existInRatedMeal.mealId === mealId) {
      // update ratedMeal(axios.put)

      const indArr = existInRatedMeal.indexArr;

      if (feedback !== "") {
        const newUpdateRatedMeal = {
          ...ratedMeals,
          [indArr]: {
            ...ratedMeals[indArr],
            rating: rating,
            feedback: feedback,
          },
        };
        handleRatedMeals(newUpdateRatedMeal);
      } else {
        const newUpdateRatedMeal = {
          ...ratedMeals,
          [indArr]: { ...ratedMeals[indArr], rating: rating },
        };
        handleRatedMeals(newUpdateRatedMeal);
      }

      await updateRatedMeal(ratedMealId, mealId, rating, feedback, indArr);
    } else {
      // update sending a new item (axios.post)
      await putNewItemRatedMeal(ratedMealId, mealId, rating, feedback);
    }
  };

  return (
    <li className="day_dish_recall">
      <div className="dish_table">
        <div className="dish_sub_operation">
          <div>
            <p>
              Notes : <span>{meal.ratings} </span>
            </p>
          </div>
          <div className="brief_overview_meal">
            <img
              src={meal.image}
              className="dish_order_img"
              alt="oops overview"
            />

            <p className="dish_order_desc">Description: {meal.origin}</p>
          </div>
        </div>
        <div className="dish_topic">
          <p>{meal.name}</p>
          <p>
            <span className="number_order">{meal.quantity}</span>
            <span>: Ordered</span>
          </p>
        </div>
        <div className="recap_feedback" data-meal={meal.id} ref={mealRef}>
          <p
            className="send_ratings"
            onClick={() => handleOpenTagsRatings(true)}
          >
            Ratings
          </p>
          <p
            className="send_feedback"
            onClick={() => handleOpenTagsRatings(true)}
          >
            Feedback
          </p>
        </div>
        {openTagRatings && (
          <>
            <div className="wrapping_ratings_form">
              <form
                className="ratings_control_form"
                onSubmit={handleNewRatings}
              >
                <ul className="rate_feed">
                  <li>
                    <label htmlFor="Ratings">Ratings</label>
                    <input
                      type="number"
                      name="ratings"
                      id="ratings"
                      className="ratings_size"
                      min="1"
                      max="5"
                      placeholder="3.0"
                    />
                  </li>
                  <li>
                    <label htmlFor="Feedback">FeedBack</label>
                    <textarea
                      name="feedback"
                      id="feedback"
                      className="feedback_size"
                      cols="30"
                      rows="10"
                    >
                      Feedback
                    </textarea>
                  </li>
                </ul>
                <ul className="wrap_score_ratings">
                  <li>
                    <button
                      type="button"
                      className="abort_submit"
                      onClick={() => handleOpenTagsRatings(false)}
                    >
                      Clear
                    </button>
                  </li>
                  <li>
                    <button type="submit" className="send_new_feed">
                      Send
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          </>
        )}
      </div>
    </li>
  );
};

function CardWeekOrders({ ...props }) {
  if (props) {
    const ordersInside = props.ordersSpecs;

    const mealItemsKeys = Object.keys(ordersInside);

    return mealItemsKeys.map((key, i) => (
      <MiniCardWeekOrders key={i} meal={ordersInside[key]} />
    ));
  }
}

export default CardWeekOrders;
