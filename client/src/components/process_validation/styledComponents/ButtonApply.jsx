import React, { useRef, useContext } from "react";
import styled from "styled-components";
import { TemplateContext } from "../../../services/context/TemplateContext";

const Button = styled.button`
  padding: 0.25em 1em;
  font-size: clamp(0.84rem, 1.25rem, 1.3rem);
  border: 2px solid #fff;
  border-radius: 5px;
  background-color: #1c7e4d;
`;

function ButtonApply() {
  const { handleNewLocation } = useContext(TemplateContext);

  const minimizeOrApplyRef = useRef(null);

  const openToNewLocation = () => {
    if (minimizeOrApplyRef.current.textContent === "Apply") {
      handleNewLocation(true);
    } else if (minimizeOrApplyRef.current.textContent === "Minimize") {
      ticketTempRef.current.style.classList.add("anim_hide_template");

      // add anim show bookOrder
      ticketManualRef.current.style.classList.add("anim_show_book");
    }
  };

  return (
    <Button onClick={openToNewLocation} ref={minimizeOrApplyRef}>
      Apply
    </Button>
  );
}

/* function ButtonApply() {
  return (
    <button
      type="button"
      className="btn_apply_order"
      onClick={openToNewLocation}
      ref={minimizeOrApplyRef}
    >
      Apply
    </button>
  );
} */

export default ButtonApply;
