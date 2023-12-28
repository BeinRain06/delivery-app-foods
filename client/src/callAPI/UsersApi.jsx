import React, { useContext } from "react";
import { ACTIONS_TYPES, MealContext } from "../context/MealsContext";
import axios from "axios";

export async function userRegistering(
  name,
  password,
  city,
  street,
  country,
  phone,
  email
) {
  try {
    const {
      state: { user },
      handleUser,
    } = useContext(MealContext);

    let userIdentity;

    let api_url = "http://localhost:5000/api/delivery/users/register";

    const res = await axios.post(api_url, {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      data: {
        name: name,
        password: password,
        city: city,
        street: street,
        country: country,
        phone: phone,
        email: email,
      },
    });

    userIdentity = res.data.data;
    console.log(userIdentity);

    handleUser(userIdentity);
  } catch (err) {
    console.log(err);
  }
}

export async function userLogging(email, password) {
  try {
    const {
      state: { user },
      handleUser,
    } = useContext(MealContext);

    let userIdentity;
    let token;

    let api_url = "http://localhost:5000/api/delivery/users/login";

    const res = await axios.post(api_url, {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      data: {
        user: email,
        password: password,
      },
    });

    userIdentity = res.data.data.user;
    token = res.data.data.token;

    console.log(userIdentity);

    // console.log(token);

    handleUser(userIdentity);
  } catch (err) {
    console.log(err);
  }
}
