import React, { useRef, useContext, useState } from "react";
import { MealContext } from "../../services/context/MealsContext";
import { TemplateContext } from "../../services/context/TemplateContext";
import handleFirstTimeOrder from "./register-login-form";
import { getThisUserRatings } from "../../callAPI/RatingsApi";

import LogOrRegisterForm from "./register-login-form";
import "./card-day-orders.css";

function CardDayOrders({ ordersSpecs }) {
  const {
    state: user,
    ratings,
    openTagRatings,
    handleOpenTagsRatings,
  } = useContext(MealContext);

  const mealRef = useRef();

  const handleNewRatings = async (e) => {
    e.preventDefault();
    const mealId = mealRef.current.getAttribute("data-meals");
    const meal = mealId;

    let note = e.target.element.ratings.value;
    let feedback = e.target.element.feedback.value;

    if (user.id === undefined) {
      alert("Can't rate for the moment. Please Try again Later!");
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
      newRatedMeal = { meal, note, feedback };
      postRatedMeal(newRatedMeal);
    }

    //... post or update ratings ? how to know ?
  };

  //display DOM
  return (
    <>
      {" "}
      {Object.keys(ordersSpecs).map((key, i) => {
        console.log("ordersSpecs :", ordersSpecs);
        console.log("ordersSpecs Meal :", ordersSpecs[key]);

        const meal = ordersSpecs[key];
        const id = meal.id;

        return (
          <li key={id} className="day_dish_recall">
            <p className="title_template_orders">Day Orders</p>
            <div className="dish_tab_rec">
              <div className="dish_country">{meal.name}</div>
              <div className="dish_sub_operation">
                <div className="dish_topic">
                  <p>
                    <span className="number_order">{meal.quantity}</span>
                    <span>: Orders</span>
                  </p>
                </div>
                <div className="brief_overview_meal">
                  <img
                    src={meal.image}
                    className="dish_order_img"
                    alt="oops overview"
                  />
                  <div className="recap_feed" data-meals={id} ref={mealRef}>
                    <button
                      className="send_ratings btn_ratings"
                      onClick={handleOpenTagsRatings}
                    >
                      Ratings
                    </button>
                  </div>
                </div>
                <p className="dish_order_rec">Description: {meal.origin}</p>
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
                              onClick={handleOpenTagsRatings(false)}
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
      })}
    </>
  );
}

export default CardDayOrders;
