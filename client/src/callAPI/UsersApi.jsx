import React, { useContext } from "react";
import { ACTIONS_TYPES, MealContext } from "../context/MealsContext";
import { obtainUser } from "../context/MealsContext";
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
    /*   const {
      state: { user },
      handleUser,
    } = useContext(MealContext); */

    const { user, handleUser } = obtainUser();

    let userIdentity;

    let api_url = "http://localhost:5000/api/delivery/users/register";

    const res = await axios.post(
      api_url,

      {
        name: name,
        password: password,
        city: city,
        street: street,
        country: country,
        phone: phone,
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    userIdentity = res.data.data;
    console.log(userIdentity);

    handleUser(userIdentity);
  } catch (err) {
    console.log(err);
  }
}

export async function userLogging(email, password) {
  try {
    /*  const {
      state: { user },
      handleUser,
    } = useContext(MealContext); */

    const { user, handleUser } = obtainUser();

    let userIdentity;

    let api_url = "http://localhost:5000/api/delivery/users/login";

    const res = await axios.post(
      api_url,
      {
        user: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    userIdentity = res.data.data;

    console.log(userIdentity);

    // console.log(token);

    handleUser(userIdentity);
  } catch (err) {
    console.log(err);
  }
}
