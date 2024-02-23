import React, { useState, useRef, useContext, useEffect } from "react";
import moment from "moment";
import { AhmadIMG, SHAWNAN, MTN, ORANGE } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { templateActions } from "../../services/redux/createslice/TemplateSlice";
import { TemplateContext } from "../../services/context/TemplateContext";
import { MealContext } from "../../services/context/MealsContext";

import {
  initiateOrder,
  updateThisLocationOrder,
  updateThisTotalPriceOrder,
} from "../../callAPI/OrdersApi";
import { postPayment } from "../../callAPI/PaymentApi";
import { userLogging } from "../../callAPI/UsersApi";

import CardOrder from "../cards/card-order.jsx";
import CardWeek from "../cards/card-week.jsx";
import CardWeekOrders from "../cards/card-week-orders.jsx";
import TemplateOrder from "../templateTicket/TemplateOrder.jsx";
import LogOrRegisterForm from "../cards/register-login-form.jsx";
import CardDayOrders from "../cards/card-day-orders.jsx";
import ConfirmOrder from "../process_validation/styledComponents/ConfirmOrder";
import NewLocationOrder from "../process_validation/styledComponents/NewLocationOrder";
import OneMoreStep from "../process_validation/styledComponents/OneMoreStep";
import ButtonApply from "../process_validation/styledComponents/ButtonApply";
import ErrorWarning from "../process_validation/styledComponents/MsgError";
import "./Orders.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

{
  /* <i className="fa-solid fa-plus"></i>;
<i className="fa-solid fa-minus"></i>;
<i className="fa-brands fa-cc-paypal"></i> */
}

function Orders() {
  // const dispatch = useDispatch();

  const {
    state: { meals, user, indexDayFormat, orders },
    handleWelcome,
    handleOrders,
  } = useContext(MealContext);

  const {
    state: {
      firstTimeOrder,
      orderSpecsCurrent,
      thisOrder,
      dataTemplatesOrdersDay,
      countClickValidate,
      timer,
      isNewLocation,
      payment,
      ticketNumber,
      totalPrice,
      hoursPrinted,
    },
    handleNewLocation,
    handleFirstTimeOrder,
    handleThisOrder,
    handleTotalPrice,
    handleTicketNumber,
    handleHoursPrint,
    handleTimer,
    handleOrderSpecs,
    handleTemplateOrdersDay,
    handleCountClickValidate,
  } = useContext(TemplateContext);

  const [showTotalPrice, setShowTotalPrice] = useState("_ _ _ _");
  const [tmpIndexWeek, setTmpIndexWeek] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [dataNewLocation, setDataNewLocation] = useState({});
  const [timerIn, setTimerIn] = useState("00:00:00");

  //process validation Hook
  const [openFinalValidation, setOpenFinalValidation] = useState(false);
  const [isOneMoreStep, setIsMoreOneStep] = useState(false);
  const [applyText, setApplyText] = useState("Apply");
  const [isanOrderDay, SetIsAnOrDay] = useState(false);
  const [forseen, setForseen] = useState(false);
  const [componentSectionName, setComponentSectionName] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isError, setIsError] = useState(false);

  const newLocationRef = useRef(null);
  const newCityRef = useRef(null);
  const newStreetRef = useRef(null);
  const minimizeOrApplyRef = useRef(null);
  const ticketTempRef = useRef(null);
  const ticketManualRef = useRef(null);

  const newRadioRefOne = useRef(null);
  const newRadioRefTwo = useRef(null);

  const interval = useRef(null);
  const applyOrderRef = useRef(null);
  const totalRef = useRef(null);
  const validateRef = useRef(null);
  const fourthMealRef = useRef(null);
  const sliderTemplateRef = useRef(null);

  const orderOftheDay =
    user.id === undefined
      ? []
      : orders.filter(
          (order) => order.dateOrdered === moment().format("Do MMMM, YYYY")
        );

  const hideOrShowBookManual = (currentPlay) => {
    if (currentPlay === "show") {
      // show anim show bookOrder
      ticketManualRef?.current.style.classList.add("anim_show_book");

      ticketTempRef?.current.style.classList.remove("anim_hide_template");
    } else {
      // hide anim show bookOrder
      ticketManualRef?.current.style.classList.remove("anim_show_book");

      ticketTempRef?.current.style.classList.add("anim_hide_template");
    }
  };

  // HERE ===>  NEXT FUNCTION TO IMPLEMENT ACTION   <=== HERE

  const firstStepPayment = async () => {
    return await new Promise(async (resolve) => {
      const newPayment = await postPayment(
        thisOrder._id,
        "MTN",
        thisOrder.codePayment,
        totalPrice
      );
      setTimeout(() => {
        resolve(newPayment);
      }, 3000);
    });
  };

  const validateThisOrder = () => {
    //Pre-Actions
    validateRef.current.classList.remove("impact_more_step");
    setApplyText("Minimize");

    //MiddleCore Actions
    let newPayment;
    let newDataTemplateOrdersDay;
    setTimeout(async () => {
      const initPayment = await firstStepPayment();
      const indexPayment = Array.from(payment).length;

      newPayment = { ...payment, [indexPayment]: initPayment };
      handlePayment(newPayment);
    }, 3000);

    //recording template data order
    let dataRecordObj = {
      ticketNumber: ticketNumber,
      thisOrder: thisOrder,
      hoursPrinted: hoursPrinted,
      totalPrice: totalPrice,
      payment: payment,
      timer: "02:00:00",
      orderSpecsCurrent: orderSpecsCurrent,
    };

    const indexTemp = Array.from(dataTemplatesOrdersDay).length;

    newDataTemplateOrdersDay = {
      ...dataTemplatesOrdersDay,
      [indexTemp]: dataRecordObj,
    };

    handleTemplateOrdersDay(newDataTemplateOrdersDay);

    handleOrders(orderSpecsCurrent);

    setTimerIn(() => callTimer());

    SetIsAnOrDay(true);

    setOpenFinalValidation(false);

    //reset variable involved in template_order
    resetDataHoldingTemplate();
  };

  const resetDataHoldingTemplate = () => {
    handleTicketNumber("_ _ _ _ _ _");
    handleHoursPrint("time");
    handleTotalPrice("_ _ _ _");
    handleThisOrder({});
    handlePayment({});
    handleOrderSpecs([]);
    handleTimer("00:00:00");
  };

  const handleStepBackLoc = (space) => {
    if (space === "toLocation") {
      setIsMoreOneStep(false);
      handleNewLocation(true);
    } else if (space === "toTemplate") {
      setOpenFinalValidation(false);
      handleNewLocation(false);
      setApplyText("Apply");
    }

    validateRef.current.classList.remove("impact_more_step");
  };

  const handleMoveToValidation = () => {
    setIsMoreOneStep(false);
    setOpenFinalValidation(true);
    setApplyText("Minimize");
    handleTicketNumber((totalPrice - 3).toString(16));
    handleHoursPrint(moment().format("hh:mm a"));
    handleTimer("02:00:00");
    validateRef.current.classList.add("impact_more_step");
  };

  function getCookies() {
    let cookies = document.cookie.split(";").reduce((cookies, cookie) => {
      const [name, val] = cookie.split("=").map((c) => c.trim());
      cookies[name] = val;
      return cookies;
    }, {});
    return cookies;
  }

  const handleControlRadio = async (e) => {
    console.log(e.target);

    if (e.target.id === "reg_price_2") {
      const cookies = getCookies();
      const userId = cookies.userId;
      console.log("cookies userId:", userId);

      if (userId === undefined) {
        setTimeout(() => {
          handleFirstTimeOrder(true);
          // dispatch(templateActions.handleFirstTimeOrder(true));
        }, 1000);
        totalRef.current.classList.add("anim_height");
        setTimeout(async () => {
          await applyOrderRef.current.classList.add("addShowBtn");
        }, 2000);
        return;
      } else {
        handleFirstTimeOrder(false);
        if (thisOrder._id !== undefined) {
          /*  await dispatch(templateActions.handleFirstTimeOrder(false)); */
          console.log("saved and updated my order (thisOrder):", thisOrder);

          const newChange = await updateThisTotalPriceOrder(
            thisOrder._id,
            orderSpecsCurrent
          );

          handleThisOrder(newChange);

          /* const renewTheOrder = await templateActions.handleThisOrder(newChange); */

          setTimeout(() => {
            console.log("new this order send back:", newChange);
          }, 1000);

          setShowTotalPrice(newChange.totalPrice);
          handleTotalPrice(newChange.totalPrice);

          /* await dispatch(
          templateActions.handleTotalPrice(renewTheOrder.totalPrice)
        ); */
        } else if (thisOrder._id === undefined) {
          console.log("user data saved:", user);
          const newTakenOrder = await initiateOrder(
            user.userEmail,
            orderSpecsCurrent
          );

          handleThisOrder(newTakenOrder);

          /* const newThisOrder = await templateActions.handleThisOrder(newChange); */

          setShowTotalPrice(newTakenOrder.totalPrice);

          setTimeout(() => {
            console.log("new taken order command:", newTakenOrder);
          }, 1000);
          handleTotalPrice(newTakenOrder.totalPrice);
        }
      }

      /*  if (orderSpecsCurrent.length >= 3) {
        console.log("fourthMealRef current:", fourthMealRef);
        fourthMealRef.current.classList.add("impact_play");
      } else if (orderSpecsCurrent < 3) {
        fourthMealRef.current.classList.remove("impact_play");
        console.log("fourthMealRef current:", fourthMealRef);
      } */

      applyOrderRef.current.classList.add("addShowBtn");
      totalRef.current.classList.add("anim_height");
    } else if (e.target.id === "reg_price_1") {
      setShowTotalPrice("_" + " " + "_" + " " + "_" + " " + "_");
      setTimeout(() => {
        console.log("update showTotalPrice");
      }, 2500);

      applyOrderRef.current.classList.remove("addShowBtn");
      totalRef.current.classList.add("anim_height");
    }
  };

  const openToNewLocation = () => {
    if (applyText === "Apply") {
      handleNewLocation(true);
    } else if (applyText === "Minimize") {
      ticketTempRef.current.style.classList.add("anim_hide_template");
      // add anim show bookOrder
      ticketManualRef.current.style.classList.add("anim_show_book");
    }
  };

  const lastingTimeError = (e) => {
    setIsError(true);
    setForseen(false);
    if (e.target.id === "btn_validate_order") {
      setComponentSectionName("validateButton");
      setMessageError("Cannot Apply More than 3 dressing Orders!");
    } else if (e.target.id === "btn_play_game") {
      setComponentSectionName("fourthMealButton");
      if (orderSpecsCurrent.length >= 3) {
        setForseen(true);
      } else {
        setMessageError("at least you have to command 3 meals!");
      }
    }
    setTimeout(() => {
      setIsError(true);
    }, 6000);
  };

  const lookingForGameOrValidation = (e) => {
    //indulge 3 template ticket at more
    if (e.target.id === "btn_validate_order" && countClickValidate < 2) {
      const newCount = countClickValidate + 1;
      handleCountClickValidate(newCount);
    } else {
      lastingTimeError(e);
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    console.log(e.target);
    openToNewLocation();
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
      handleTimer(
        (hrs > 9 ? hrs : "0" + hrs) +
          ": " +
          (min > 9 ? min : "0" + min) +
          ":" +
          (sec > 9 ? sec : "0" + sec)
      );

      /*  dispatch(
        templateActions.handleTimer(
          (hrs > 9 ? hrs : "0" + hrs) +
            ": " +
            (min > 9 ? min : "0" + min) +
            ":" +
            (sec > 9 ? sec : "0" + sec)
        )
      ); */
    }
  };

  const clearTimer = (cb) => {
    handleTimer("02:00:00");
    // dispatch(templateActions.handleTimer("02:00:00"));

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // if you want it to be triggered while rendering - have  a try !

  /* useEffect(() => {
    clearTimer(getDeadTime());
  }, []); */

  useEffect(() => {
    console.log("present navbar");
    setTimeout(() => {
      handleWelcome(false);
      /* dispatch(mealActions.handleWelcome(false)); */
    }, 3000);
  }, []);

  useEffect(() => {}, [indexDayFormat]);

  useEffect(() => {
    console.log("this place redirect to login or register form!");
  }, [firstTimeOrder]);

  useEffect(() => {
    console.log(
      "This have to Update The quantity and mini Total Price Template Ticket!"
    );
  }, [orderSpecsCurrent, dataTemplatesOrdersDay, applyText]);

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
                    /* quantity={orderSpecItem.quantity} */
                    origin={mealItem.origin}
                    ratings={mealItem.ratings}
                    price={mealItem.price}
                    image={mealItem.image}
                    setShowTotalPrice={setShowTotalPrice}
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

      {Array.from(dataTemplatesOrdersDay).length > 1 && (
        <div className="template_slider_wrapper">
          {Array.from(dataTemplatesOrdersDay).map((orderOfDay, orderIndex) => {
            return (
              <TemplateOrder
                key={orderIndex}
                id={orderIndex}
                dataTemplate={orderOfDay}
                callTimer={callTimer}
                lookingForGameOrValidation={lookingForGameOrValidation}
                isError={isError}
              />
            );
          })}
        </div>
      )}

      {Array.from(dataTemplatesOrdersDay).length > 1 && (
        <div className="template_slider_wrapper">
          <Slider {...settings}>
            {Array.from(dataTemplatesOrdersDay).map(
              (orderOfDay, orderIndex) => {
                return (
                  <TemplateOrder
                    key={orderIndex}
                    id={orderIndex}
                    dataTemplate={orderOfDay}
                  />
                );
              }
            )}
          </Slider>
        </div>
      )}

      {orderSpecsCurrent.length !== 0 &&
        dataTemplatesOrdersDay.length === 0 && (
          <div className="available_ticket">
            <div
              className="available_book_content"
              ref={ticketManualRef}
              onClick={() => hideOrShowBookManual("show")}
            >
              <div className="available_book_order">
                <div className="entitled">
                  <span className="title_order">1 Book Order</span>
                </div>
                <div className="logo_restaurant">
                  <span className="label_restaurant">TDS</span>
                </div>
                <button
                  className="view_template"
                  onClick={() => hideOrShowBookManual("hide")}
                >
                  template
                </button>
              </div>
            </div>
            <div className="available_ticket_content" ref={ticketTempRef}>
              {/* <button className="minimize_template" onclick={openToNewLocation}>
                minimize
              </button> */}
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
                    <h4>{hoursPrinted}</h4>
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
                    {orderSpecsCurrent.map((order, i) => {
                      const mealId = order.meal;
                      const meal = meals.find((item) => item._id === mealId);
                      const qty = order.quantity;
                      const minTotal = (meal.price * qty).toFixed(2);
                      return (
                        <>
                          <tbody key={i}>
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
                        <td>${showTotalPrice}</td>
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
                      $ {showTotalPrice}
                    </span>
                    <div className="submit_container" ref={applyOrderRef}>
                      <ButtonApply type="submit" applyText={applyText} />
                    </div>
                  </form>
                </div>

                {firstTimeOrder && (
                  <div className="appealing_registration">
                    {/* //write css */}
                    <LogOrRegisterForm setShowTotalPrice={setShowTotalPrice} />
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

                      <li className="time_left">{timerIn}</li>
                    </ul>
                  </div>
                  {isOneMoreStep && (
                    <OneMoreStep
                      handleStepBackLoc={handleStepBackLoc}
                      handleMoveToValidation={handleMoveToValidation}
                    />
                  )}
                </div>

                <div className="address_customers">
                  <div className="address_side">
                    <p>Location : ${thisOrder.street} </p>
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
                      onClick={(e) => lookingForGameOrValidation(e)}
                    >
                      validate
                    </button>
                    <button
                      type="button"
                      id="btn_play_game"
                      className="btn_play_game"
                      ref={fourthMealRef}
                      onClick={(e) => lookingForGameOrValidation(e)}
                    >
                      Fourth Meal Game
                    </button>

                    {isError && (
                      <ErrorWarning
                        message={messageError}
                        componentSectionName={componentSectionName}
                        forseen={forseen}
                      />
                    )}

                    {openFinalValidation && (
                      <ConfirmOrder
                        handleStepBackLoc={handleStepBackLoc}
                        validateThisOrder={validateThisOrder}
                      />
                    )}
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
                          <li id="paypal_method">
                            {/* <span>use</span> */}
                            <span>
                              <i className="fa-brands fa-cc-paypal"></i>
                            </span>
                          </li>
                          <li id="mtn_method">
                            {/* <span>use</span> */}
                            <span>
                              <img
                                src={MTN}
                                className="img_payment"
                                alt="missing payment"
                              />
                            </span>
                          </li>
                          <li id="orange_method">
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
                  {isNewLocation && (
                    <NewLocationOrder
                      setIsMoreOneStep={setIsMoreOneStep}
                      setDataNewLocation={setDataNewLocation}
                      dataNewLocation={dataNewLocation}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
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
                <CardDayOrders
                  key={orderOftheDay.length}
                  ordersSpecs={ordersSpecs}
                />
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
                  <CardWeek key={i} id={i} handleDayShift={handleDayShift} />
                );
              })}

              {/*  <li>
                <span className="day_week">MON</span>
                <span className="day_count">16</span>
              </li> */}
            </ul>

            <div className="days_week_order">
              <ul className="days_dish_recap">
                {isanOrderDay ? (
                  orders?.map((item, i) => {
                    let dateOrderedFormat = item.dateOrdered.format("MMM D");

                    if (dateOrderedFormat === indexDayFormat) {
                      return (
                        <CardWeekOrders
                          key={i}
                          ordersSpecs={item.ordersSpecs}
                        />
                      );
                    } else {
                      return (
                        <div className="wrapper_no_items">
                          <div className="content_no">
                            <span className="no_items">No Items</span>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="wrapper_no_items">
                    <div className="content_no">
                      <span className="no_items">No Items</span>
                    </div>
                  </div>
                )}
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
