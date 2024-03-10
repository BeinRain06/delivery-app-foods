import React, { useRef, useEffect, useContext, useState } from "react";
import { TemplateContext } from "../../services/context/TemplateContext";
import { MealContext } from "../../services/context/MealsContext";
import { ValidationContext } from "../../services/context/ValidationContext";
import moment from "moment";
import "./card-week.css";

function CardWeek({ id, className, setUpdateClassName }) {
  const {
    state: { indexDayFormat },
    handleIndexDayShift,
  } = useContext(MealContext);

  const [prevActiveDay, setPrevActiveDay] = useState(indexDayFormat);

  const [currentDay, setCurrentDay] = useState(
    moment().weekday(+id).format("ddd")
  );

  const spanRef = useRef(null);

  const handleWhileShiftingDay = (e) => {
    setUpdateClassName("day_week"); // all class reset default;

    const dayOnClick = e.target.getAttribute("data-value");

    if (dayOnClick !== prevActiveDay) {
      spanRef.current.classList.add("active_day");

      const newPrevActiveDay = moment().weekday(+id).format("ddd");

      handleIndexDayShift(newPrevActiveDay);

      setPrevActiveDay(newPrevActiveDay);
    }
  };

  useEffect(() => {
    const chooseClassName = +id === 1 ? "active_day day_week" : "day_week";
    setUpdateClassName(chooseClassName);
    console.log("current day:", currentDay);
  }, []);

  return (
    <li
      id={id}
      className="weeks_day_li"
      data-value={setCurrentDay}
      onClick={(e) => handleWhileShiftingDay(e)}
    >
      <span className={className} ref={spanRef}>
        {currentDay}
      </span>
      <span className="day_count">{moment().weekday(+id).format("DD")} </span>
    </li>
  );
}

export default CardWeek;
