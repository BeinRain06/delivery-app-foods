import React, { useContext } from "react";
import { ACTIONS_TYPES, MealContext } from "../context/MealsContext";
import axios from "axios";

//FOR POST
export async function postPayment(order, account, codePayment) {
  try {
    const {
      state: { thisOrder },
      handlePayment,
    } = useContext(MealContext);

    let api_url = "http://localhost:5000/api/delivery/payments";
    let status = "non-paid";
    let resultPayment;

    const res = await axios.post(`${api_url}/payment`, {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      data: {
        order: order, // id_order
        account: account,
        codePayment: codePayment,
        status: status,
      },
    });

    resultPayment = res.data.data;

    console.log(resultPayment);
    //send back payment context Api right function
    handlePayment(resultPayment);
  } catch (err) {
    console.log(err);
  }
}
