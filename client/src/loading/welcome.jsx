import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { MealContext } from "../context/MealsContext";
import HomeFetchingError from "../../errorBoundary/home_error_boundary";

import { getMeals } from "../callAPI/MealsApi";
import "./welcome.css";

function Welcome() {
  const {
    state: { meals, meats, seaFoods, vegetarians, desserts },
    handleUpstreamOrder,
    handleMeals,
    handleMeats,
    handleSeaFoods,
    handleVegetarians,
    handleDesserts,
  } = useContext(MealContext);

  const [welcome, setWelcome] = useState(true);

  const [hasError, setHasError] = useState(false);

  const fetchData = async () => {
    const result = await getMeals();
    const meals = result.data.data;
    let desData = [];
    let vegData = [];
    let seaData = [];
    let meatsData = [];

    if (meals) {
      handleMeals(meals);
      await meals.map((item, i) => {
        if (item.category._id === import.meta.env.VITE_ID_SEAFOODS) {
          seaData.push(item);
        } else if (item.category._id === import.meta.env.VITE_ID_MEATS) {
          meatsData.push(item);
        } else if (item.category._id === import.meta.env.VITE_ID_VEGETARIANS) {
          vegData.push(item);
        } else if (item.category._id === import.meta.env.VITE_ID_DESSERTS) {
          desData.push(item);
        }
      });
    }

    handleSeaFoods(seaData);
    handleDesserts(desData);
    handleMeats(meatsData);
    handleVegetarians(vegData);

    console.log("result:", result);
  };

  const styleNavLink = ({ isActive }) => {
    const styleOne = {
      padding: "0.15rem 0.65rem",
      color: "#fff",
      backgroundColor: "#1c7e4d",
      fontSize: "14px",
      border: "2px solid #fff",
      borderRadius: "12px",
      textDecoration: "none",
      transition: "all 450ms ease-in-out",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    const styleTwo = {
      padding: "0.15rem 0.65rem",
      color: "#fff",
      backgroundColor: "#1c7e4d",
      fontSize: "14px",
      border: "2px solid #fff",
      borderRadius: "12px",
      textDecoration: "none",
      transition: "all 450ms ease-in-out",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    {
      return isActive ? styleTwo : styleOne;
    }
  };

  useEffect(() => {
    try {
      const insureFetchData = async () => {
        await fetchData();
      };

      insureFetchData();
      console.log("123....234");
    } catch (err) {
      console.log(err);
      if (err) setHasError(err.message);
    }
  }, []);

  if (hasError) return <HomeFetchingError error={hasError} />;

  return (
    <div className="welcome_wrapper">
      <ul className="welcome_content">
        <li>
          <p>
            Welcome To our Restaurant <span className="logo_brand">TDS</span> a
            new vibe for your Meals
          </p>
        </li>
        <li className="gate_bridge">
          {/* <button type="button" className="open_door_home">
            see home
          </button> */}
          <NavLink to="/home" style={styleNavLink}>
            see home
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Welcome;
