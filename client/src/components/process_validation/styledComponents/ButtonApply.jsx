import React, { useRef, useContext } from "react";
import styled from "styled-components";
import { TemplateContext } from "../../../services/context/TemplateContext";
import ValidationContext from "../../../services/context/ValidationContext";
import { devices } from "./devices";

const ButtonA = styled.button`
  padding: 0.25em 1em;
  /*  font-size: clamp(0.7rem, 1.25rem, 1.3rem); */
  border: 2px solid #fff;
  border-radius: 5px;
  background-color: #1c7e4d;
  @media ${devices.mobileXtraMini} {
    font-size: 0.88rem;
  }
  @media ${devices.mobileMiniS} {
    font-size: clamp(0.7rem, 1rem, 1.3rem);
  }
`;

const ButtonB = styled.button.attrs(() => ({}))`
  position: relative;
  right: 2rem;
  padding: 0.25em 1em;
  margin: 1rem;
  color: #fff;
  background-color: #636262;
  font-size: clamp(0.72rem, 0.84rem, 1rem);
  display: block;
  float: right;
  border-radius: 24px;
  border: 2px solid #555353;
  transition: all 1s ease-in-out;

  &:hover {
    color: #f5f5e5;
    background-color: #333;
    border: 2px solid #fff;
    animation: minimizeText 700ms ease-in-out 1s forwards;
  }

  @media ${devices.mobileXtraMini} {
    width: 96%;
  }
  @media ${devices.mobileMiniS} {
    width: 70%;
  }
`;

function ButtonApply() {
  const {
    state: { applyText },
  } = useCintext(ValidationContext);
  if (applyText === "Apply") return <ButtonA>Apply</ButtonA>;

  if (applyText === "Minimize") return <ButtonB>minimize</ButtonB>;
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
