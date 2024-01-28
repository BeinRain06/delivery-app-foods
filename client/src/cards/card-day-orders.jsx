import React, { useRef, useContext, useState } from "react";
import { useDispatch, useSelector } from "react";
import {
  openTagRatings_section,
  user_section,
  ratings_section,
} from "../redux/services/MealSplice";
import {
  mealActions,
  recordAllMealSliceState,
} from "../redux/services/MealSplice";
import { getThisUserRatings } from "../callAPI/RatingsApi";
import "./card-day-order.css";
import { templateActions } from "../redux/services/TemplateSlice";

function CardDayOrders({ props }) {
  /*  const {
    state: { openTagRatings, user, ratings },
    handleOpenTagsRatings,
  } = useContext(MealContext); */

  const dispatch = useDispatch();

  const openTagRatings = useSelector(openTagRatings_section);
  const user = useSelector(user_section);
  const ratings = useSelector(ratings_section);

  const [recordUser, setRecordUser] = useState(false);
  const mealRef = useRef();

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

    await getThisUserRatings();

    let existInratedMeal = ratings.ratedMeals.map((ratedMeal) => {
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
    }

    //... post or update ratings ? how to know ?
  };

  props.ordersSpecs.map((ordersSpec) => {
    const meal = ordersSpec.meal;
    const quantity = ordersSpec.quantity;
    return (
      <li className="day_dish_recap">
        <p className="title_template_orders">Day Orders</p>
        <div className="dish_table">
          <div className="dish_country">{meal.name}</div>
          <div className="dish_sub_operation">
            <div className="dish_topic">
              <p>
                <span className="number_order">{quantity}</span>
                <span>: Orders</span>
              </p>
            </div>
            <div className="brief_overview_meal">
              <img
                src={meal.image}
                className="dish_order_img"
                alt="oops overview"
              />
              <div
                className="recap_feedback"
                data-meals={meal._id}
                ref={mealRef}
              >
                <button
                  className="send_ratings"
                  onclick={handleOpenTagsRatings}
                >
                  Ratings
                </button>
              </div>
            </div>
            <p className="dish_order_desc">Description: {meal.origin}</p>
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
                            dispatch(
                              templateActions.handleOpenTagsRatings(false)
                            )
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
        </div>
      </li>
    );
  });
}

export default CardDayOrders;
