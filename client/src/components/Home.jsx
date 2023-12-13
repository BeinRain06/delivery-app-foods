import React from "react";
import {
  AdamIMG,
  AhmadIMG,
  MariaIMG,
  AnastasiyaIMG,
  NordwoodIMG,
} from "../assets/images/index.js";
import "./Home.css";

function Home() {
  return (
    <main className="home_container flex-column">
      <div className="welcome"></div>
      <div className="book_show flex-row-start">
        <i className="fa-solid fa-book-open fa-2x"></i>
        <span style={{ color: "#702121" }}>Dishes</span>
      </div>
      <div className="meals_borderplate">
        <div className="meats_meals meals_area">
          <span className="gen_title_right">Meats</span>

          <ul className="meal_content">
            <li className="dish">
              <div className="dish_content flex-row">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used .flex-row ">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order flex-column">
                    <ul className="side_ct_order flex-column">
                      <li>
                        <p className="dish_price">$10</p>
                      </li>
                      <li>
                        <button type="button" className=" btn btn_order">
                          Order
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content flex-row">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used .flex-row ">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order flex-column">
                    <ul className="side_ct_order flex-column">
                      <li>
                        <p className="dish_price">$10</p>
                      </li>
                      <li>
                        <button type="button" className=" btn btn_order">
                          Order
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content flex-row">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used .flex-row ">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order flex-column">
                    <ul className="side_ct_order flex-column">
                      <li>
                        <p className="dish_price">$10</p>
                      </li>
                      <li>
                        <button type="button" className=" btn btn_order">
                          Order
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content flex-row">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used .flex-row ">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order flex-column">
                    <ul className="side_ct_order flex-column">
                      <li>
                        <p className="dish_price">$10</p>
                      </li>
                      <li>
                        <button type="button" className=" btn btn_order">
                          Order
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content flex-row">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used .flex-row ">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order flex-column">
                    <ul className="side_ct_order flex-column">
                      <li>
                        <p className="dish_price">$10</p>
                      </li>
                      <li>
                        <button type="button" className=" btn btn_order">
                          Order
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content flex-row">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used .flex-row ">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order flex-column">
                    <ul className="side_ct_order flex-column">
                      <li>
                        <p className="dish_price">$10</p>
                      </li>
                      <li>
                        <button type="button" className=" btn btn_order">
                          Order
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <ul>
                    <li>ratings: 4.6 </li>
                    <li className="ratings">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-regular fa-star-half-stroke"></i>
                    </li>
                  </ul>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="meats_meals meals_area">
          <span className="gen_title_left">SeaFoods</span>

          <ul className="meal_content">
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="meats_meals meals_area">
          <span className="gen_title_right">Vegetarians</span>

          <ul className="meal_content">
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="meats_meals meals_area">
          <span className="gen_title_center">Desserts</span>

          <ul className="meal_content">
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="dish">
              <div className="dish_content">
                <img
                  src={AnastasiyaIMG}
                  className="my_dish_img"
                  alt="dish missing"
                />

                <div className="spec_meal">
                  <p className="name_meal">jutsu chicken</p>
                  <div>
                    <ul className="rate_content">
                      <li>ratings: 4.6 </li>
                      <li className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="spec_country">
                  <p>Italian</p>
                </div>
                <div className="spec_ingredients">
                  <div className="side_ing">
                    <span className="title_ing">Ingredients</span>
                    <ul className="ingredients_used">
                      <li>Onions </li>
                      <li>Spices </li>
                      <li>Celeries</li>
                    </ul>
                  </div>
                  <div className="side_order">
                    <button type="button" className=" btn btn_order">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Home;
