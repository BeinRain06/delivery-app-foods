import React, { useState, useContext, useEffect } from "react";
import { MealContext } from "../context/MealsContext.jsx";
import { DailyContext } from "../context/DailyContext.jsx";
import { getMeals } from "../callAPI/MealsApi.jsx";
import HomeFetchingError from "../../errorBoundary/home_error_boundary.jsx";
import "./loading.css";

function Loading() {
  const {
    handleMeals,
    handleMeats,
    handleSeaFoods,
    handleVegetarians,
    handleDesserts,
    handleWelcome,
  } = useContext(MealContext);

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

  useEffect(() => {
    try {
      const insureFetchData = async () => {
        await fetchData();
        await handleWelcome(false);
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
    <div className="loading_wrapper">
      <ul className="loading_content">
        <li>
          <span className="loading_text">Loading</span>
        </li>
        <li className="classic_circ">
          <span className=" circ_red"></span>
          <span className=" circ_green"></span>
          <span className=" circ_blue"></span>
        </li>
      </ul>
    </div>
  );
}

export default Loading;
