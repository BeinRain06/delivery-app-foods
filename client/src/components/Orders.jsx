import React from "react";
import { AhmadIMG, SHAWNAN, MTN, ORANGE } from "../assets/images";
import "./Orders.css";

{
  /* <i className="fa-solid fa-plus"></i>;
<i className="fa-solid fa-minus"></i>;
<i className="fa-brands fa-cc-paypal"></i> */
}

function Orders() {
  return (
    <main className="welcome_orders">
      <div className="gen_orders">
        <h4 className="title_order">Orders</h4>
        <hr className="breakpoint_orders"></hr>
        <div className="recap_wrapper">
          <ul className="ready_ordered">
            <li className="keeping_table">
              <div className="dish_table">
                <div className="dish_topic">
                  <p>Jutsu Chicken</p>
                  <p>
                    <span> Orders :</span>
                    <span className="number_order">3</span>
                  </p>
                </div>
                <div className="dish_country">Italian</div>
                <div className="dish_sub_operation ">
                  <div className="clearing ">
                    <button
                      type="button"
                      id="btn_clear"
                      className=" btn_sub btn_clear "
                    >
                      clear
                    </button>
                  </div>
                  <div className="adjust_order ">
                    <button
                      type="button"
                      id="remove_meal"
                      className="btn_sub remove_meal"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <button
                      type="button"
                      id="add_meal"
                      className="btn_sub add_meal"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="dish_consumed">
                  <p>Notes :4.6</p>

                  <p className="dish_price">Price: $5</p>
                </div>

                <div className="brief_overview_meal">
                  <div className="brief_img">
                    <img
                      src={AhmadIMG}
                      className="dish_order_img"
                      alt="oops overview"
                    />
                  </div>
                  <p className="dish_order_desc">Description: Italian</p>
                </div>
              </div>
            </li>
            <li className="keeping_table">
              <div className="dish_table">
                <div className="dish_topic">
                  <p>Jutsu Chicken</p>
                  <p>
                    <span> Orders :</span>
                    <span className="number_order">3</span>
                  </p>
                </div>
                <div className="dish_country">Italian</div>
                <div className="dish_sub_operation">
                  <div className="clearing">
                    <button
                      type="button"
                      id="btn_clear"
                      className=" btn_sub btn_clear "
                    >
                      clear
                    </button>
                  </div>
                  <div className="adjust_order">
                    <button
                      type="button"
                      id="remove_meal"
                      className="btn_sub remove_meal"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <button
                      type="button"
                      id="add_meal"
                      className="btn_sub add_meal"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="dish_consumed">
                  <p>Notes :4.6</p>

                  <p className="dish_price">Price: $5</p>
                </div>

                <div className="brief_overview_meal">
                  <div className="brief_img">
                    <img
                      src={AhmadIMG}
                      className="dish_order_img"
                      alt="oops overview"
                    />
                  </div>
                  <p className="dish_order_desc">Description: Italian</p>
                </div>
              </div>
            </li>
            <li className="keeping_table">
              <div className="dish_table">
                <div className="dish_topic">
                  <p>Jutsu Chicken</p>
                  <p>
                    <span> Orders :</span>
                    <span className="number_order">3</span>
                  </p>
                </div>
                <div className="dish_country">Italian</div>
                <div className="dish_sub_operation">
                  <div className="clearing">
                    <button
                      type="button"
                      id="btn_clear"
                      className=" btn_sub btn_clear "
                    >
                      clear
                    </button>
                  </div>
                  <div className="adjust_order">
                    <button
                      type="button"
                      id="remove_meal"
                      className="btn_sub remove_meal"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <button
                      type="button"
                      id="add_meal"
                      className="btn_sub add_meal"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="dish_consumed">
                  <p>Notes :4.6</p>

                  <p className="dish_price">Price: $5</p>
                </div>

                <div className="brief_overview_meal">
                  <div className="brief_img">
                    <img
                      src={AhmadIMG}
                      className="dish_order_img"
                      alt="oops overview"
                    />
                  </div>
                  <p className="dish_order_desc">Description: Italian</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="avoilable_ticket">
        <h4 className="title_order">Sample</h4>
        <hr className="breakpoint_ticket"></hr>
        <div className="sample_ticket">
          <div className="header_sample">
            <div className="sample_logo">
              <div className="logo_brand">
                <span>T</span>
                <span>D</span>
                <span>S</span>
              </div>
            </div>
            <div className="current_day_time">
              <h4>12:30 A.M</h4>
            </div>
            <div className="statement_to_client">
              <p>AS you order, your time is valued by our Team</p>
            </div>
          </div>
          <div className="type_sample">
            <p style={{ fontWeight: "bold" }}>Delivery Foods</p>
            <p>Ticket N³%:2815463004</p>
          </div>
          <div className="spec_details_orders">
            <table>
              <tr>
                <th>meals</th>
                <th>quantity</th>
                <th>price</th>
                <th>ToTal</th>
              </tr>
              <tr>
                <td>Jutsu Chicken</td>
                <td>3</td>
                <td>$5.25</td>
                <td>$15.75</td>
              </tr>
              <tr>
                <td>Jutsu Chicken</td>
                <td>3</td>
                <td>$5.25</td>
                <td>$15.75</td>
              </tr>
              <tr>
                <td>Jutsu Chicken</td>
                <td>3</td>
                <td>$5.25</td>
                <td>$15.75</td>
              </tr>
              <tr>
                <td>
                  <i className="fa-solid fa-minus"></i>
                </td>
                <td>
                  <i className="fa-solid fa-minus"></i>
                </td>
                <td>
                  <i className="fa-solid fa-minus"></i>
                </td>
                <td>$47.25</td>
              </tr>
            </table>
          </div>
          <br></br>

          {/* start and display when you hit button validate */}
          <div className="order_track_time">
            <div>
              Your order will be send in less than
              <span style={{ fontWeight: "bold" }}> 2 hours</span>
            </div>
            <div className="remaining_track_time">
              <ul className="post_track_time">
                <li>Time Remaining</li>
                <li className="time_left">01:45:36 s</li>
              </ul>
            </div>
          </div>

          <div className="address_customers">
            <div className="address_side">
              <p>Location : Titi Garage</p>
              <p className="grateful_words">Thanks you Trusting TDs Services</p>
            </div>

            <div className="submit_ticket">
              <button
                type="button"
                id="btn_validate_order"
                className="btn_validate_order"
              >
                validate
              </button>
              <button
                type="button"
                id="btn_play_game"
                className="btn_play_game"
              >
                Fourth Meal Game
              </button>
            </div>

            <div className="noti_payment">
              <p className="notification">
                You will be shortly send a code to complete the transaction
              </p>

              <div className="payment_wrapper">
                <button type="button" className="btn_sub btn_payment">
                  Payment
                </button>

                {/* visibility set true when button payment is hitted */}
                <div className="payment_methods">
                  <ul>
                    <li>
                      {/* <span>use</span> */}
                      <span>
                        <i className="fa-brands fa-cc-paypal"></i>
                      </span>
                    </li>
                    <li>
                      {/* <span>use</span> */}
                      <span>
                        <img
                          src={MTN}
                          className="img_payment"
                          alt="missing payment"
                        />
                      </span>
                    </li>
                    <li>
                      {/* <span>use</span> */}
                      <span>
                        <img
                          src={ORANGE}
                          className="img_payment"
                          alt="missing payment"
                        />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticking_template_order">
        <div className="msg_grateful_order">
          <div>
            <p>See Your daily or weekly order underneath</p>
          </div>

          <div>
            <img src={SHAWNAN} className="grateful_img" alt="order template" />
            <p className="messaging_customers">
              Thanks You to be a part of TDs...
            </p>
          </div>
        </div>

        <div className="orders_day">
          <div className="template_day_orders">
            <ul className="template_day snaps_inline">
              <li className="day_dish_recap">
                <p className="title_template_orders">Day Orders</p>
                <div className="dish_table">
                  <div className="dish_country">Jutsu Chicken</div>
                  <div className="dish_sub_operation">
                    <div className="dish_topic">
                      <p>
                        <span className="number_order">3</span>
                        <span>: Orders</span>
                      </p>
                    </div>
                    <div className="brief_overview_meal">
                      <img
                        src={AhmadIMG}
                        className="dish_order_img"
                        alt="oops overview"
                      />
                      <div className="recap_feedback">
                        <p className="send_ratings">Ratings</p>
                      </div>
                    </div>
                    <p className="dish_order_desc">Description: Italian</p>
                  </div>
                </div>
              </li>
              <li className="day_dish_recap">
                <p className="title_template_orders">Day Orders</p>
                <div className="dish_table">
                  <div className="dish_country">Jutsu Chicken</div>
                  <div className="dish_sub_operation">
                    <div className="dish_topic">
                      <p>
                        <span className="number_order">3</span>
                        <span>: Orders</span>
                      </p>
                    </div>
                    <div className="brief_overview_meal">
                      <img
                        src={AhmadIMG}
                        className="dish_order_img"
                        alt="oops overview"
                      />
                      <div className="recap_feedback">
                        <p className="send_ratings">Ratings</p>
                      </div>
                    </div>
                    <p className="dish_order_desc">Description: Italian</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="template_week_orders ">
          <p className="title_week_orders">Week Orders</p>
          <div className="calendar_orders ">
            <ul className="weeks_day">
              <li>
                <span className="day_week">MON</span>
                <span className="day_count">16</span>
              </li>
              <li>
                <span className="day_week">TUE</span>
                <span className="day_count">17</span>
              </li>
              <li>
                <span className="day_week">WED</span>
                <span className="day_count">18</span>
              </li>
              <li>
                <span className="day_week">THU</span>
                <span className="day_count">19</span>
              </li>
              <li>
                <span className="day_week">FRI</span>
                <span className="day_count">20</span>
              </li>
              <li>
                <span className="day_week">SAT</span>
                <span className="day_count">21</span>
              </li>
              <li>
                <span className="day_week">SUN</span>
                <span className="day_count">22</span>
              </li>
            </ul>

            <div className="days_week_order">
              <ul className="days_dish_recap">
                <li className="day_dish_recall">
                  <div className="dish_table">
                    <div className="dish_sub_operation">
                      <div>
                        <p>
                          Notes : <span>4.6</span>
                        </p>
                      </div>
                      <div className="brief_overview_meal">
                        <img
                          src={AhmadIMG}
                          className="dish_order_img"
                          alt="oops overview"
                        />

                        <p className="dish_order_desc">Description: Italian</p>
                      </div>
                    </div>
                    <div className="dish_topic">
                      <p>Jutsu Chicken</p>
                      <p>
                        <span className="number_order">3</span>
                        <span>: Ordered</span>
                      </p>
                    </div>
                    <div className="recap_feedback">
                      <p className="send_ratings">Ratings</p>
                      <p className="send_feedback">Feedback</p>
                    </div>
                  </div>
                </li>
                <li className="day_dish_recall">
                  <div className="dish_table">
                    <div className="dish_sub_operation">
                      <div>
                        <p>
                          Notes : <span>4.6</span>
                        </p>
                      </div>
                      <div className="brief_overview_meal">
                        <img
                          src={AhmadIMG}
                          className="dish_order_img"
                          alt="oops overview"
                        />

                        <p className="dish_order_desc">Description: Italian</p>
                      </div>
                    </div>
                    <div className="dish_topic">
                      <p>Jutsu Chicken</p>
                      <p>
                        <span className="number_order">3</span>
                        <span>: Ordered</span>
                      </p>
                    </div>
                    <div className="recap_feedback">
                      <p className="send_ratings">Ratings</p>
                      <p className="send_feedback">Feedback</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* newest order coming */}
        <div className="new_command">
          <button type="button" className="btn_sub btn_newest_order">
            newest order <span className="new_command_number">3</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Orders;
