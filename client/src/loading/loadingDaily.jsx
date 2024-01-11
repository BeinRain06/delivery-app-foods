import React, { useContext, useEffect, useState } from "react";
import { MealContext } from "../context/MealsContext";
import { DailyContext } from "../context/DailyContext";
import { getMeals } from "../callAPI/MealsApi";
import HomeFetchingError from "../../errorBoundary/home_error_boundary";
import moment from "moment";
import "./loading.css";

function LoadingDaily() {
  const {
    state: { lastActiveDay, arrayDayWeeK },
    handleSelectedMeats,
    handleSelectedSeafoods,
    handleSelectedDesserts,
    handleSelectedVegetarians,
    handleLastActiveDay,
    handleActiveDayWeek,
    handleMondayMenu,
  } = useContext(DailyContext);

  const [hasError, setHasError] = useState(false);

  const fetchData = async (indexChange) => {
    const result = await getMeals();
    const meals = result.data.data;
    let desData = [];
    let vegData = [];
    let seaData = [];
    let meatsData = [];

    if (meals) {
      /*   handleMeals(meals); */
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

    /* handleSeaFoods(seaData);
    handleDesserts(desData);
    handleMeats(meatsData);
    handleVegetarians(vegData); */

    console.log("result:", result);

    return { meatsData, seaData, vegData, desData, indexChange };
  };

  const matchSelectMeals = async (callback) => {
    let { meatsData, seaData, vegData, desData, indexChange } = await callback;

    let mySet = new Set();

    mySet.add("Meats").add("Seafoods").add("Vegetarians").add("Desserts");

    let indA1 = meatsData.length / 2;
    let indA2 = meatsData.length - indA1 + 1;

    let indA3 = desData.length / 2;
    let indA4 = desData.length - indA3 + 1;

    let tmpArr1 = [],
      tmpArr2 = [],
      tmpArr = [];

    mySet.forEach(async (item, i) => {
      if (item === "Meats" || item === "Seafoods" || item === "Vegetarians") {
        let count = 3;

        for (let i = 0; i < meatsData.length; i++) {
          if (i <= indA1) {
            item === "Meats" && tmpArr1.push(meatsData[i]);
            item === "Seafoods" && tmpArr1.push(seaData[i]);
            item === "Vegetarians" && tmpArr1.push(vegData[i]);
          } else {
            item === "Meats" && tmpArr2.push(meatsData[i]);
            item === "Seafoods" && tmpArr2.push(seaData[i]);
            item === "Vegetarians" && tmpArr2.push(vegData[i]);
          }
        }

        do {
          let a = Math.floor(Math.random() * (indA1-- + 1));
          let b = Math.floor(Math.random() * (indA2-- + 1));
          tmpArr1.splice(a, 1);
          tmpArr2.splice(b, 1);
          count--;
        } while (count > 0);
        tmpArr = tmpArr1.concat(tmpArr2);

        item === "Meats" && (await handleSelectedMeats(tmpArr));

        item === "Seafoods" && (await handleSelectedSeafoods(tmpArr));
        item === "Vegetarians" && (await handleSelectedVegetarians(tmpArr));

        item === "Meats" &&
          indexChange === 3 &&
          handleMondayMenu((prev) => {
            return { ...prev, meats: tmpArr };
          });

        item === "Seafoods" &&
          indexChange === 3 &&
          handleMondayMenu((prev) => {
            return { ...prev, seafoods: tmpArr };
          });

        item === "Vegetarians" &&
          indexChange === 3 &&
          handleMondayMenu((prev) => {
            return { ...prev, vegetarians: tmpArr };
          });

        tmpArr1 = [];
        tmpArr2 = [];
        tmpArr = [];
      } else if (item === "Desserts") {
        let count = 3;

        for (let i = 0; i < desData.length; i++) {
          if (i <= indA3) {
            item === "Meats" && tmpArr1.push(mesData[i]);
            item === "Seafoods" && tmpArr1.push(seaData[i]);
            item === "Vegetarians" && tmpArr1.push(vegData[i]);
          } else {
            item === "Meats" && tmpArr2.push(mesData[i]);
            item === "Seafoods" && tmpArr2.push(seaData[i]);
            item === "Vegetarians" && tmpArr2.push(vegData[i]);
          }
        }

        do {
          let a = Math.floor(Math.random() * (indA3-- + 1));
          let b = Math.floor(Math.random() * (indA4-- + 1));
          tmpArr1.splice(a, 1);
          tmpArr2.splice(b, 1);
          count--;
        } while (count > 0);

        tmpArr = tmpArr1.concat(tmpArr2);

        item === "Desserts" && (await handleSelectedDesserts(tmpArr));

        item === "Desserts" &&
          indexChange === 3 &&
          handleMondayMenu((prev) => {
            return { ...prev, desserts: tmpArr };
          });

        tmpArr1 = [];
        tmpArr2 = [];
        tmpArr = [];
      }
    });
  };

  const updateArrayAndActiveDay = () => {
    arrayDayWeeK.map(async (newDay, i) => {
      if (newDay.day === moment().format("ddd")) {
        let newActiveDay = {
          day: moment().format("ddd"),
          isActive: true,
          index: i,
        };

        if (i === 3) {
        }

        const prevIndex = lastActiveDay.index;
        const nextIndex = newActiveDay.index;
        let newChange = {
          ...arrayDayWeeK,
          [prevIndex]: { ...arrayDayWeeK[prevIndex], isActive: false },
          [nextIndex]: { ...arrayDayWeeK[nextIndex], isActive: true },
        };

        handleLastActiveDay(newActiveDay);
        handleActiveDayWeek(newChange);
      }
    });
  };

  const grabAllTypesMeals = async () => {
    if (
      lastActiveDay.day === moment().format("ddd") &&
      lastActiveDay.day === "Mon"
    ) {
      if (mondayMenu.length === 0) {
        const result = await fetchData((indexChange = 0));
        const sendRes = result.data.data;
        return sendRes;
      } else {
        setTimeout(async () => {
          await handleSelectedMeats(mondayMenu.meats);
          await handleSelectedSeafoods(mondayMenu.seafoods);
          await handleSelectedVegetarians(mondayMenu.vegetarians);
          await handleSelectedDesserts(mondayMenu.desserts);
        }, 3000);
      }
    } else if (lastActiveDay.day !== moment().format("ddd")) {
      let indexChange = lastActiveDay.index;
      updateArrayAndActiveDay();

      const result = await fetchData(indexChange);
      console.log("result data:", result);

      return result;
    }
  };

  useEffect(() => {
    try {
      const resolveSelectedMeals = async () => {
        await matchSelectMeals(grabAllTypesMeals());
        console.log("Successfully Meals Selections... !");
      };

      setTimeout(() => {
        resolveSelectedMeals();
      }, 3000);
    } catch (err) {
      console.log(err);
      setHasError(true);
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

export default LoadingDaily;
