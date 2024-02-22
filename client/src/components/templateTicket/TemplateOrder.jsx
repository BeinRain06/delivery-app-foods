import React, { useState, useRef } from "react";
import { TemplateContext } from "../../services/context/TemplateContext";
import { MTN, ORANGE } from "../../assets/images";

import ConfirmOrder from "../process_validation/styledComponents/ConfirmOrder";
import NewLocationOrder from "../process_validation/styledComponents/NewLocationOrder";
import OneMoreStep from "../process_validation/styledComponents/OneMoreStep";
import ButtonApply from "../process_validation/styledComponents/ButtonApply";
import ErrorWarning from "../process_validation/styledComponents/MsgError";
import "./TemplateOrder.css";

function TemplateOrder({ id, dataTemplate }) {
  /*  const {
    state: { isNewLocation, firstTimeOrder },
    handleFirstTimeOrder,
    handleTotalPrice,
    handleNewLocation,
  } = useContext(TemplateContext); */

  const {
    state: {
      firstTimeOrder,
      orderSpecsCurrent,
      thisOrder,
      dataTemplatesOrdersDay,
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
  } = useContext(TemplateContext);

  const ticketTempRef = useRef(null);
  const ticketManualRef = useRef(null);
  const totalRef = useRef(null);
  const applyOrderRef = useRef(null);
  const newRadioRefOne = useRef(null);
  const newRadioRefTwo = useRef(null);
  const newLocationRef = useRef(null);
  const newCityRef = useRef(null);
  const newStreetRef = useRef(null);
  const oneMoreStepRef = useRef(null);
  const minimizeOrApplyRef = useRef(null);
  const validateRef = useRef(null);
  const fourthMealRef = useRef(null);

  const [showTotalPrice, setShowTotalPrice] = useState("_ _ _ _");
  //process validation Hook
  const [openFinalValidation, setOpenFinalValidation] = useState(false);
  const [isOneMoreStep, setIsMoreOneStep] = useState(false);
  const [applyText, setApplyText] = useState("Apply");
  const [forseen, setForseen] = useState(false);
  const [chooseTimer, setChooseTimer] = useState("00:00:00");

  //recording template data order
  const [dataResume, setDataResume] = useState({});

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
          handleFirstTimeOrder(true);
          /* dispatch(templateActions.handleFirstTimeOrder(true)); */
        }, 3000);
        return;
      } else {
        handleFirstTimeOrder(false);
        /* await dispatch(templateActions.handleFirstTimeOrder(false)); */

        const newThisOrder = await initiateOrder(user.id, orderSpecsCurrent);

        handleTotalPrice(newThisOrder.totalPrice);
        /* 
        await dispatch(
          templateActions.handleTotalPrice(newThisOrder.totalPrice)
        ); */
      }

      applyOrderRef.current.classList.add("addShowBtn");
      totalRef.current.classList.add("anim_height");
    } else if (e.target.id === "reg_price_1") {
      handleTotalPrice(() => "_" + " " + "_" + " " + "_" + " " + "_");

      applyOrderRef.current.classList.remove("addShowBtn");
      totalRef.current.classList.add("anim_height");
    }
  };

  const handleFirstStepLoc = (e) => {
    e.preventDefault();
    if (newRadioRefOne.current.checked) {
      let phone = e.target.elements.newNum;
      if (phone.value === "") {
        alert("Please Enter a phone number");
        handleNewLocation(false);
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
      handleNewLocation(false);
      phone.value = "";

      //move to one more step
      oneMoreStepRef.current.style.visibility = "visible";
    } else if (newRadioRefTwo.current.checked) {
      let phone = e.target.elements.newNum;
      let city = e.target.elements.newCity;
      let street = e.target.elements.newStreet;

      if (phone.value === "" || city.value === "" || street.value === "") {
        alert("Please Enter All the field");
        handleNewLocation(false);
        return;
      }
      let newlocation = {
        phone: phone.value,
        city: city.value,
        street: street.value,
      };
      setDataNewLocation(newlocation);

      //close new location box
      handleNewLocation(false);
      /* dispatch(templateActions.handleNewLocation(false)); */

      phone.value === "";
      city.value === "";
      street.value === "";

      //move to one more step
      oneMoreStepRef.current.style.visibility = "visible";
    }
  };

  const closeFromNewLocation = () => {
    handleNewLocation(false);
    /* dispatch(templateActions.handleNewLocation(false)); */
  };

  const resetDataHoldingTemplate = () => {
    handleTicketNumber("_ _ _ _ _ _");
    handleHoursPrint("time");
    handleTotalPrice("_ _ _ _");
    handleThisOrder({});
    handlePayment({});
    handleClearOrderSpecs([]);
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

  // HERE ===>  NEXT FUNCTION TO IMPLEMENT ACTION   <=== HERE
  const validateThisOrder = () => {
    validateRef.current.classList.remove("impact_more_step");

    /* revisit ALL ACTIONS UNDERNEATH */

    //not yet ( this update)
    const newPartLocation = updateThisLocationOrder(
      dataNewLocation,
      thisOrder.id
    );

    /* dispatch(templateActions.handleThisOrder(newPartLocation));
    let timerOn = callTimer();
    dispatch(templateActions.handleTimer(timerOn));
    dispatch(templateActions.wholeCountDownTimersDay(callTimer())); */

    handleThisOrder(newPartLocation);
    let timerOn = callTimer();
    handleTimer(timerOn);
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

    if (dataTemplatesOrdersDay.length === 3) {
      alert("You can't send more than 3 orders");
      return;
    }
    handleTemplateOrdersDay(templateOrderVar);
    // dispatch(templateActions.handleTemplateOrdersDay(templateOrderVar));

    //reset variable involved in template_order
    resetDataHoldingTemplate();
  };

  function getCookies() {
    let cookies = document.cookie.split(";").reduce((cookies, cookie) => {
      const [name, val] = cookie.split("=").map((c) => c.trim());
      cookies[name] = val;
      return cookies;
    }, {});
    return cookies;
  }

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

  const currenTimer = () => {
    const tmpTimer =
      dataTemplate.timer === "02:00:00" ? callTimer() : "00:00:00";
    setChooseTimer(tmpTimer);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    console.log(e.target);
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

  const openToNewLocation = () => {
    if (applyText === "Apply") {
      handleNewLocation(true);
    } else if (applyText === "Minimize") {
      ticketTempRef.current.style.classList.add("anim_hide_template");
      // add anim show bookOrder
      ticketManualRef.current.style.classList.add("anim_show_book");
    }
  };

  useEffect(() => {
    console.log("this place redirect to login or register form!");
  }, [firstTimeOrder]);

  useEffect(() => {
    console.log(
      "This have to Update The quantity and mini Total Price Template Ticket!"
    );

    currenTimer();

    if (orderSpecsCurrent.length >= 3) {
      setForseen(true);
    } else {
      setForseen(false);
    }
  }, [orderSpecsCurrent, dataTemplatesOrdersDay, applyText]);

  return (
    <div className="template_slider_boundary">
      <div className="template_slider_content">
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
            <h4 className="title_order">Sample </h4>
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
                  {/* <h4>{dataTemplate.value.hoursPrinted}</h4> */}
                  <h4>{hoursPrinted}</h4>
                </div>
                <div className="statement_to_client">
                  <p>AS you order, your time is valued by our Team</p>
                </div>
              </div>
              <div className="type_sample">
                <p style={{ fontWeight: "bold" }}>Delivery Foods</p>
                {/* <p>Ticket N³%: {dataTemplate.value.ticketNumber} </p> */}
                <p>Ticket N³%: 2305467957890021 </p>
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

                  {dataTemplate.value.orderSpecsCurrent.map((order, i) => {
                    const meal = order.meal;
                    const qty = order.quantity;
                    const minTotal = (meal.price * qty).toFixed(2);
                    return (
                      <tbody>
                        <tr>
                          <td>{meal.name}</td>
                          <td>{qty}</td>
                          <td>${meal.price}</td>
                          <td>${minTotal}</td>
                        </tr>
                      </tbody>
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
                <div
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
                    {/* {dataTemplate.value.totalPrice} */}${showTotalPrice}
                  </span>
                  <div className="submit_container" ref={applyOrderRef}>
                    <ButtonApply type="submit" applyText={applyText} />
                  </div>
                </div>
              </div>

              {firstTimeOrder && (
                <div className="appealing_registration">
                  {/* //write css */}
                  <LogOrRegisterForm setShowTotalPrice={setShowTotalPrice} />
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

                    <li className="time_left">{chooseTimer}</li>
                  </ul>
                  {isOneMoreStep && (
                    <OneMoreStep
                      handleStepBackLoc={handleStepBackLoc}
                      handleMoveToValidation={handleMoveToValidation}
                    />
                  )}
                </div>
              </div>

              <div className="address_customers">
                <div className="address_side">
                  <p>Location : ${thisOrder.street}</p>
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
                    ref={fourthMealRef}
                    onClick={() => (
                      <ErrorWarning
                        message="at least you have to command 3 meals!"
                        componentSectionName="fourthMealButton"
                        forseen={forseen}
                      />
                    )}
                  >
                    Fourth Meal Game
                  </button>

                  {openFinalValidation && (
                    <ConfirmOrder
                      setOpenFinalValidation={setOpenFinalValidation}
                      setApplyText={setApplyText}
                      handleStepBackLoc={handleStepBackLoc}
                    />
                  )}
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
                <p> ORDER {num} </p>
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
      </div>
    </div>
  );
}

export default TemplateOrder;
