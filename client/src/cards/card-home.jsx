import React, { useContext } from "react";

import { MealContext } from "../context/MealsContext";
import "./card-home.css";

function CardHome({ ...props }) {
  const {
    state: { meals, meats, seaFoods, vegetarians, desserts },
    handleUpstreamOrder,
  } = useContext(MealContext);

  return (
    <li className="dishGiven" onClick={() => console.log(e.target)}>
      <div className="dish_content flex-row">
        <img src={props.image} className="my_dish_img" alt="dish missing" />
        {/* <div className="my_dish_img"></div> */}

        <div className="spec_meal">
          <p className="name_meal">{props.name} </p>
          <div>
            <ul className="rate_content">
              <li>ratings:{props.ratings} </li>
              <li className="ratings">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-regular fa-star-half-stroke"></i>
              </li>
            </ul>
          </div>
        </div>
        <div className="spec_country">
          <p>{props.origin}</p>
        </div>
        <div className="spec_ingredients">
          <div className="side_ing">
            <span className="title_ing">Ingredients</span>
            <ul className="ingredients_used .flex-row ">
              {props.ingredients.split().map((ingredient) => {
                return <li>{ingredient}</li>;
              })}
            </ul>
          </div>
          <div className="side_order flex-column">
            <ul className="side_ct_order flex-column">
              <li>
                <p className="dish_price">${props.price}</p>
              </li>
              <li onClick={handleUpstreamOrder}>
                <button type="button" className=" btn btn_order">
                  Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CardHome;
