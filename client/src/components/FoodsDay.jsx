import React, { useReducer, useContext } from "react";
import { MealContext, ACTIONS_TYPES } from "../context/MealsContext";
import moment from "moment";
import { AhmadIMG, SHAWNAN, MTN, ORANGE } from "../assets/images";
import "./FoodsDay.css";

function FoodsDay() {
  const {
    state: { meals },
    handleUpstreamOrder,
  } = useContext(MealContext);

  return (
    <main className="welcome_day">
      <div className="day_page_wrapper">
        <p className="gen_title_day title_page">Day's Menu</p>
        <section id="meats_matching" className="foods_matching">
          <div className="template_food_day">
            <p className="gen_title_day title_category">Meats</p>
            <ul className="square_indicator">
              <li>
                <div className="square_box"></div>
              </li>
              <li>
                <div className="square_box"></div>
              </li>
              <li>
                <div className="square_box"></div>
              </li>
              <li>
                <div className="square_box"></div>
              </li>
            </ul>
            <ul className="on_top_mini">
              <li className="min_showcase">
                <div className="mini_meal_img">
                  <div className="box_mini_img">
                    <p className="side_name_img">Jutsu Chicken</p>
                  </div>
                  <img
                    src={AhmadIMG}
                    alt="no_img_here"
                    className="img_day_top"
                  />
                </div>
              </li>
              <li className="min_showcase">
                <div className="mini_meal_img">
                  <div className="box_mini_img">
                    <p className="side_name_img">Jutsu Chicken</p>
                  </div>
                  <img
                    src={AhmadIMG}
                    alt="no_img_here"
                    className="img_day_top"
                  />
                </div>
              </li>
              <li className="min_showcase">
                <div className="mini_meal_img">
                  <div className="box_mini_img">
                    <p className="side_name_img">Jutsu Chicken</p>
                  </div>
                  <img
                    src={AhmadIMG}
                    alt="no_img_here"
                    className="img_day_top"
                  />
                </div>
              </li>
              <li className="min_showcase">
                <div className="mini_meal_img">
                  <div className="box_mini_img">
                    <p className="side_name_img">Jutsu Chicken</p>
                  </div>
                  <img
                    src={AhmadIMG}
                    alt="no_img_here"
                    className="img_day_top"
                  />
                </div>
              </li>
              <li className="min_showcase">
                <div className="mini_meal_img">
                  <div className="box_mini_img">
                    <p className="side_name_img">Jutsu Chicken</p>
                  </div>
                  <img
                    src={AhmadIMG}
                    alt="no_img_here"
                    className="img_day_top"
                  />
                </div>
              </li>
              <li className="min_showcase">
                <div className="mini_meal_img">
                  <div className="box_mini_img">
                    <p className="side_name_img">Jutsu Chicken</p>
                  </div>
                  <img
                    src={AhmadIMG}
                    alt="no_img_here"
                    className="img_day_top"
                  />
                </div>
              </li>
            </ul>

            <div className=" showcase_mobile_wrapper showcase_dish ">
              <ul className="listing_mob_dish">
                <div className="show_ray_wrapper">
                  <div>
                    <div>
                      <div className="show_content_dish">
                        <div className="dish_frame">
                          <img
                            src={AhmadIMG}
                            className="dish_img"
                            alt="show dish missing"
                          />
                          <p className="dish_name">Jutsu Chicken</p>
                        </div>
                        <div className="centralize_info_dish">
                          <div className="dish_desc">
                            <div className="dish_mini_desc">
                              <p className="title_desc">Description</p>
                              <p className="description_dish">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Dolore
                              </p>
                            </div>
                            <div className="dish_bill">
                              <p className="dish_price">$10</p>
                            </div>
                          </div>
                          <div className="dish_order">
                            <div className="dish_ingredients flex-column">
                              <p className="title_ingredients">Ingredients</p>
                              <p className="some_ingredients">
                                tomatoes, onions, celeries
                              </p>
                            </div>
                            <div
                              className="ordering"
                              data-mealid="807422223401239"
                              data-mealname="egyptian_fattah"
                              data-price="7.45"
                            >
                              <button
                                className="btn btn_order"
                                onClick={handleUpstreamOrder}
                              >
                                Order
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="show_ray_wrapper">
                  <div>
                    <div>
                      <div className="show_content_dish">
                        <div className="dish_frame">
                          <img
                            src={AhmadIMG}
                            className="dish_img"
                            alt="show dish missing"
                          />
                          <p className="dish_name">Jutsu Chicken</p>
                        </div>
                        <div className="centralize_info_dish">
                          <div className="dish_desc">
                            <div className="dish_mini_desc">
                              <p className="title_desc">Description</p>
                              <p className="description_dish">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Dolore
                              </p>
                            </div>
                            <div className="dish_bill">
                              <p className="dish_price">$10</p>
                            </div>
                          </div>
                          <div className="dish_order">
                            <div className="dish_ingredients flex-column">
                              <p className="title_ingredients">Ingredients</p>
                              <p className="some_ingredients">
                                tomatoes, onions, celeries
                              </p>
                            </div>
                            <div
                              className="ordering"
                              data-mealid="807422223401239"
                              data-mealname="egyptian_fattah"
                              data-price="7.45"
                            >
                              <button
                                className="btn btn_order"
                                onClick={handleUpstreamOrder}
                              >
                                Order
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="show_ray_wrapper">
                  <div>
                    <div>
                      <div className="show_content_dish">
                        <div className="dish_frame">
                          <img
                            src={AhmadIMG}
                            className="dish_img"
                            alt="show dish missing"
                          />
                          <p className="dish_name">Jutsu Chicken</p>
                        </div>
                        <div className="centralize_info_dish">
                          <div className="dish_desc">
                            <div className="dish_mini_desc">
                              <p className="title_desc">Description</p>
                              <p className="description_dish">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Dolore
                              </p>
                            </div>
                            <div className="dish_bill">
                              <p className="dish_price">$10</p>
                            </div>
                          </div>
                          <div className="dish_order">
                            <div className="dish_ingredients flex-column">
                              <p className="title_ingredients">Ingredients</p>
                              <p className="some_ingredients">
                                tomatoes, onions, celeries
                              </p>
                            </div>
                            <div
                              className="ordering"
                              data-mealid="807422223401239"
                              data-mealname="egyptian_fattah"
                              data-price="7.45"
                            >
                              <button
                                className="btn btn_order"
                                onClick={handleUpstreamOrder}
                              >
                                Order
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </div>

            <div className="showcase_wrapper_desktop">
              <div className="showcase_center_wrap flex-row">
                <div className="this_day">
                  <p className="actual_date">
                    <span className="calling">
                      This {moment().format("dddd")} ,
                    </span>
                    <span
                      className="underlined_day_part"
                      style={{ textDecoration: "underline" }}
                    >
                      {moment().format("MMMM Do YYYY")}
                    </span>
                  </p>
                </div>
                <ul className="showcase_content_desktop">
                  <li className="each_day_dish flex-row">
                    <div className="showcase_dish">
                      <div className="show_ray_wrapper">
                        <div>
                          <div>
                            <div className="show_content_dish">
                              <div className="dish_frame">
                                <img
                                  src={AhmadIMG}
                                  className="dish_img"
                                  alt="show dish missing"
                                />
                                <p className="dish_name">Jutsu Chicken</p>
                              </div>
                              <div className="dish_desc">
                                <div className="dish_mini_desc">
                                  <p className="title_desc">Description</p>
                                  <p className="description_dish">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Dolore
                                  </p>
                                </div>
                                <div className="dish_bill">
                                  <p className="dish_price">$10</p>
                                </div>
                              </div>
                              <div className="dish_order">
                                <div className="dish_ingredients flex-column">
                                  <p className="title_ingredients">
                                    Ingredients
                                  </p>
                                  <p className="some_ingredients">
                                    tomatoes, onions, celeries
                                  </p>
                                </div>
                                <div className="ordering">
                                  <button className="btn btn_order">
                                    Order
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="each_day_dish flex-row">
                    <div className="showcase_dish">
                      <div className="show_ray_wrapper">
                        <div>
                          <div>
                            <div className="show_content_dish">
                              <div className="dish_frame">
                                <img
                                  src={AhmadIMG}
                                  className="dish_img"
                                  alt="show dish missing"
                                />
                                <p className="dish_name">Jutsu Chicken</p>
                              </div>
                              <div className="dish_desc">
                                <div className="dish_mini_desc">
                                  <p className="title_desc">Description</p>
                                  <p className="description_dish">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Dolore
                                  </p>
                                </div>
                                <div className="dish_bill">
                                  <p className="dish_price">$10</p>
                                </div>
                              </div>
                              <div className="dish_order">
                                <div className="dish_ingredients flex-column">
                                  <p className="title_ingredients">
                                    Ingredients
                                  </p>
                                  <p className="some_ingredients">
                                    tomatoes, onions, celeries
                                  </p>
                                </div>
                                <div className="ordering">
                                  <button className="btn btn_order">
                                    Order
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="each_day_dish flex-row">
                    <div className="showcase_dish">
                      <div className="show_ray_wrapper">
                        <div>
                          <div>
                            <div className="show_content_dish">
                              <div className="dish_frame">
                                <img
                                  src={AhmadIMG}
                                  className="dish_img"
                                  alt="show dish missing"
                                />
                                <p className="dish_name">Jutsu Chicken</p>
                              </div>
                              <div className="dish_desc">
                                <div className="dish_mini_desc">
                                  <p className="title_desc">Description</p>
                                  <p className="description_dish">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Dolore
                                  </p>
                                </div>
                                <div className="dish_bill">
                                  <p className="dish_price">$10</p>
                                </div>
                              </div>
                              <div className="dish_order">
                                <div className="dish_ingredients flex-column">
                                  <p className="title_ingredients">
                                    Ingredients
                                  </p>
                                  <p className="some_ingredients">
                                    tomatoes, onions, celeries
                                  </p>
                                </div>
                                <div className="ordering">
                                  <button className="btn btn_order">
                                    Order
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="each_day_dish flex-row">
                    <div className="showcase_dish">
                      <div className="show_ray_wrapper">
                        <div>
                          <div>
                            <div className="show_content_dish">
                              <div className="dish_frame">
                                <img
                                  src={AhmadIMG}
                                  className="dish_img"
                                  alt="show dish missing"
                                />
                                <p className="dish_name">Jutsu Chicken</p>
                              </div>
                              <div className="dish_desc">
                                <div className="dish_mini_desc">
                                  <p className="title_desc">Description</p>
                                  <p className="description_dish">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Dolore
                                  </p>
                                </div>
                                <div className="dish_bill">
                                  <p className="dish_price">$10</p>
                                </div>
                              </div>
                              <div className="dish_order">
                                <div className="dish_ingredients flex-column">
                                  <p className="title_ingredients">
                                    Ingredients
                                  </p>
                                  <p className="some_ingredients">
                                    tomatoes, onions, celeries
                                  </p>
                                </div>
                                <div className="ordering">
                                  <button className="btn btn_order">
                                    Order
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="each_day_dish flex-row">
                    <div className="showcase_dish">
                      <div className="show_ray_wrapper">
                        <div>
                          <div>
                            <div className="show_content_dish">
                              <div className="dish_frame">
                                <img
                                  src={AhmadIMG}
                                  className="dish_img"
                                  alt="show dish missing"
                                />
                                <p className="dish_name">Jutsu Chicken</p>
                              </div>
                              <div className="dish_desc">
                                <div className="dish_mini_desc">
                                  <p className="title_desc">Description</p>
                                  <p className="description_dish">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Dolore
                                  </p>
                                </div>
                                <div className="dish_bill">
                                  <p className="dish_price">$10</p>
                                </div>
                              </div>
                              <div className="dish_order">
                                <div className="dish_ingredients flex-column">
                                  <p className="title_ingredients">
                                    Ingredients
                                  </p>
                                  <p className="some_ingredients">
                                    tomatoes, onions, celeries
                                  </p>
                                </div>
                                <div className="ordering">
                                  <button className="btn btn_order">
                                    Order
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="each_day_dish flex-row">
                    <div className="showcase_dish">
                      <div className="show_ray_wrapper">
                        <div>
                          <div>
                            <div className="show_content_dish">
                              <div className="dish_frame">
                                <img
                                  src={AhmadIMG}
                                  className="dish_img"
                                  alt="show dish missing"
                                />
                                <p className="dish_name">Jutsu Chicken</p>
                              </div>
                              <div className="dish_desc">
                                <div className="dish_mini_desc">
                                  <p className="title_desc">Description</p>
                                  <p className="description_dish">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Dolore
                                  </p>
                                </div>
                                <div className="dish_bill">
                                  <p className="dish_price">$10</p>
                                </div>
                              </div>
                              <div className="dish_order">
                                <div className="dish_ingredients flex-column">
                                  <p className="title_ingredients">
                                    Ingredients
                                  </p>
                                  <p className="some_ingredients">
                                    tomatoes, onions, celeries
                                  </p>
                                </div>
                                <div className="ordering">
                                  <button className="btn btn_order">
                                    Order
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="this_day"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default FoodsDay;
