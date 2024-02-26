import React, { useRef, useContext, useState } from "react";
import { TemplateContext } from "../../services/context/TemplateContext";
import { MealContext } from "../../services/context/MealsContext";
import { ValidationContext } from "../../services/context/ValidationContext";
import moment from "moment";
import "./card-week.css";

function CardWeek({ id }) {
  let i = +id;
  let current = moment().weekday(i);

  const { handleIndexWeekDay } = useContext(ValidationContext);

  const [prevActiveDay, setPrevActiveDay] = useState(null);

  const [className, setUpdateClassName] = useState(() => {
    const className = i === 0 ? "active_day day_week" : "day_week";
    return className;
  });

  const spanRef = useRef(null);

  const handleWhileShiftingDay = (e) => {
    setUpdateClassName("day_week");
    const dayOnClick = e.target.getAttribute("data-value");

    if (dayOnClick !== prevActiveDay) {
      spanRef.current.classList.add("active_day");
      prevActiveDay.classList.remove("active_day");
      handleIndexWeekDay(+id);
      setPrevActiveDay(spanRef.current);
    }
  };

  return (
    <li
      id={id}
      className="weeks_day_li"
      data-value={current.format("MMM D")}
      onClick={(e) => handleWhileShiftingDay(e)}
    >
      <span className={className} ref={spanRef}>
        {current.format("ddd")}
      </span>
      <span className="day_count">{current.format("DD")} </span>
    </li>
  );
}

export default CardWeek;
