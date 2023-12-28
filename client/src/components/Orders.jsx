import React, { useState, useRef, useContext, useEffect } from "react";
import moment from "moment";
import { AhmadIMG, SHAWNAN, MTN, ORANGE } from "../assets/images";
import { MealContext } from "../context/MealsContext";
import CardOrder from "../cards/card-order";
import CardWeek from "../cards/card-week";
import CardWeekOrders from "../cards/card-week-orders";
import "./Orders.css";

{
  /* <i className="fa-solid fa-plus"></i>;
<i className="fa-solid fa-minus"></i>;
<i className="fa-brands fa-cc-paypal"></i> */
}

function Orders() {
  const {
    state: { meals, orderSpecs, orders, indexDayFormat },
    handleClear,
    handleDecrease,
    handleIncrease,
    handleOrders,
    handleDayShift,
    handleRatingsFeedback,
  } = useContext(MealContext);

  const [testOne, setTestOne] = useState("1500");
  const [tmpIndexWeek, setTmpIndexWeek] = useState([0, 1, 2, 3, 4, 5, 6]);

  const [firstTimeOrder, setFirstTimeOrder] = useState(false);

  const [timer, setTimer] = useState("00:00:00");
  const interval = useRef(null);
  const applyOrderRef = useRef(null);
  const totalRef = useRef(null);

  const handleControlRadio = (e) => {
    console.log(e.target);

    if (e.target.id === "reg_price_2") {
      if (firstTimeOrder === false) {
      }
      setTestOne(() => {
        let eltTest = "1500";
        let eltTestArr = Array.from(eltTest);
        let output = "";
        eltTestArr.map((elt) => {
          output += elt + " ";
        });
        console.log(output);
        return output;
      });

      applyOrderRef.current.classList.add("addShowBtn");
      totalRef.current.classList.add("anim_height");
    } else if (e.target.id === "reg_price_1") {
      setTestOne(() => "_" + " " + "_" + " " + "_" + " " + "_");
      applyOrderRef.current.classList.remove("addShowBtn");
      totalRef.current.classList.add("anim_height");
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  const getRemainingTime = (cb) => {
    const diff = Date.parse(cb) - Date.parse(new Date());

    //get Hrs --> Integer Division of diff by [1hr] in ms
    const hrs = Math.floor(diff / (1 * 60 * 60 * 1000));

    //get Mins --> Integer Division of the [remainder]-hour Division  by [1min] in ms
    const min = Math.floor((diff % (1 * 60 * 60 * 1000)) / (1 * 60 * 1000));

    //get Secs --> Integer Division of the [remainder]-minute Division  by [1sec] in ms
    const sec = Math.floor((diff % (1 * 60 * 1000)) / (1 * 1000));

    return { diff, hrs, min, sec };
  };

  const startTimer = (cb) => {
    let { diff, hrs, min, sec } = getRemainingTime(cb);

    if (diff >= 0) {
      setTimer(
        (hrs > 9 ? hrs : "0" + hrs) +
          ": " +
          (min > 9 ? min : "0" + min) +
          ":" +
          (sec > 9 ? sec : "0" + sec)
      );
    }
  };

  const clearTimer = (cb) => {
    setTimer("02:00:00");
    //avoid mutiple setInterval() to run for the same - scope : *interval* (reinitialize Timer or reset Timer !)
    if (interval.current) clearInterval(interval.current);

    const id = setInterval(() => {
      startTimer(cb);
    }, 1000);

    interval.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 7200);
    return deadline;
  };

  const callTimer = () => {
    clearTimer(getDeadTime());
  };

  // if you want it to be triggered while rendering - have  a try !

  /* useEffect(() => {
    clearTimer(getDeadTime());
  }, []); */

  useEffect(() => {}, [orderSpecs, indexDayFormat]);

  return (
    <main className="welcome_orders">
      <div className="gen_orders">
        <h4 className="title_order">Orders</h4>
        <hr className="breakpoint_orders"></hr>
        <div className="recap_wrapper">
          <ul className="ready_ordered">
            {orderSpecs.length !== 0 ? (
              meals.map((mealItem, index) => {
                const orderSpec = orderSpecs[index];
                if (mealItem._id === orderSpec.meal) {
                  <CardOrder
                    key={mealItem._id}
                    name={mealItem.name}
                    quantity={mealItem.quantity}
                    origin={mealItem.origin}
                    ratings={mealItem.ratings}
                    price={mealItem.price}
                  />;
                }
              })
            ) : (
              <span className="no_orders"> No Items</span>
            )}
            {/* <li className="keeping_table">
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
                      onClick={handleClear}
                    >
                      clear
                    </button>
                  </div>
                  <div className="adjust_order ">
                    <button
                      type="button"
                      id="remove_meal"
                      className="btn_sub remove_meal"
                      onClick={handleDecrease}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <button
                      type="button"
                      id="add_meal"
                      className="btn_sub add_meal"
                      onClick={handleIncrease}
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
                      onClick={handleClear}
                    >
                      clear
                    </button>
                  </div>
                  <div className="adjust_order">
                    <button
                      type="button"
                      id="remove_meal"
                      className="btn_sub remove_meal"
                      onClick={handleDecrease}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <button
                      type="button"
                      id="add_meal"
                      className="btn_sub add_meal"
                      onClick={handleIncrease}
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
                      onClick={handleClear}
                    >
                      clear
                    </button>
                  </div>
                  <div className="adjust_order">
                    <button
                      type="button"
                      id="remove_meal"
                      className="btn_sub remove_meal"
                      onClick={handleDecrease}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <button
                      type="button"
                      id="add_meal"
                      className="btn_sub add_meal"
                      onClick={handleIncrease}
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
            </li> */}
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

          <div className="totalPrice_in">
            <form
              className="control_radio"
              onSubmit={(e) => handleSubmitOrder(e)}
            >
              <ul
                className="input_radio_price"
                onChange={(e) => handleControlRadio(e)}
              >
                <li>
                  <input
                    type="radio"
                    name="radio_price"
                    id="reg_price_1"
                    className="reg_price_1 reg_price"
                  />
                  <label htmlFor="none">keep ordering</label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="radio_price"
                    id="reg_price_2"
                    className="reg_price_2 reg_price"
                  />
                  <label htmlFor="totalPrice">total Price</label>
                </li>
              </ul>
              <span className="total_bill" ref={totalRef}>
                $ {testOne}
              </span>
              <div className="submit_container" ref={applyOrderRef}>
                <button
                  type="button"
                  className="btn_apply_order"
                  onClick={callTimer}
                >
                  Apply
                </button>
              </div>
            </form>
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

                <li className="time_left">{timer}</li>
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
              {tmpIndexWeek.map((day, i) => {
                return (
                  <CardWeek key={i} id={i} onClick={(e) => handleDayShift(e)} />
                );
              })}

              {/*  <li>
                <span className="day_week">MON</span>
                <span className="day_count">16</span>
              </li> */}
            </ul>

            <div className="days_week_order">
              <ul className="days_dish_recap">
                {orders.map((item, i) => {
                  let dateOrderedFormat = item.dateOrdered.format("MMM D");

                  if (dateOrderedFormat === indexDayFormat) {
                    <CardWeekOrders ordersSpecs={item.ordersSpecs} />;
                  }
                })}
                {/* <li className="day_dish_recall">
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
                </li> */}
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
