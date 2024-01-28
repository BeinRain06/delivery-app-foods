import React, { useState, useRef, useContext, useEffect } from "react";
import moment from "moment";
import { AhmadIMG, SHAWNAN, MTN, ORANGE } from "../assets/images";
import { MealContext } from "../context/MealsContext";
import { TemplateContext } from "../context/TemplateContext";
import { useDispatch, useSelector } from "react-redux";
import {
  mealActions,
  recordAllMealSliceState,
} from "../redux/services/MealSplice";
import {
  templateActions,
  recordAllTemplateSliceState,
} from "../redux/services/TemplateSlice";
import {
  orderSpecsCurrent_section,
  thisOrder_section,
  firstTimeOrder_section,
  hoursPrinted_section,
  totalPrice_section,
  ticketNumber_section,
  payment_section,
  isNewLocation_section,
  timer_section,
} from "../redux/services/TemplateSlice";
import {
  meals_section,
  user_section,
  orders_section,
  indexDayFormat_section,
} from "../redux/services/MealSplice";

import {
  initiateOrder,
  updateThisLocationOrder,
  updateThisTotalPriceOrder,
} from "../callAPI/OrdersApi";

import { postPayment } from "../callAPI/PaymentApi";
import { userLogging } from "../callAPI/UsersApi";
import CardOrder from "../cards/card-order";
import CardWeek from "../cards/card-week";
import CardWeekOrders from "../cards/card-week-orders";
import TemplateOrder from "../template/TemplateOrder";
import LogOrRegisterForm from "../cards/register-login-form";
import CardDayOrders from "../cards/card-day-orders";
import "./Orders.css";

{
  /* <i className="fa-solid fa-plus"></i>;
<i className="fa-solid fa-minus"></i>;
<i className="fa-brands fa-cc-paypal"></i> */
}

function Orders() {
  /* const {
    state: {
      orderSpecsCurrent,
      thisOrder,
      firstTimeOrder,
      hoursPrinted,
      totalPrice,
      ticketNumber,
      payment,
      dataTemplatesOrdersDay,
      isNewLocation,
      timer,
    },
    handleFirstTimeOrder,
    handleTicketNumber,
    handleHoursPrint,
    handleTotalPrice,
    handleThisOrder,
    handlePayment,
    handleTimer,
    handleNewLocation,
    handleOrderSpecs,
    handleTemplateOrdersDay,
    wholeCountDownTimersDay,
  } = useContext(TemplateContext); */

  /* const {
    state: { meals, orders, indexDayFormat, user },
    handleRatings,
    handleDayShift,
  } = useContext(MealContext); */

  const dispatch = useDispatch();

  /* const {
    orderSpecsCurrent,
    thisOrder,
    firstTimeOrder,
    hoursPrinted,
    totalPrice,
    ticketNumber,
    payment,
    dataTemplatesOrdersDay,
    isNewLocation,
    timer,
  } = useSelector(recordAllTemplateSliceState);

  const { meals, orders, indexDayFormat, user } = useSelector(
    recordAllMealSliceState
  ); */

  /*  const {
    orderSpecsCurrent,
    thisOrder,
    firstTimeOrder,
    hoursPrinted,
    totalPrice,
    ticketNumber,
    payment,
    dataTemplatesOrdersDay,
    isNewLocation,
    timer,
  } = recordAllTemplateSliceState((store) => store.orderPrime.initialState); */

  const orderSpecsCurrent = useSelector(orderSpecsCurrent_section);

  const thisOrder = useSelector(thisOrder_section);
  const firstTimeOrder = useSelector(firstTimeOrder_section);
  const hoursPrinted = useSelector(hoursPrinted_section);
  const totalPrice = useSelector(totalPrice_section);
  const ticketNumber = useSelector(ticketNumber_section);
  const payment = useSelector(payment_section);
  const isNewLocation = useSelector(isNewLocation_section);
  const timer = useSelector(timer_section);

  const meals = useSelector(meals_section);
  const orders = useSelector(orders_section);
  const user = useSelector(user_section);
  const indexDayFormat = useSelector(indexDayFormat_section);

  const [tmpIndexWeek, setTmpIndexWeek] = useState([0, 1, 2, 3, 4, 5, 6]);

  const [dataNewLocation, setDataNewLocation] = useState({});
  const newLocationRef = useRef(null);
  const newCityRef = useRef(null);
  const newStreetRef = useRef(null);
  const oneMoreStepRef = useRef(null);
  const minimizeOrApplyRef = useRef(null);
  const ticketTempRef = useRef(null);
  const ticketManualRef = useRef(null);

  const newRadioRefOne = useRef(null);
  const newRadioRefTwo = useRef(null);

  const interval = useRef(null);
  const applyOrderRef = useRef(null);
  const totalRef = useRef(null);
  const validateRef = useRef(null);

  const orderOftheDay =
    user.id === undefined
      ? []
      : orders.filter(
          (order) => order.dateOrdered === moment().format("Do MMMM, YYYY")
        );

  const openToNewLocation = () => {
    if (minimizeOrApplyRef.current.textContent === "Apply") {
      /*  handleNewLocation(true); */
      dispatch(templateActions.handleNewLocation(true));
    } else if (minimizeOrApplyRef.current.textContent === "Minimize") {
      ticketTempRef.current.style.classList.add("anim_hide_template");

      // add anim show bookOrder
      ticketManualRef.current.style.classList.add("anim_show_book");
    }
  };

  const hideBookManual = () => {
    // hide anim show bookOrder
    ticketManualRef.current.style.classList.add("anim_show_book");

    ticketTempRef.current.style.classList.remove("anim_hide_template");
  };

  const closeFromNewLocation = () => {
    /* handleNewLocation(false); */
    dispatch(templateActions.handleNewLocation(false));
  };

  const handleStepBackLoc = () => {
    oneMoreStepRef.current.style.visibility = "hidden";
    /* handleNewLocation(true); */
    dispatch(templateActions.handleNewLocation(true));
    validateRef.current.style.classList.remove("impact_more_step");
  };

  const handleMoveToValidation = () => {
    oneMoreStepRef.current.style.visibility = "hidden";
    validateRef.current.style.classList.add("impact_more_step");

    /* handleTicketNumber((totalPrice - 3).toString(16));
    handleHoursPrint(moment().format("hh:mm a"));
    handleTimer("02:00:00"); */

    dispatch(templateActions.handleTicketNumber((totalPrice - 3).toString(16)));
    dispatch(templateActions.handleHoursPrint(moment().format("hh:mm a")));
    dispatch(templateActions.handleTimer("02:00:00"));
  };

  const handleFirstStepLoc = (e) => {
    e.preventDefault();
    if (newRadioRefOne.current.checked) {
      let phone = e.target.elements.newNum;
      if (phone.value === "") {
        alert("Please Enter a phone number");
        /*  handleNewLocation(false); */
        dispatch(templateActions.handleNewLocation(false));
        return;
      }

      let city = "home";
      let street = "home";

      let newLocation = {
        phone: phone.value,
        city: city,
        street: street,
      };

      setDataNewLocation(newLocation);

      //close new location
      /*  handleNewLocation(false); */
      dispatch(templateActions.handleNewLocation(false));
      phone.value = "";

      //move to one more step
      oneMoreStepRef.current.style.visibility = "visible";
    } else if (newRadioRefTwo.current.checked) {
      let phone = e.target.elements.newNum;
      let city = e.target.elements.newCity;
      let street = e.target.elements.newStreet;

      if (phone.value === "" || city.value === "" || street.value === "") {
        alert("Please Enter All the field");
        /* handleNewLocation(false); */
        dispatch(templateActions.handleNewLocation(false));
        return;
      }
      let newlocation = {
        phone: phone.value,
        city: city.value,
        street: street.value,
      };
      setDataNewLocation(newlocation);

      //close new location box
      /* handleNewLocation(false); */
      dispatch(templateActions.handleNewLocation(false));

      phone.value === "";
      city.value === "";
      street.value === "";

      //move to one more step
      oneMoreStepRef.current.style.visibility = "visible";
    }
  };

  const validateThisOrder = () => {
    minimizeOrApplyRef.current.textContent = "Minimize";

    validateRef.current.style.border = "2px solid yellow"; // rather add a class (enhance border, border-radius=50% ---> after click go back to default way is was displaying)

    //not yet ( this update)
    const newPartLocation = updateThisLocationOrder(
      dataNewLocation,
      thisOrder.id
    );

    /* handleThisOrder(newPartLocation);
     handleTimer(timerOn);
    wholeCountDownTimersDay(callTimer()); */

    dispatch(templateActions.handleThisOrder(newPartLocation));

    let timerOn = callTimer();

    dispatch(templateActions.handleTimer(timerOn));

    dispatch(templateActions.wholeCountDownTimersDay(callTimer()));

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

    /* handleTemplateOrdersDay(templateOrderVar); */

    dispatch(templateActions.handleTemplateOrdersDay(templateOrderVar));

    //reset variable involved in template_order
    resetDataHoldingTemplate();
  };

  /*  const resetDataHoldingTemplate = () => {
    handleTicketNumber("_ _ _ _ _ _");
    handleHoursPrint("time");
    handleTotalPrice("_ _ _ _");
    handleThisOrder({});
    handlePayment({});
    handleClearOrderSpecs([]);
    handleTimer("00:00:00");
  }; */

  const resetDataHoldingTemplate = () => {
    handleTicketNumber("_ _ _ _ _ _");
    handleHoursPrint("time");
    handleTotalPrice("_ _ _ _");
    handleThisOrder({});
    handlePayment([]);
    handleClearOrderSpecs([]);
    handleTimer("00:00:00");
    dispatch(templateActions.handleTicketNumber("_ _ _ _ _ _"));
    dispatch(templateActions.handleHoursPrint("time"));
    dispatch(templateActions.handleTotalPrice("_ _ _ _"));
    dispatch(templateActions.handleThisOrder({}));
    dispatch(templateActions.handlePayment([]));
    dispatch(templateActions.handleClearOrderSpecs([]));
    dispatch(templateActions.handleTimer("00:00:00"));
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

  const handleControlRadio = async (e) => {
    console.log(e.target);

    if (e.target.id === "reg_price_2") {
      if (user.id === undefined) {
        setTimeout(() => {
          /* handleFirstTimeOrder(true); */
          dispatch(templateActions.handleFirstTimeOrder(true));
        }, 3000);
        return;
      } else {
        /*  await handleFirstTimeOrder(false); */
        await dispatch(templateActions.handleFirstTimeOrder(false));

        const newThisOrder = await initiateOrder(user.id, orderSpecsCurrent);

        /* handleTotalPrice(async () => await newThisOrder.totalPrice); */

        await dispatch(
          templateActions.handleTotalPrice(newThisOrder.totalPrice)
        );
      }

      applyOrderRef.current.classList.add("addShowBtn");
      totalRef.current.classList.add("anim_height");
    } else if (e.target.id === "reg_price_1") {
      /*  handleTotalPrice(() => "_" + " " + "_" + " " + "_" + " " + "_"); */

      dispatch(
        templateActions.handleTotalPrice(
          "_" + " " + "_" + " " + "_" + " " + "_"
        )
      );
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
      /*  handleTimer(
        (hrs > 9 ? hrs : "0" + hrs) +
          ": " +
          (min > 9 ? min : "0" + min) +
          ":" +
          (sec > 9 ? sec : "0" + sec)
      ); */

      dispatch(
        templateActions.handleTimer(
          (hrs > 9 ? hrs : "0" + hrs) +
            ": " +
            (min > 9 ? min : "0" + min) +
            ":" +
            (sec > 9 ? sec : "0" + sec)
        )
      );
    }
  };

  const clearTimer = (cb) => {
    /*  handleTimer("02:00:00"); */
    dispatch(templateActions.handleTimer("02:00:00"));
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
  useEffect(() => {
    console.log("present navbar");
    setTimeout(() => {
      dispatch(mealActions.handleWelcome(false));
    }, 3000);
  }, []);

  useEffect(() => {}, [indexDayFormat]);

  useEffect(() => {
    const updateTotalPrice = async () => {
      let newChange;
      console.log("orders specs right in time", orderSpecsCurrent);
      if (user.id !== undefined) {
        newChange = await updateThisTotalPriceOrder(
          thisOrder.id,
          orderSpecsCurrent
        );
        /* await handleThisOrder(newChange); */

        await dispatch(templateActions.handleThisOrder(newChange));
      }
      setTimeout(() => {
        console.log("update Total Price:", newChange);
      }, 3000);
    };

    updateTotalPrice();
  }, [orderSpecsCurrent]);

  return (
    <main className="welcome_orders">
      <div className="gen_orders">
        <h4 className="title_order">Orders</h4>
        <hr className="breakpoint_orders"></hr>
        <div className="recap_wrapper">
          <ul className="ready_ordered snaps_inline_0">
            {orderSpecsCurrent.length !== 0 ? (
              orderSpecsCurrent.map((orderSpecItem, index) => {
                const mealItem = meals.find(
                  (item) => item._id === orderSpecItem.meal
                );
                return (
                  <CardOrder
                    key={mealItem._id}
                    id={mealItem._id}
                    name={mealItem.name}
                    quantity={orderSpecItem.quantity}
                    origin={mealItem.origin}
                    ratings={mealItem.ratings}
                    price={mealItem.price}
                    image={mealItem.image}
                  />
                );
              })
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

      {orderSpecsCurrent.length !== 0 ? (
        <TemplateOrder />
      ) : (
        orderSpecsCurrent.length !== 0 && (
          <div className="available_ticket">
            <div
              className="available_book_content"
              ref={ticketManualRef}
              onClick={hideBookManual}
            >
              <div className="available_book_order">
                <div className="entitled">
                  <span className="title_order">1 Book Order</span>
                </div>
                <div className="logo_restaurant">
                  <span className="label_restaurant">TDS</span>
                </div>
              </div>
            </div>
            <div className="available_ticket_content" ref={ticketTempRef}>
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
                    <h4>{hoursPrinted}</h4>{" "}
                    {/* change with ok button last step */}
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
                    <thead>
                      <tr>
                        <th>meals</th>
                        <th>qty</th>
                        <th>price</th>
                        <th>ToTal</th>
                      </tr>
                    </thead>
                    {}
                    {orderSpecsCurrent.map((order, i) => {
                      const mealId = order.meal;
                      const meal = meals.find((item) => item._id === mealId);
                      const qty = order.quantity;
                      const minTotal = (meal.price * qty).toFixed(2);
                      return (
                        <>
                          <tbody>
                            <tr>
                              <td>{meal.name}</td>
                              <td>{qty}</td>
                              <td>${meal.price}</td>
                              <td>${minTotal}</td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </table>
                </div>
                <div className="table_recap">
                  <table>
                    <tbody>
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
                    </tbody>
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
                          <ul
                            className="figure_area"
                            onChange={handleNewRadioInput}
                          >
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
                              <ul
                                className="list_appearance"
                                ref={newLocationRef}
                              >
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
                                <li
                                  className="adding_street"
                                  ref={newStreetRef}
                                >
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
                              <span className="remind_validation">
                                validate
                              </span>
                              Please, to terminate the process of sending your
                              <strong>order</strong>
                            </p>
                          </div>
                          <ul className="process_decision">
                            <li className="back_my_need">
                              <span className="drop_">
                                <i className="fa-solid fa-chevron-left fa-2x"></i>
                                <i className="fa-solid fa-chevron-left fa-2x"></i>
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
                    <p className="grateful_words">
                      Thanks you Trusting TDs Services
                    </p>
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
                      You will be shortly send a code to complete the
                      transaction
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
          </div>
        )
      )}

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
                {orders.length !== 0 &&
                  orders.map((item, i) => {
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
            newest order
            <span className="new_command_number">{orders.length}</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Orders;
