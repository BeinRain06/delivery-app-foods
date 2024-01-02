import React, { useContext, useEffect } from "react";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import FoodsDay from "./components/FoodsDay.jsx";
import Favourites from "./components/Favourites.jsx";
import Orders from "./components/Orders.jsx";
import Events from "./components/Events.jsx";
import SearchMeals from "./components/SearchMeals.jsx";
import { getAllTypesFoods } from "./callAPI/MealsApi.jsx";
import { TemplateContext } from "./context/TemplateContext.jsx";

import "./App.css";

function App() {
  const {
    state: { isNewLocation },
    useAsyncGenerator,
  } = useContext(TemplateContext);

  useEffect(() => {
    const getAllMeals = useCallback(async () => {
      let tmpResArray = [0, 1, 2, 3, 4];
      await tmpResArray.map((item) => {
        useAsyncGenerator(getAllTypesFoods);
      });
    }, []);
    console.log(getAllMeals());
  }, []);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="day" element={<FoodsDay />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="orders" element={<Orders />} />
        <Route path="events" element={<Events />} />
        {/*         <Route path="events" element={<SearchMeals />} /> */}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

const NoMatch = () => {
  return (
    <div
      style={{
        padding: "1rem 0",
        display: "flex",
        justifyContent: "center",
        fontSize: "18px",
        fontWeight: "bold",
      }}
    >
      Error 404. Page Not Found !
    </div>
  );
};

export default App;
