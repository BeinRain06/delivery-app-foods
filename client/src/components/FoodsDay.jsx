import React, { useContext, useState, useEffect } from "react";
import { MealContext } from "../context/MealsContext";
import { DailyContext } from "../context/DailyContext";
import moment from "moment";
import Loading from "../loading/loading";
import { getMeals } from "../callAPI/MealsApi";
import "./FoodsDay.css";

function FoodsDay() {
  const {
    state: { meals, meats, seaFoods, vegetarians, desserts },
    handleUpstreamOrder,
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
      mondayMenu,
    },
    handleLastActiveDay,
    handleActiveDayWeek,
    handleMondayMenu,
    handleEndThisVar,
    handleSelectedMeats,
    handleSelectedSeafoods,
    handleSelectedVegetarians,
    handleSelectedDesserts,
  } = useContext(DailyContext);

  const [todayIs, setTodayIs] = useState(moment().format("ddd"));
  const [loading, setLoading] = useState(true);

  const mySet = new Set();

  mySet.add("Meats").add("Seafoods");
  mySet.add("Vegetarians").add("Desserts");

  /*  const meatId = import.meta.env.VITE_ID_MEATS;
  const seafoodId = import.meta.env.VITE_ID_SEAFOODS;
  const vegetarianId = import.meta.env.VITE_ID_VEGETARIANS;
  const dessertId = import.meta.env.VITE_ID_DESSERTS; */

  const preSelectedFoods = () => {
    setLoading(true);

    if (lastActiveDay.day === todayIs && lastActiveDay.day === "Mon") {
      if (mondayMenu.length === 0) {
        setTimeout(async () => {
          await buildDailyMeals(0, true);
        }, 3000);
      } else {
        setTimeout(async () => {
          await handleSelectedMeats(mondayMenu.meats);
          await handleSelectedSeafoods(mondayMenu.seafoods);
          await handleSelectedVegetarians(mondayMenu.vegetarians);
          await handleSelectedDesserts(mondayMenu.desserts);
        }, 3000);
      }
    } else if (lastActiveDay.day !== todayIs) {
      arrayDayWeeK.map(async (newDay, i) => {
        if (newDay === todayIs) {
          let newActiveDay = {
            day: moment().format("ddd"),
            isActive: true,
            index: i,
          };

          setTimeout(async () => {
            const prevIndex = lastActiveDay.index;
            const nextIndex = newActiveDay.index;
            let newChange = {
              ...arrayDayWeeK,
              [prevIndex]: { ...arrayDayWeeK[prevIndex], isActive: false },
              [nextIndex]: { ...arrayDayWeeK[nextIndex], isActive: true },
            };

            handleLastActiveDay(newActiveDay);
            handleActiveDayWeek(newChange); // here you are

            await buildDailyMeals(i, false);
          }, 3000);
        }
      });
    }
  };

  const selectSquareFoods = (e) => {
    console.log(e.target);

    setLoading(true);

    const playNewEnd = mySet.map((item, i) => {
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

  const buildDailyMeals = (indexThisDay, isMonday) => {
    mySet.map(async (item, i) => {
      let indA1, indA2;

      if (item === "Meats") {
        indA1 = meats.length / 2;
        indA2 = meats.length - indA1 + 1;

        await loopMeal(indA1, indA2, indexThisDay, "meats");
      } else if (item === "Seafoods") {
        indA1 = seaFoods.length / 2;
        indA2 = seaFoods.length - indA1 + 1;

        await loopMeal(indA1, indA2, indexThisDay, "seafoods");
      } else if (item === "Vegetarians") {
        indA1 = vegetarians.length / 2;
        indA2 = vegetarians.length - indA1 + 1;

        await loopMeal(indA1, indA2, indexThisDay, "vegetarians");
      } else if (item === "Desserts") {
        indA1 = desserts.length / 2;
        indA2 = desserts.length - indA1 + 1;

        await loopMeal(indA1, indA2, indexThisDay, "desserts");
      }
    });
  };

  const loopMeal = (indA1, indA2, indexThisDay, mealLabel) => {
    /*  let count = 3; */

    let tmpArr1 = [],
      tmpArr2 = [],
      tmpArr = [];

    for (let i = 0; i < mealType.length; i++) {
      if (i <= indA1) {
        tmpArr1.push(meats[i]);
      } else {
        tmpArr2.push(meats[i]);
      }
    }

    /* do {
      let a = Math.floor(Math.random() * (indA1-- + 1));
      let b = Math.floor(Math.random() * (indA2-- + 1));
      let c = Math.floor(Math.random() * Math.abs(indA2 - indA1));
      
      tmpArr1.splice(a, 1);
      tmpArr1.splice(b, 1);
      tmpArr1.splice(c, 1);
      tmpArr2.splice(a, 1);
      tmpArr2.splice(b, 1);
      tmpArr2.splice(c, 1);
      count--;
    } while (count > 0); */

    let a = Math.floor(Math.random() * (indA1-- + 1));
    let b = Math.floor(Math.random() * (indA2-- + 1));
    let c = Math.floor(Math.random() * Math.abs(indA2 - indA1));

    tmpArr1.splice(a, 1);
    tmpArr1.splice(b, 1);
    tmpArr1.splice(c, 1);
    tmpArr2.splice(a, 1);
    tmpArr2.splice(b, 1);
    tmpArr2.splice(c, 1);

    tmpArr = tmpArr1.concat(tmpArr2);

    console.log("TMPARR:", tmpArr);

    setTimeout(async (mealLabel, indexThisDay) => {
      let checkIsMonday;
      let newBoardMeals;

      if (mondayMenu.length === 0 && indexThisDay === 0) {
        checkIsMonday = true;
      }

      switch (mealLabel) {
        case "meats":
          if (checkIsMonday) {
            newBoardMeals = { ...mondayMenu, meats: tmpArr };
            await handleMondayMenu(newBoardMeals);
            return await handleSelectedMeats(tmpArr);
          }

          let meatItemOne;
          meatItemOne = { ...mondayMenu, meats: tmpArr };
          return await handleSelectedMeats(meatItemOne);

        case "seafoods":
          if (checkIsMonday) {
            newBoardMeals = { ...mondayMenu, seafoods: tmpArr };
            await handleMondayMenu(newBoardMeals);
            return await handleSelectedMeats(tmpArr);
          }
          let meatItemTwo;
          meatItemTwo = { ...mondayMenu, seafoods: tmpArr };
          return await handleSelectedSeafoods(meatItemTwo);

        case "vegetarians":
          if (checkIsMonday) {
            newBoardMeals = { ...mondayMenu, vegetarians: tmpArr };
            await handleMondayMenu(newBoardMeals);
            return await handleSelectedMeats(tmpArr);
          }

          let meatItemThree;
          meatItemThree = { ...mondayMenu, vegetarians: tmpArr };
          return await handleSelectedVegetarians(meatItemThree);

        case "desserts":
          if (checkIsMonday) {
            newBoardMeals = { ...mondayMenu, desserts: tmpArr };
            await handleMondayMenu(newBoardMeals);
            return await handleSelectedMeats(tmpArr);
          }

          let meatItemFour;
          meatItemFour = { ...mondayMenu, desserts: tmpArr };
          return await handleSelectedDesserts(meatItemFour);

        default:
          throw new Error(
            "something went wrong settings new random meals array !"
          );
      }
    }, 3000);

    if (indexThisDay === 3) {
      switch (mealLabel) {
        case "meats":
          let meatItemOne;
          meatItemOne = { ...mondayMenu, meats: tmpArr };
          handleMondayMenu(meatItemOne);

        case "seafoods":
          let meatItemTwo;
          meatItemTwo = { ...mondayMenu, seafoods: tmpArr };
          handleMondayMenu(meatItemTwo);

        case "vegetarians":
          let meatItemThree;
          meatItemThree = { ...mondayMenu, vegetarians: tmpArr };
          handleMondayMenu(meatItemThree);

        case "desserts":
          let meatItemFour;
          meatItemFour = { ...mondayMenu, desserts: tmpArr };
          handleMondayMenu(meatItemFour);

        default:
          throw new Error("something went wrong in Monday Menu !");
      }
    }
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
      setTimeout(async () => {
        await preSelectedFoods();
      }, 2000);
      removeLoading(3000);
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
                className="square_rhytmic"
                data-meal="Meats"
                onClick={(e) => selectSquareFoods(e)}
              >
                <div className="square_box"></div>
              </li>
              <li
                className="square_rhytmic"
                data-meal="Seafoods"
                onClick={(e) => selectSquareFoods(e)}
              >
                <div className="square_box"></div>
              </li>
              <li
                className="square_rhytmic"
                data-meal="Vegetarians"
                onClick={(e) => selectSquareFoods(e)}
              >
                <div className="square_box"></div>
              </li>
              <li
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
                          <li className="min_showcase">
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
                          <li className="min_showcase">
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

                  {/*  <li className="min_showcase">
                <div className="mini_meal_img">
                  <div className="box_mini_img">
                    <p className="side_name_img">Jutsu Chicken</p>
                  </div>
                  <img
                    src={AhmadIMG}
                    alt="no_img_here"
                    className="img_day_top"
                  />
                </div>
              </li>
              <li className="min_showcase">
                <div className="mini_meal_img">
                  <div className="box_mini_img">
                    <p className="side_name_img">Jutsu Chicken</p>
                  </div>
                  <img
                    src={AhmadIMG}
                    alt="no_img_here"
                    className="img_day_top"
                  />
                </div>
              </li>
              <li className="min_showcase">
                <div className="mini_meal_img">
                  <div className="box_mini_img">
                    <p className="side_name_img">Jutsu Chicken</p>
                  </div>
                  <img
                    src={AhmadIMG}
                    alt="no_img_here"
                    className="img_day_top"
                  />
                </div>
              </li>
              <li className="min_showcase">
                <div className="mini_meal_img">
                  <div className="box_mini_img">
                    <p className="side_name_img">Jutsu Chicken</p>
                  </div>
                  <img
                    src={AhmadIMG}
                    alt="no_img_here"
                    className="img_day_top"
                  />
                </div>
              </li>
              <li className="min_showcase">
                <div className="mini_meal_img">
                  <div className="box_mini_img">
                    <p className="side_name_img">Jutsu Chicken</p>
                  </div>
                  <img
                    src={AhmadIMG}
                    alt="no_img_here"
                    className="img_day_top"
                  />
                </div>
              </li> */}
                </ul>
                <div className=" showcase_mobile_wrapper showcase_dish ">
                  <ul className="listing_mob_dish">
                    {endThisVar === "Meats"
                      ? selectMeats.map((meal, i) => {
                          return (
                            <li className="show_ray_wrapper">
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
                            <li className="show_ray_wrapper">
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

                    {/* <div className="show_ray_wrapper">
                  <div>
                    <div>
                      <div className="show_content_dish">
                        <div className="dish_frame">
                          <img
                            src={AhmadIMG}
                            className="dish_img"
                            alt="show dish missing"
                          />
                          <p className="dish_name">Jutsu Chicken</p>
                        </div>
                        <div className="centralize_info_dish">
                          <div className="dish_desc">
                            <div className="dish_mini_desc">
                              <p className="title_desc">Description</p>
                              <p className="description_dish">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Dolore
                              </p>
                            </div>
                            <div className="dish_bill">
                              <p className="dish_price">$10</p>
                            </div>
                          </div>
                          <div className="dish_order">
                            <div className="dish_ingredients flex-column">
                              <p className="title_ingredients">Ingredients</p>
                              <p className="some_ingredients">
                                tomatoes, onions, celeries
                              </p>
                            </div>
                            <div
                              className="ordering"
                              data-mealid="807422223401239"
                              data-mealname="egyptian_fattah"
                              data-price="7.45"
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
                </div> */}
                    {/* <div className="show_ray_wrapper">
                  <div>
                    <div>
                      <div className="show_content_dish">
                        <div className="dish_frame">
                          <img
                            src={AhmadIMG}
                            className="dish_img"
                            alt="show dish missing"
                          />
                          <p className="dish_name">Jutsu Chicken</p>
                        </div>
                        <div className="centralize_info_dish">
                          <div className="dish_desc">
                            <div className="dish_mini_desc">
                              <p className="title_desc">Description</p>
                              <p className="description_dish">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Dolore
                              </p>
                            </div>
                            <div className="dish_bill">
                              <p className="dish_price">$10</p>
                            </div>
                          </div>
                          <div className="dish_order">
                            <div className="dish_ingredients flex-column">
                              <p className="title_ingredients">Ingredients</p>
                              <p className="some_ingredients">
                                tomatoes, onions, celeries
                              </p>
                            </div>
                            <div
                              className="ordering"
                              data-mealid="807422223401239"
                              data-mealname="egyptian_fattah"
                              data-price="7.45"
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
                </div> */}
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
                              <li className="each_day_dish flex-row">
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
                              <li className="each_day_dish flex-row">
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

                      {/* <li className="each_day_dish flex-row">
                    <div className="showcase_dish">
                      <div className="show_ray_wrapper">
                        <div>
                          <div>
                            <div className="show_content_dish">
                              <div className="dish_frame">
                                <img
                                  src={AhmadIMG}
                                  className="dish_img"
                                  alt="show dish missing"
                                />
                                <p className="dish_name">Jutsu Chicken</p>
                              </div>
                              <div className="dish_desc">
                                <div className="dish_mini_desc">
                                  <p className="title_desc">Description</p>
                                  <p className="description_dish">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Dolore
                                  </p>
                                </div>
                                <div className="dish_bill">
                                  <p className="dish_price">$10</p>
                                </div>
                              </div>
                              <div className="dish_order">
                                <div className="dish_ingredients flex-column">
                                  <p className="title_ingredients">
                                    Ingredients
                                  </p>
                                  <p className="some_ingredients">
                                    tomatoes, onions, celeries
                                  </p>
                                </div>
                                <div className="ordering">
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
                  <li className="each_day_dish flex-row">
                    <div className="showcase_dish">
                      <div className="show_ray_wrapper">
                        <div>
                          <div>
                            <div className="show_content_dish">
                              <div className="dish_frame">
                                <img
                                  src={AhmadIMG}
                                  className="dish_img"
                                  alt="show dish missing"
                                />
                                <p className="dish_name">Jutsu Chicken</p>
                              </div>
                              <div className="dish_desc">
                                <div className="dish_mini_desc">
                                  <p className="title_desc">Description</p>
                                  <p className="description_dish">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Dolore
                                  </p>
                                </div>
                                <div className="dish_bill">
                                  <p className="dish_price">$10</p>
                                </div>
                              </div>
                              <div className="dish_order">
                                <div className="dish_ingredients flex-column">
                                  <p className="title_ingredients">
                                    Ingredients
                                  </p>
                                  <p className="some_ingredients">
                                    tomatoes, onions, celeries
                                  </p>
                                </div>
                                <div className="ordering">
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
                  <li className="each_day_dish flex-row">
                    <div className="showcase_dish">
                      <div className="show_ray_wrapper">
                        <div>
                          <div>
                            <div className="show_content_dish">
                              <div className="dish_frame">
                                <img
                                  src={AhmadIMG}
                                  className="dish_img"
                                  alt="show dish missing"
                                />
                                <p className="dish_name">Jutsu Chicken</p>
                              </div>
                              <div className="dish_desc">
                                <div className="dish_mini_desc">
                                  <p className="title_desc">Description</p>
                                  <p className="description_dish">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Dolore
                                  </p>
                                </div>
                                <div className="dish_bill">
                                  <p className="dish_price">$10</p>
                                </div>
                              </div>
                              <div className="dish_order">
                                <div className="dish_ingredients flex-column">
                                  <p className="title_ingredients">
                                    Ingredients
                                  </p>
                                  <p className="some_ingredients">
                                    tomatoes, onions, celeries
                                  </p>
                                </div>
                                <div className="ordering">
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
                  <li className="each_day_dish flex-row">
                    <div className="showcase_dish">
                      <div className="show_ray_wrapper">
                        <div>
                          <div>
                            <div className="show_content_dish">
                              <div className="dish_frame">
                                <img
                                  src={AhmadIMG}
                                  className="dish_img"
                                  alt="show dish missing"
                                />
                                <p className="dish_name">Jutsu Chicken</p>
                              </div>
                              <div className="dish_desc">
                                <div className="dish_mini_desc">
                                  <p className="title_desc">Description</p>
                                  <p className="description_dish">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Dolore
                                  </p>
                                </div>
                                <div className="dish_bill">
                                  <p className="dish_price">$10</p>
                                </div>
                              </div>
                              <div className="dish_order">
                                <div className="dish_ingredients flex-column">
                                  <p className="title_ingredients">
                                    Ingredients
                                  </p>
                                  <p className="some_ingredients">
                                    tomatoes, onions, celeries
                                  </p>
                                </div>
                                <div className="ordering">
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
                  <li className="each_day_dish flex-row">
                    <div className="showcase_dish">
                      <div className="show_ray_wrapper">
                        <div>
                          <div>
                            <div className="show_content_dish">
                              <div className="dish_frame">
                                <img
                                  src={AhmadIMG}
                                  className="dish_img"
                                  alt="show dish missing"
                                />
                                <p className="dish_name">Jutsu Chicken</p>
                              </div>
                              <div className="dish_desc">
                                <div className="dish_mini_desc">
                                  <p className="title_desc">Description</p>
                                  <p className="description_dish">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Dolore
                                  </p>
                                </div>
                                <div className="dish_bill">
                                  <p className="dish_price">$10</p>
                                </div>
                              </div>
                              <div className="dish_order">
                                <div className="dish_ingredients flex-column">
                                  <p className="title_ingredients">
                                    Ingredients
                                  </p>
                                  <p className="some_ingredients">
                                    tomatoes, onions, celeries
                                  </p>
                                </div>
                                <div className="ordering">
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
                  </li> */}
                    </ul>
                    <div className="this_day"></div>
                  </div>
                </div>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default FoodsDay;
