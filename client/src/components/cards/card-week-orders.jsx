import React, { useState, useRef, useContext } from "react";
import { postOrUpdateRatings } from "../../callAPI/RatingsApi";
import { updateRatedMeal, postRatedMeal } from "../../callAPI/RatedMealsApi";
import { MealContext } from "../../services/context/MealsContext";

import "./card-week-order.css";

/* import { userLogging, userRegistering } from "../callAPI/UsersApi"; */

import LogOrRegisterForm from "./register-login-form";

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
    const mealId = mealRef.current.getAttribute("data-meals");
    const meal = mealId;

    let note = e.target.element.ratings.value;
    let feedback = e.target.element.feedback.value;

    if (user.id === undefined) {
      //login or register
      setRecordUser(true);
      return;
    }

    await postOrUpdateRatings(meal, note, feedback);

    /* let existInratedMeal = ratings.ratedMeals.map((ratedMeal) => {
      if (ratedMeal.meal === mealId) {
        return ratedMeal;
      }
      return false;
    });

    if (existInratedMeal !== false) {
      // update ratedMeal(axios.put)
      const ratedMealId = existInratedMeal._id;

      let updateRatings;

      updateRatings = { ratedMealId, meal, note, feedback };

      updateRatedMeal(updateRatings);
    } else {
      // post ratedMeal(axios.post)
      let newRatedMeal;
      newRatedMeal = { meal, nite, feedback };
      postRatedMeal(newRatedMeal);
    } */

    //... post or update ratings ? how to know ?
  };

  return (
    <li className="day_dish_recall">
      {recordUser && <LogOrRegisterForm />}
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

  /*  const mealItems = props.ordersSpecs.map((item, i) => {
    const meal = item.meal;
    const quantity = item.quantity;
    return <MiniCardWeeksOrders meal={meal} quantity={quantity} />;
  }); */
}

export default CardWeekOrders;
