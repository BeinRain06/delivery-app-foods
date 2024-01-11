import React, { useContext, useState, useEffect } from "react";
import { MealContext } from "../context/MealsContext";
import { DailyContext } from "../context/DailyContext";
import moment from "moment";
import Loading from "../loading/loading";
import LoadingDaily from "../loading/loadingDaily";
import "./FoodsDay.css";

function FoodsDay() {
  const {
    state: { meals, meats, seaFoods, vegetarians, desserts, welcome },
    handleUpstreamOrder,
    handleWelcome,
  } = useContext(MealContext);

  const {
    state: {
      lastActiveDay,
      arrayDayWeeK,
      selectMeats,
      selectSeafoods,
      selectVegetarians,
      selectDesserts,
      endThisVar,
    },
    handleEndThisVar,
  } = useContext(DailyContext);

  const [loading, setLoading] = useState(true);

  /*  const mySet = new Set();

  mySet.add("Meats").add("Seafoods");
  mySet.add("Vegetarians").add("Desserts"); */

  /*  const meatId = import.meta.env.VITE_ID_MEATS;
  const seafoodId = import.meta.env.VITE_ID_SEAFOODS;
  const vegetarianId = import.meta.env.VITE_ID_VEGETARIANS;
  const dessertId = import.meta.env.VITE_ID_DESSERTS; */

  const selectSquareFoods = (e) => {
    console.log(e.target);

    setLoading(true);

    const playNewEnd = mySet.forEach((item, i) => {
      if (e.target.getAttribute("data-meal") === item) {
        setTimeout(async () => {
          await handleEndThisVar(mySet[i]);
        }, 3000);

        removeLoading(1500);
        return;
      }
    });

    return playNewEnd;
  };

  const removeLoading = (timer) => {
    if (loading) {
      setTimeout(async () => {
        console.log("Loading ...");

        await setLoading(false);
      }, timer);
    }
  };

  const suitRenderMeals = (newItem) => {
    switch (newItem) {
      case "Meats":
        return selectMeats;
      case "Seafoods":
        return selectSeafoods;
      case "Vegetarians":
        return selectVegetarians;
      case "Desserts":
        return selectDesserts;
      default:
        throw new Error("something went wrong suitRenderMeals Function ");
    }
  };

  useEffect(() => {
    try {
      /* setTimeout(() => {
        console.log("For Real Waiting Data Coming...");
      }, 4000); */

      setTimeout(async () => {
        setLoading(false);
      }, 3000);
      console.log("meals:", meals);
      console.log("meats:", meats);
      console.log("selectMeats:", selectMeats);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      console.log("1--2--3 update under e.target square");
    } catch (err) {
      console.log(err);
    }
  }, [endThisVar]);

  return (
    <main className="welcome_day">
      <div className="day_page_wrapper">
        <p className="gen_title_day title_page">Day's Menu</p>
        <section id="meats_matching" className="foods_matching">
          <div className="template_food_day">
            <p className="gen_title_day title_category">Meats</p>
            <ul className="square_indicator">
              <li
                key="meats"
                className="square_rhytmic"
                data-meal="Meats"
                onClick={(e) => selectSquareFoods(e)}
              >
                <div className="square_box"></div>
              </li>
              <li
                key="seafoods"
                className="square_rhytmic"
                data-meal="Seafoods"
                onClick={(e) => selectSquareFoods(e)}
              >
                <div className="square_box"></div>
              </li>
              <li
                key="vegetarians"
                className="square_rhytmic"
                data-meal="Vegetarians"
                onClick={(e) => selectSquareFoods(e)}
              >
                <div className="square_box"></div>
              </li>
              <li
                key="desserts"
                className="square_rhytmic"
                data-meal="Desserts"
                onClick={(e) => selectSquareFoods(e)}
              >
                <div className="square_box"></div>
              </li>
            </ul>
            {!loading ? (
              <>
                <ul className="on_top_mini">
                  {endThisVar === "Meats"
                    ? selectMeats.map((item, i) => {
                        return (
                          <li key={item._id} className="min_showcase">
                            <div className="mini_meal_img">
                              <div className="box_mini_img">
                                <p className="side_name_img">{item.name}</p>
                              </div>
                              <img
                                src={item.image}
                                alt="no_img_here"
                                className="img_day_top"
                              />
                            </div>
                          </li>
                        );
                      })
                    : suitRenderMeals(endThisVar).map((item, i) => {
                        return (
                          <li key={item._id} className="min_showcase">
                            <div className="mini_meal_img">
                              <div className="box_mini_img">
                                <p className="side_name_img">{item.name}</p>
                              </div>
                              <img
                                src={item.image}
                                alt="no_img_here"
                                className="img_day_top"
                              />
                            </div>
                          </li>
                        );
                      })}
                </ul>
                <div className=" showcase_mobile_wrapper showcase_dish ">
                  <ul className="listing_mob_dish">
                    {endThisVar === "Meats"
                      ? selectMeats.map((meal, i) => {
                          return (
                            <li key={meal._id} className="show_ray_wrapper">
                              <div>
                                <div>
                                  <div className="show_content_dish">
                                    <div className="dish_frame">
                                      <img
                                        src={meal.image}
                                        className="dish_img"
                                        alt="show dish missing"
                                      />
                                      <p className="dish_name">{meal.name}</p>
                                    </div>
                                    <div className="centralize_info_dish">
                                      <div className="dish_desc">
                                        <div className="dish_mini_desc">
                                          <p className="title_desc">
                                            Description
                                          </p>
                                          <p className="description_dish">
                                            {meal.longDesc}
                                          </p>
                                        </div>
                                        <div className="dish_bill">
                                          <p className="dish_price">
                                            ${meal.price}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="dish_order">
                                        <div className="dish_ingredients flex-column">
                                          <p className="title_ingredients">
                                            Ingredients
                                          </p>
                                          <p className="some_ingredients">
                                            {meal.ingredients}
                                          </p>
                                        </div>
                                        <div
                                          className="ordering"
                                          data-mealid={meal._id}
                                          data-mealname={meal.name}
                                          data-price={meal.price}
                                        >
                                          <button
                                            className="btn btn_order"
                                            onClick={handleUpstreamOrder}
                                          >
                                            Order
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })
                      : suitRenderMeals(endThisVar).map((meal, i) => {
                          return (
                            <li key={meal._id} className="show_ray_wrapper">
                              <div>
                                <div>
                                  <div className="show_content_dish">
                                    <div className="dish_frame">
                                      <img
                                        src={meal.image}
                                        className="dish_img"
                                        alt="show dish missing"
                                      />
                                      <p className="dish_name">{meal.name}</p>
                                    </div>
                                    <div className="centralize_info_dish">
                                      <div className="dish_desc">
                                        <div className="dish_mini_desc">
                                          <p className="title_desc">
                                            Description
                                          </p>
                                          <p className="description_dish">
                                            {meal.longDesc}
                                          </p>
                                        </div>
                                        <div className="dish_bill">
                                          <p className="dish_price">
                                            ${meal.price}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="dish_order">
                                        <div className="dish_ingredients flex-column">
                                          <p className="title_ingredients">
                                            Ingredients
                                          </p>
                                          <p className="some_ingredients">
                                            {meal.ingredients}
                                          </p>
                                        </div>
                                        <div
                                          className="ordering"
                                          data-mealid={meal._id}
                                          data-mealname={meal.name}
                                          data-price={meal.price}
                                        >
                                          <button
                                            className="btn btn_order"
                                            onClick={handleUpstreamOrder}
                                          >
                                            Order
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                  </ul>
                </div>
                <div className="showcase_wrapper_desktop">
                  <div className="showcase_center_wrap flex-row">
                    <div className="this_day">
                      <p className="actual_date">
                        <span className="calling">
                          This {moment().format("dddd")} ,
                        </span>
                        <span
                          className="underlined_day_part"
                          style={{ textDecoration: "underline" }}
                        >
                          {moment().format("MMMM Do YYYY")}
                        </span>
                      </p>
                    </div>
                    <ul className="showcase_content_desktop">
                      {endThisVar === "Meats"
                        ? selectMeats.map((meal, i) => {
                            return (
                              <li
                                key={meal._id}
                                className="each_day_dish flex-row"
                              >
                                <div className="showcase_dish">
                                  <div className="show_ray_wrapper">
                                    <div>
                                      <div>
                                        <div className="show_content_dish">
                                          <div className="dish_frame">
                                            <img
                                              src={meal.image}
                                              className="dish_img"
                                              alt="show dish missing"
                                            />
                                            <p className="dish_name">
                                              {meal.name}
                                            </p>
                                          </div>
                                          <div className="dish_desc">
                                            <div className="dish_mini_desc">
                                              <p className="title_desc">
                                                Description
                                              </p>
                                              <p className="description_dish">
                                                {meal.longDesc}
                                              </p>
                                            </div>
                                            <div className="dish_bill">
                                              <p className="dish_price">
                                                ${meal.price}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="dish_order">
                                            <div className="dish_ingredients flex-column">
                                              <p className="title_ingredients">
                                                Ingredients
                                              </p>
                                              <p className="some_ingredients">
                                                {meal.ingredients}
                                              </p>
                                            </div>
                                            <div
                                              className="ordering"
                                              data-mealid={meal._id}
                                              data-mealname={meal.name}
                                              data-price={meal.price}
                                            >
                                              <button className="btn btn_order">
                                                Order
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })
                        : suitRenderMeals(endThisVar).map((meal, i) => {
                            return (
                              <li
                                key={meal._id}
                                className="each_day_dish flex-row"
                              >
                                <div className="showcase_dish">
                                  <div className="show_ray_wrapper">
                                    <div>
                                      <div>
                                        <div className="show_content_dish">
                                          <div className="dish_frame">
                                            <img
                                              src={meal.image}
                                              className="dish_img"
                                              alt="show dish missing"
                                            />
                                            <p className="dish_name">
                                              {meal.name}
                                            </p>
                                          </div>
                                          <div className="dish_desc">
                                            <div className="dish_mini_desc">
                                              <p className="title_desc">
                                                Description
                                              </p>
                                              <p className="description_dish">
                                                {meal.longDesc}
                                              </p>
                                            </div>
                                            <div className="dish_bill">
                                              <p className="dish_price">
                                                ${meal.price}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="dish_order">
                                            <div className="dish_ingredients flex-column">
                                              <p className="title_ingredients">
                                                Ingredients
                                              </p>
                                              <p className="some_ingredients">
                                                {meal.ingredients}
                                              </p>
                                            </div>
                                            <div
                                              className="ordering"
                                              data-mealid={meal._id}
                                              data-mealname={meal.name}
                                              data-price={meal.price}
                                            >
                                              <button className="btn btn_order">
                                                Order
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                    </ul>
                    <div className="this_day"></div>
                  </div>
                </div>
              </>
            ) : (
              <LoadingDaily />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default FoodsDay;
