import React, { useState, useRef, useContext, useEffect } from "react";
import moment from "moment";
import { AhmadIMG, SHAWNAN, MTN, ORANGE } from "../assets/images";
import { MealContext } from "../context/MealsContext";
import { initiateOrder, updateThisOrder } from "../callAPI/OrdersApi";
import { postPayment } from "../callAPI/PaymentApi";
import { userLogging } from "../callAPI/UsersApi";
import CardOrder from "../cards/card-order";
import CardWeek from "../cards/card-week";
import CardWeekOrders from "../cards/card-week-orders";
import LogOrRegisterForm from "../cards/register-login-form";
import CardDayOrders from "../cards/card-day-orders";
import "./Orders.css";

{
  /* <i className="fa-solid fa-plus"></i>;
<i className="fa-solid fa-minus"></i>;
<i className="fa-brands fa-cc-paypal"></i> */
}

function Orders() {
  const {
    state: {
      meals,
      orderSpecsCurrent,
      orders,
      thisOrder,
      indexDayFormat,
      user,
      hoursPrinted,
      totalPrice,
      ticketNumber,
      payment,
    },
    handleOrders,
    handleDayShift,
    handleFirstTimeOrder,
    handleTicketNumber,
    handleHoursPrint,
    handleTotalPrice,
    handleThisOrder,
    handlePayment,
    handleClearOrderSpecs,
    handleTemplateOrdersDay,
    wholeCountDownTimersDay,
    handleRatingsFeedback,
  } = useContext(MealContext);

  const [tmpIndexWeek, setTmpIndexWeek] = useState([0, 1, 2, 3, 4, 5, 6]);

  const [isNewLocation, setNewLocation] = useState(false);
  const [dataNewLocation, setDataNewLocation] = useState({});
  const newLocationRef = useRef(null);
  const newCityRef = useRef(null);
  const newStreetRef = useRef(null);
  const oneMoreStepRef = useRef(null);
  const minimizeOrApplyRef = useRef(null);

  const newRadioRefOne = useRef(null);
  const newRadioRefTwo = useRef(null);

  const [timer, setTimer] = useState("00:00:00");
  const interval = useRef(null);
  const applyOrderRef = useRef(null);
  const totalRef = useRef(null);
  const validateRef = useRef(null);

  const orderOftheDay = orders.filter(
    (order) => order.dateOrdered === moment().format("Do MMMM, YYYY")
  );

  const openToNewLocation = () => {
    if (minimizeOrApplyRef.current.textContent === "Apply") {
      setNewLocation(true);
    } else if (minimizeOrApplyRef.current.textContent === "Minimize") {
    }
  };

  const closeFromNewLocation = () => {
    setNewLocation(false);
  };

  const handleStepBackLoc = () => {
    oneMoreStepRef.current.style.visibility = "hidden";
    setNewLocation(true);
    validateRef.current.style.border = "2px solid black"; // better think of a class
  };

  const handleMoveToValidation = () => {
    oneMoreStepRef.current.style.visibility = "hidden";
    validateRef.current.style.border = "2px solid yellow"; // rather add a class (enhance border, border-radius=50% ---> after click go back to default way is was displaying)

    handleTicketNumber((totalPrice - 3).toString(16));
    handleHoursPrint(moment().format("hh:mm a"));
    setTimer("02:00:00");
  };

  const handleFirstStepLoc = (e) => {
    e.preventDefault();
    if (newRadioRefOne.current.checked) {
      let phone = e.target.elements.newNum.value;
      if (phone === "") {
        alert("Please Enter a phone number");
        setNewLocation(false);
        return;
      }

      let city = "";
      let street = "";

      let storeNew;

      storeNew = { phone, city, street };

      setDataNewLocation(storeNew);

      //close new location
      setNewLocation(false);
      newPhone = "";

      //move to one more step
      oneMoreStepRef.current.style.visibility = "visible";

      //--> here you are (OPen *ONE MORE STEP* BOX/ and DESIGN JSX)
    } else if (newRadioRefTwo.current.checked) {
      let phone = e.target.elements.newNum.value;
      let city = e.target.elements.newCity.value;
      let street = e.target.elements.newStreet.value;

      if (phone === "" || city === "" || street === "") {
        alert("Please Enter All the field");
        setNewLocation(false);
        return;
      }

      let storeNew;

      storeNew = { phone, city, street };

      setDataNewLocation(storeNew);

      //close new location box
      setNewLocation(false);

      newPhone === "";
      newCity === "";
      newStreet === "";

      //move to one more step
      oneMoreStepRef.current.style.visibility = "visible";

      //--> here you are (OPen *ONE MORE STEP* BOX/ and DESIGN JSX)
    }
  };

  const validateThisOrder = () => {
    minimizeOrApplyRef.current.textContent = "Minimize";

    validateRef.current.style.border = "2px solid yellow"; // rather add a class (enhance border, border-radius=50% ---> after click go back to default way is was displaying)

    //not yet ( this update)
    updateThisOrder(dataNewLocation);
    let timerOn = callTimer();
    setTimer(timerOn);

    wholeCountDownTimersDay(callTimer());

    //post to collection payment
    postPayment(thisOrder._id, "mtn-money", thisOrder.codePayment);

    let templateOrderVar = {
      timer: timerOn,
      ordersSpecs: orderSpecsCurrent,
      order: thisOrder,
      ticketNumber: ticketNumber,
      hours: hoursPrinted,
      totalPrice: totalPrice,
      payment: payment,
    };

    // store element templateOrder in the specified Template in Context API
    handleTemplateOrdersDay(templateOrderVar);

    //reset variable involved in template_order
    resetDataHoldingTemplate();
  };

  const resetDataHoldingTemplate = () => {
    handleTicketNumber("_ _ _ _ _ _");
    handleHoursPrint("time");
    handleTotalPrice("_ _ _ _");
    handleThisOrder({});
    handlePayment({});
    handleClearOrderSpecs([]);
    setTimer("00:00:00");
  };

  const handleNewRadioInput = (e) => {
    if (e.target.id === "name_area_one") {
      newLocationRef.current.style.visibility = "visible";
      newCityRef.current.style.display = "none";
      newStreetRef.current.style.display = "none";
    } else if (e.target.id === "name_area_two") {
      newLocationRef.current.style.visibility = "visible";
      newCityRef.current.style.display = "block";
      newStreetRef.current.style.display = "block";
    }
  };

  const handleControlRadio = (e) => {
    console.log(e.target);

    if (e.target.id === "reg_price_2") {
      if (user.id === undefined) {
        handleFirstTimeOrder(true);
        return;
      } else {
        handleFirstTimeOrder(false);

        const myOrder = initiateOrder();

        handleTotalPrice(() => {
          let total = myOrder.totalPrice;
          let totalArr = Array.from(total);
          let output = "";
          totalArr.map((elt) => {
            output += elt + " ";
          });
          console.log(output);
          return output;
        });
      }

      applyOrderRef.current.classList.add("addShowBtn");
      totalRef.current.classList.add("anim_height");
    } else if (e.target.id === "reg_price_1") {
      setTotalPrice(() => "_" + " " + "_" + " " + "_" + " " + "_");
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
              <h4>{hoursPrinted}</h4> {/* change with ok button last step */}
            </div>
            <div className="statement_to_client">
              <p>AS you order, your time is valued by our Team</p>
            </div>
          </div>
          <div className="type_sample">
            <p style={{ fontWeight: "bold" }}>Delivery Foods</p>
            <p>Ticket N³%: {ticketNumber} </p>
            {/* change with ok button last step */}
          </div>
          <div className="spec_details_orders">
            <table>
              <tr>
                <th>meals</th>
                <th>quantity</th>
                <th>price</th>
                <th>ToTal</th>
              </tr>
              {}
              {orderSpecsCurrent.map((order, i) => {
                const meal = order.meal;
                const qty = order.quantity;
                const minTotal = (meal.price * qty).toFixed(2);
                return (
                  <tr>
                    <td>{meal.name}</td>
                    <td>{qty}</td>
                    <td>${meal.price}</td>
                    <td>${minTotal}</td>
                  </tr>
                );
              })}

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
                <td>${thisOrder.totalPrice}</td>
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
                $ {totalPrice}
              </span>
              <div className="submit_container" ref={applyOrderRef}>
                {/*   <button
                  type="button"
                  className="btn_apply_order"
                  onClick={callTimer}
                >
                  Apply
                </button> */}
                {isNewLocation && (
                  <div className="wrapping_new_location">
                    <span className="title_hold">Location</span>
                    <ul className="figure_area" onChange={handleNewRadioInput}>
                      <li>
                        <input
                          type="radio"
                          name="location"
                          id="name_area_one"
                          className="name_area area_expected_one"
                          ref={newRadioRefOne}
                        />
                        <label htmlFor="home">home</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="location"
                          id="name_area_two"
                          className="name_area area_expected_two"
                          ref={newRadioRefTwo}
                        />
                        <label htmlFor="home">new Location</label>
                      </li>
                    </ul>
                    <div className="add_more_info">
                      <form
                        className="control_in_new_direction"
                        onSubmit={handleFirstStepLoc}
                      >
                        <ul className="list_appearance" ref={newLocationRef}>
                          <li className="adding_phone">
                            <label htmlFor="phone"> add a number</label>
                            <input
                              type="number"
                              name="newNum"
                              id="number_add"
                              className="number_add"
                            />
                          </li>
                          <li className="adding_city" ref={newCityRef}>
                            <label htmlFor="city">city</label>
                            <input
                              type="text"
                              name="newCity"
                              id="city_add"
                              className="city_add"
                            />
                          </li>
                          <li className="adding_street" ref={newStreetRef}>
                            <label htmlFor="street">street</label>
                            <input
                              type="text"
                              name="newStreet"
                              id="street_add"
                              className="street_add"
                            />
                          </li>
                        </ul>

                        <ul className="spread_new_button">
                          <li>
                            <button
                              type="button"
                              className="btn_on_new btn_loc_one"
                              onClick={closeFromNewLocation}
                            >
                              Reject
                            </button>
                          </li>
                          <li>
                            <button
                              type="submit"
                              className="btn_on_new btn_loc_two"
                              onClick={handleFirstStepLoc}
                            >
                              OK
                            </button>
                          </li>
                        </ul>
                      </form>
                    </div>
                  </div>
                )}

                <div className="one_more_step">
                  <div className="one_more_content" ref={oneMoreStepRef}>
                    <div className="first_my_word">
                      <span className="remind_next">One more step:</span>
                      <p className="small_task">
                        click on the Button
                        <span className="remind_validation">validate</span>
                        Please, to terminate the process of sending your
                        <strong>order</strong>
                      </p>
                    </div>
                    <ul className="process_decision">
                      <li className="back_my_need">
                        <span className="drop_">
                          <i className="fa-solid fa-chevron-left"></i>
                          <i className="fa-solid fa-chevron-left"></i>
                        </span>
                        <button
                          type="button"
                          className="no_mind"
                          onClick={handleStepBackLoc}
                        >
                          Back
                        </button>
                      </li>
                      <li className="agree_your_proposal">
                        <button
                          type="button"
                          className="yes_sure"
                          onClick={handleMoveToValidation}
                        >
                          OK
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn_apply_order"
                  onClick={openToNewLocation}
                  ref={minimizeOrApplyRef}
                >
                  Apply
                </button>
              </div>
            </form>
          </div>

          {firstTimeOrder && (
            <div className="appealing_registration">
              {/* //write css */}
              <LogOrRegisterForm />
            </div>
          )}

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
                ref={validateRef}
                onClick={validateThisOrder}
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
        {/*   <div className="wrapper_no_items">
          <div className="content_no">
            <span className="no_items">No Items</span>
          </div>
        </div> */}

        <div className="orders_day">
          <div className="template_day_orders">
            <ul className="template_day snaps_inline">
              {orderOftheDay.length !== 0 ? (
                <CardDayOrders ordersSpecs={ordersSpecs} />
              ) : (
                <div className="wrapper_no_items">
                  <div className="content_no">
                    <span className="no_items">No Items</span>
                  </div>
                </div>
              )}
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
                    return <CardWeekOrders ordersSpecs={item.ordersSpecs} />;
                  } else {
                    return (
                      <div className="wrapper_no_items">
                        <div className="content_no">
                          <span className="no_items">No Items</span>
                        </div>
                      </div>
                    );
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
            newest order{" "}
            <span className="new_command_number">{orders.length}</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Orders;
