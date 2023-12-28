import React from "react";
import "./card-order.css";

function CardOrder({ props }) {
  const {
    state: { meals, orderSpecs },
    handleClear,
    handleDecrease,
    handleIncrease,
  } = useContext(MealContext);

  return (
    <li className="keeping_table">
      <div className="dish_table">
        <div className="dish_topic">
          <p>{props.name}</p>
          <p>
            <span> Orders :</span>
            <span className="number_order">{props.quantity}</span>
          </p>
        </div>
        <div className="dish_country">{props.origin}</div>
        <div className="dish_sub_operation ">
          <div className="clearing ">
            <button
              type="button"
              id="btn_clear"
              className=" btn_sub btn_clear "
              onClick={handleClear}
            >
              clear
            </button>
          </div>
          <div className="adjust_order ">
            <button
              type="button"
              id="remove_meal"
              className="btn_sub remove_meal"
              onClick={handleDecrease}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <button
              type="button"
              id="add_meal"
              className="btn_sub add_meal"
              onClick={handleIncrease}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="dish_consumed">
          <p>Notes :{props.ratings} </p>

          <p className="dish_price">Price: ${props.price} </p>
        </div>

        <div className="brief_overview_meal">
          <div className="brief_img">
            <img
              src={AhmadIMG}
              className="dish_order_img"
              alt="oops overview"
            />
          </div>
          <p className="dish_order_desc">Description: Italian</p>
        </div>
      </div>
    </li>
  );
}

export default CardOrder;
