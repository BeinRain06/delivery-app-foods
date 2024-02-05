import React, { useState, useContext, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

/* import { getMeals } from "../../callAPI/MealsApi.jsx"; */

import {
  meals_section,
  seaFoods_section,
  meats_section,
  desserts_section,
  vegetarians_section,
  welcome_section,
} from "../../services/redux/createslice/MealSplice.jsx";

import { orderSpecsCurrent_section } from "../../services/redux/createslice/TemplateSlice.jsx";

import CardHome from "../cards/card-home.jsx";
import Loading from "../loading/loading.jsx";

import "./Home.css";

function Home() {
  /*  const {
    state: { meals, meats, seaFoods, vegetarians, desserts },
  } = useContext(MealContext); */

  /*  const {
    state: { orderSpecsCurrent },
    useAsyncGenerator,
  } = useContext(TemplateContext); */

  const dispatch = useDispatch();

  const meals = useSelector(meals_section);
  const meats = useSelector(meats_section);
  const seaFoods = useSelector(seaFoods_section);
  const desserts = useSelector(desserts_section);
  const vegetarians = useSelector(vegetarians_section);
  const welcome = useSelector(welcome_section);

  const orderSpecsCurrent = useSelector(orderSpecsCurrent_section);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const removeLoading = (timeset) => {
        if (loading) {
          setTimeout(async () => {
            console.log("Loading ...");

            await setLoading(false);
          }, timeset);
        }
      };

      console.log("meals:", meals);
      console.log("orderSpecsurrent seen by home:", orderSpecsCurrent);
      console.log("welcome", welcome);

      if (meals.length === 0) {
        removeLoading(6000);
      } else {
        removeLoading(2000);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {!loading ? (
        <main className="home_container flex-column">
          <div className="welcome"></div>
          <div className="book_show flex-row-start">
            <i className="fa-solid fa-book-open fa-2x"></i>
            <span style={{ color: "#702121" }}>Dishes</span>
          </div>
          <div className="meals_borderplate">
            <div className="meats_meals meals_area">
              <span className="gen_title_right">Meats</span>
              <ul className="meal_content">
                {meats &&
                  meats.map((meat, i) => {
                    return (
                      <CardHome
                        key={i}
                        id={meat._id}
                        image={meat.image}
                        name={meat.name}
                        ratings={meat.ratings}
                        origin={meat.origin}
                        ingredients={meat.ingredients}
                        price={meat.price}
                      />
                    );
                  })}
              </ul>
            </div>

            <div className="meats_meals meals_area">
              <span className="gen_title_left">SeaFoods</span>

              <ul className="meal_content">
                {seaFoods.map((seafood, i) => {
                  return (
                    <CardHome
                      key={i}
                      id={seafood._id}
                      image={seafood.image}
                      name={seafood.name}
                      ratings={seafood.ratings}
                      origin={seafood.origin}
                      ingredients={seafood.ingredients}
                      price={seafood.price}
                    />
                  );
                })}
              </ul>
            </div>

            <div className="meats_meals meals_area">
              <span className="gen_title_right">Vegetarians </span>

              <ul className="meal_content" data-meats={meats}>
                {vegetarians.map((vegetarian, i) => {
                  return (
                    <CardHome
                      key={i}
                      id={vegetarian._id}
                      image={vegetarian.image}
                      name={vegetarian.name}
                      ratings={vegetarian.ratings}
                      origin={vegetarian.origin}
                      ingredients={vegetarian.ingredients}
                      price={vegetarian.price}
                    />
                  );
                })}
              </ul>
            </div>

            <div className="meats_meals meals_area">
              <span className="gen_title_center">Desserts</span>

              <ul className="meal_content">
                {desserts.map((dessert, i) => {
                  return (
                    <CardHome
                      key={i}
                      id={dessert._id}
                      image={dessert.image}
                      name={dessert.name}
                      ratings={dessert.ratings}
                      origin={dessert.origin}
                      ingredients={dessert.ingredients}
                      price={dessert.price}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Home;