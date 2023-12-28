import React, { useContext } from "react";
import {
  AdamIMG,
  AhmadIMG,
  MariaIMG,
  AnastasiyaIMG,
  NordwoodIMG,
} from "../assets/images/index.js";
import { MealContext } from "../context/MealsContext.jsx";
import CardHome from "../cards/card-home.jsx";
import "./Home.css";

function Home() {
  const {
    state: { meals, meats, seaFoods, vegetarians, desserts },
    handleUpstreamOrder,
  } = useContext(MealContext);

  return (
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
            {meats.map((meat, i) => {
              <CardHome
                key={i}
                id={meat._id}
                image={meat.image}
                name={meat.name}
                ratings={meat.ratings}
                origin={meat.origin}
                ingredients={meat.ingredients}
                price={meat.price}
              />;
            })}
          </ul>
        </div>

        <div className="meats_meals meals_area">
          <span className="gen_title_left">SeaFoods</span>

          <ul className="meal_content">
            {seafoods.map((seafood, i) => {
              <CardHome
                key={i}
                id={seafood._id}
                image={seafood.image}
                name={seafood.name}
                ratings={seafood.ratings}
                origin={seafood.origin}
                ingredients={seafood.ingredients}
                price={seafood.price}
              />;
            })}
          </ul>
        </div>

        <div className="meats_meals meals_area">
          <span className="gen_title_right">Vegetarians</span>

          <ul className="meal_content">
            {vegetarians.map((vegetarian, i) => {
              <CardHome
                key={i}
                id={vegetarian._id}
                image={vegetarian.image}
                name={vegetarian.name}
                ratings={vegetarian.ratings}
                origin={vegetarian.origin}
                ingredients={vegetarian.ingredients}
                price={vegetarian.price}
              />;
            })}
          </ul>
        </div>

        <div className="meats_meals meals_area">
          <span className="gen_title_center">Desserts</span>

          <ul className="meal_content">
            {desserts.map((dessert, i) => {
              <CardHome
                key={i}
                id={dessert._id}
                image={dessert.image}
                name={dessert.name}
                ratings={dessert.ratings}
                origin={dessert.origin}
                ingredients={dessert.ingredients}
                price={dessert.price}
              />;
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Home;
