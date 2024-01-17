import React, { useContext } from "react";
import axios from "axios";
import { obtainUser } from "../context/MealsContext";

import {
  affectThisOrder,
  grabOrderSpecsCurrent,
} from "../context/TemplateContext";

export async function initiateOrder() {
  try {
    const user = obtainUser();

    const handleThisFnOrder = async (setThisOrder) => {
      const setnewChange = await affectThisOrder().handleThisOrder(
        setThisOrder
      );
    };

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

    const thisOrder = await res.data.data;

    console.log(thisOrder);

    handleThisFnOrder(order);

    return thisOrder;

    // console.log(token);
  } catch (err) {
    console.log(err);
  }
}

export async function updateThisLocationOrder(phone, city, street) {
  try {
    const thisVarOrder = affectThisOrder().thisOrder;

    const handleThisFnOrder = async (setThisOrder) => {
      const setnewChange = await affectThisOrder().handleThisOrder(
        setThisOrder
      );
    };

    const orderId = thisVarOrder._id;

    let api_url = "http://localhost:5000/api/delivery/orders/order/newlocation";

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

    const order = res.data.data;

    handleThisFnOrder(order);

    console.log(order);

    // console.log(token);

    handleThisFnOrder(order);
  } catch (err) {
    console.log(err);
  }
}

export async function updateThisTotalPriceOrder() {
  try {
    const orderSpecsCurrent = grabOrderSpecsCurrent();

    const thisVarOrder = affectThisOrder().thisOrder;

    const handleThisFnOrder = async (setThisOrder) => {
      const setnewChange = await affectThisOrder().handleThisOrder(
        setThisOrder
      );
    };

    const orderId = thisVarOrder._id;

    let api_url = "http://localhost:5000/api/delivery/orders/order";

    const res = await axios.put(`${api_url}/${orderId}`, {
      method: "put",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      data: {
        orderSpecs: orderSpecsCurrent,
      },
    });

    const order = res.data.data;
    await handleThisFnOrder(order);

    return order;
  } catch (err) {
    console.log(err);
  }
}
