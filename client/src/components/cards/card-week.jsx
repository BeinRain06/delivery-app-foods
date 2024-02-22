import React from "react";
import moment from "moment";
import "./card-week.css";

function CardWeek({ ...props }) {
  let i = +props.id;
  /*  let current = moment().startof("week").add(i, "days"); */
  /* console.log("first day :", moment.weekdays(0)); */
  let current = moment().add(i, "days");

  let activeClass = i === 0 ? "active_day day_week" : "day_week";

  return (
    <li
      id={props.id}
      className="weeks_day_li"
      data-value={current.format("MMM D")}
      onClick={(e) => handleDayShift(e)}
    >
      <span className={activeClass}>{current.format("ddd")} </span>
      <span className="day_count">{current.format("DD")} </span>
    </li>
  );
}

export default CardWeek;
