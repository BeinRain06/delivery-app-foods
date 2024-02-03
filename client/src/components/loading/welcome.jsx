import React from "react";
import { NavLink } from "react-router-dom";

import "./welcome.css";

function Welcome() {
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
