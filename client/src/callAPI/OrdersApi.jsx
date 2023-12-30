import React, { useContext } from "react";
import axios from "axios";
import { MealContext } from "../context/MealsContext";

export async function initiateOrder() {
  try {
    const {
      state: { user, orderSpecsCurrent },
      handleThisOrder,
    } = useContext(MealContext);

    let api_url = "http://localhost:5000/api/delivery/orders";

    const res = await axios.post(`${api_url}/order`, {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      data: {
        ordersSpecs: orderSpecsCurrent,
        user: user.id,
      },
    });

    order = res.data.data;

    console.log(order);

    // console.log(token);

    handleThisOrder(order);
  } catch (err) {
    console.log(err);
  }
}

export async function updateThisOrder(phone, city, street) {
  try {
    const {
      state: { user, thisOrder },
      handleThisOrder,
    } = useContext(MealContext);

    const orderId = thisOrder._id;

    let api_url = "http://localhost:5000/api/delivery/orders/order";

    const res = await axios.put(`${api_url}/${orderId}`, {
      method: "put",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      data: {
        phone: phone,
        city: city,
        street: street,
      },
    });

    order = res.data.data;

    console.log(order);

    // console.log(token);

    handleThisOrder(order);
  } catch (err) {
    console.log(err);
  }
}
