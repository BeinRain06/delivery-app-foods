import React from "react";
import { Outlet, NavLink } from "react-router-dom";
/* import styled, { keyframes } from "styled-components"; */
import "./Layout.css";

/* this Layout component is mainly created to apply general css style  for to each link : day, favourites, order, events ... , it represents the div box of each NavLInk located in  Navigation.jsx*/

function Layout() {
  const styleNavLink = ({ isActive }) => {
    const styleOne = {
      padding: "0.15rem 0.5rem",
      color: "#333",
      backgroundColor: "#eee",
      fontSize: "12px",
      border: "1px solid transparent",
      borderRadius: "12px",
      textDecoration: "none",
      transition: "all 450ms ease-in-out",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    const styleTwo = {
      padding: "0.15rem 0.5rem",
      color: "#fff",
      backgroundColor: "#1c7e4d",
      fontSize: "12px",
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
    <>
      <nav className="nav_menu">
        <ul className="space_brand">
          <li className="icon_menu_open">
            {/* <i className="fa-solid fa-bars"></i> */}
            <div className="logo_brand">
              <span>T</span>
              <span>D</span>
              <span>S</span>
            </div>
          </li>
          <li className="name_brand">
            <span>Top</span>
            <span style={{ color: "#1c7e4d" }}>Dis</span>
            <span>hes</span>
          </li>
        </ul>
        <ul className="space_search">
          <li className="field_input">
            <input
              type="text"
              name="meal"
              id="meal_input"
              className="meal_input"
              placeholder="search Meal"
            />
          </li>
          <li className="search_btn">
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ color: "#e1ebe6" }}
            ></i>
          </li>
        </ul>
        <div className="link_content">
          <ul className="tags_menu">
            <NavLink to="/day" style={styleNavLink}>
              daily
            </NavLink>
            <NavLink to="/favourites" style={styleNavLink}>
              favourites
            </NavLink>
            <NavLink to="/" style={styleNavLink}>
              home
            </NavLink>
            <NavLink to="/orders" style={styleNavLink}>
              orders
            </NavLink>
            <NavLink to="/events" style={styleNavLink}>
              events
            </NavLink>
          </ul>
        </div>
      </nav>

      <main className="main_content">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
