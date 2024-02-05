import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  templateActions,
  orderSpecsCurrent_section,
} from "../../services/redux/createslice/TemplateSlice";

import "./card-order.css";

function CardOrder({ ...props }) {
  /*  const {
    state: { meals, orderSpecs },
    handleClear,
    handleDecrease,
    handleIncrease,
  } = useContext(MealContext); */

  const dispatch = useDispatch();
  const orderSpecsCurrentFromTemplateSlice = useSelector(
    orderSpecsCurrent_section
  );
  const [newQty, setNewQty] = useState(0);

  // branching your data to Local Storage
  const appState = JSON.parse(localStorage.getItem("appState"));
  const orderSpecsCurrent = appState.orderPrime.orderSpecsCurrent;

  const mealId = props.id;

  const removeMeal = (id) => {
    dispatch(templateActions.handleDecrease(id));
  };

  const addMeal = (id) => {
    dispatch(templateActions.handleIncrease(id));
  };

  const clearMeal = (id) => {
    dispatch(templateActions.handleClear(id));
  };

  useEffect(() => {
    const newQuantity = orderSpecsCurrent.map((item, i) => {
      if (item.meal === props.id) {
        return item.quantity;
      }
    });
    setNewQty(() => newQuantity);
  }, [orderSpecsCurrentFromTemplateSlice]);

  return (
    <li className="keeping_table">
      <div className="dish_table">
        <div className="dish_topic">
          <p className="dish_current_name">{props.name}</p>
          <p>
            <span> Orders :</span>
            <span className="number_order">{newQty}</span>
          </p>
        </div>
        <div className="dish_country">{props.origin}</div>
        <div className="dish_sub_opering ">
          <div className="clearing ">
            <button
              type="button"
              id="btn_clear"
              className=" btn_subCard btn_clear "
              onClick={() => clearMeal(mealId)}
            >
              clear
            </button>
          </div>
          <div className="adjust_order ">
            <button
              type="button"
              id="remove_meal"
              className="btn_subCard remove_meal"
              onClick={() => removeMeal(mealId)}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <button
              type="button"
              id="add_meal"
              className="btn_subCard add_meal"
              onClick={() => addMeal(mealId)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="dish_consumed">
          <p>Notes :{props.ratings} </p>

          <p className="dish_price">Price: ${props.price} </p>
        </div>

        <div className="brief_over_meal">
          <div className="brief_img">
            <img
              src={props.image}
              className="dish_order_img"
              alt="oops overview"
            />
          </div>
          <p className="dish_order_desc">Description: {props.origin}</p>
        </div>
      </div>
    </li>
  );
}

export default CardOrder;
