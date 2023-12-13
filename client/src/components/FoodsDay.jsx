import { AhmadIMG, SHAWNAN, MTN, ORANGE } from "../assets/images";
import "./FoodsDay.css";
import React from "react";

function FoodsDay() {
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
              <li>
                <div className="square_box"></div>
              </li>
              <li>
                <div className="square_box"></div>
              </li>
            </ul>
            <ul className="content_menu_day snaps_inline">
              <li className="menu_scarf">
                <div className="dish_table">
                  <img
                    src={AhmadIMG}
                    className="color_dish"
                    alt="food of the day"
                  />
                  <div className="scarf_flag">
                    <p className="scarf_text">Jutsu Chicken</p>
                  </div>
                </div>
              </li>
              <li className="menu_scarf">
                <div className="dish_table">
                  <img
                    src={AhmadIMG}
                    className="color_dish"
                    alt="food of the day"
                  />
                </div>
              </li>
              <li className="menu_scarf">
                <div className="dish_table">
                  <img
                    src={AhmadIMG}
                    className="color_dish"
                    alt="food of the day"
                  />
                </div>
              </li>
              <li className="menu_scarf">
                <div className="dish_table">
                  <img
                    src={AhmadIMG}
                    className="color_dish"
                    alt="food of the day"
                  />
                </div>
              </li>
              <li className="menu_scarf">
                <div className="dish_table">
                  <img
                    src={AhmadIMG}
                    className="color_dish"
                    alt="food of the day"
                  />
                </div>
              </li>
              <li className="menu_scarf">
                <div className="dish_table">
                  <img
                    src={AhmadIMG}
                    className="color_dish"
                    alt="food of the day"
                  />
                </div>
              </li>
            </ul>

            <div className=" showcase_mobile_wrapper showcase_dish ">
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
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dolore
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
                        <div className="ordering">
                          <button className="btn btn_order">Order</button>
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
                      <div className="dish_desc">
                        <div className="dish_mini_desc">
                          <p className="title_desc">Description</p>
                          <p className="description_dish">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dolore
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
                        <div className="ordering">
                          <button className="btn btn_order">Order</button>
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
                      <div className="dish_desc">
                        <div className="dish_mini_desc">
                          <p className="title_desc">Description</p>
                          <p className="description_dish">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dolore
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
                        <div className="ordering">
                          <button className="btn btn_order">Order</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="showcase_wrapper_desktop">
              <div className="showcase_center_wrap flex-row">
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
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default FoodsDay;
