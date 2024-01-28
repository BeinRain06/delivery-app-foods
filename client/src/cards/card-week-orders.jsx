import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  mealActions,
  recordAllMealSliceState,
} from "../redux/services/MealSplice";
import {
  openTagRatings_section,
  user_section,
} from "../redux/services/MealSplice";
import { postOrUpdateRatings } from "../callAPI/RatingsApi";
import { updateRatedMeal } from "../callAPI/RatedMealsApi";

import { postRatedMeal } from "../callAPI/RatedMealsApi";

import "./card-week-order.css";

/* import { userLogging, userRegistering } from "../callAPI/UsersApi"; */

import LogOrRegisterForm from "./register-login-form";

const MiniCardWeeksOrders = ({ props }) => {
  /* const {
    state: { meals, openTagRatings, user, ratings, ratedMeals },
    handleOpenTagsRatings,
  } = useContext(MealContext); */

  const dispatch = useDispatch();

  const openTagRatings = useSelector(openTagRatings_section);
  const user = useSelector(user_section);

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
              Notes : <span>{props.meal.ratings} </span>
            </p>
          </div>
          <div className="brief_overview_meal">
            <img
              src={AhmadIMG}
              className="dish_order_img"
              alt="oops overview"
            />

            <p className="dish_order_desc">Description: {props.meal.origin}</p>
          </div>
        </div>
        <div className="dish_topic">
          <p>{props.meal.name}</p>
          <p>
            <span className="number_order">{props.quantity}</span>
            <span>: Ordered</span>
          </p>
        </div>
        <div
          className="recap_feedback"
          data-meal={props.meal._id}
          ref={mealRef}
        >
          <p
            className="send_ratings"
            onClick={() => dispatch(mealActions.handleOpenTagsRatings(true))}
          >
            Ratings
          </p>
          <p
            className="send_feedback"
            onClick={() => dispatch(mealActions.handleOpenTagsRatings(true))}
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
                      onClick={() =>
                        dispatch(mealActions.handleOpenTagsRatings(false))
                      }
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

function CardWeekOrders({ props }) {
  const mealItems = props.ordersSpecs.map((item, i) => {
    const meal = item.meal;
    const quantity = item.quantity;
    return <MiniCardWeeksOrders meal={meal} quantity={quantity} />;
  });
}

export default CardWeekOrders;
