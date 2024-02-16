import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { templateActions } from "../../services/redux/createslice/TemplateSlice";
import { dataTemplatesOrdersDay_section } from "../../services/redux/createslice/TemplateSlice";
import { TemplateContext } from "../../services/context/TemplateContext";
import { MTN, ORANGE } from "../../assets/images";

import "./TemplateOrder.css";

function TemplateOrder({ id, dataTemplate }) {
  /* const dispatch = useDispatch();
  const appState = JSON.parse(localStorage.getItem("appState"));
  const isNewLocation = appState.orderPrime.orderSpecsCurrent;
  const firstTimeOrder = appState.orderPrime.firstTimeOrder; */

  const {
    state: { isNewLocation, firstTimeOrder },
    handleFirstTimeOrder,
    handleTotalPrice,
    handleNewLocation,
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

  const hideBookManual = () => {
    // hide anim show bookOrder
    ticketManualRef.current.style.classList.add("anim_show_book");

    ticketTempRef.current.style.classList.remove("anim_hide_template");
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

      /* dispatch(
        templateActions.handleTotalPrice(
          "_" + " " + "_" + " " + "_" + " " + "_"
        )
      ); */
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
        /* dispatch(templateActions.handleNewLocation(false)); */
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
      // dispatch(templateActions.handleNewLocation(false));
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
        /*  dispatch(templateActions.handleNewLocation(false)); */
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

  const handleStepBackLoc = () => {
    oneMoreStepRef.current.style.visibility = "hidden";
    handleNewLocation(true);
    /*  dispatch(templateActions.handleNewLocation(true)); */
    validateRef.current.style.classList.remove("impact_more_step");
  };

  const validateThisOrder = () => {
    minimizeOrApplyRef.current.textContent = "Minimize";

    validateRef.current.style.border = "2px solid yellow"; // rather add a class (enhance border, border-radius=50% ---> after click go back to default way is was displaying)

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

    handleTemplateOrdersDay(templateOrderVar);

    /* dispatch(templateActions.handleTemplateOrdersDay(templateOrderVar)); */

    //reset variable involved in template_order
    resetDataHoldingTemplate();
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  const handleMoveToValidation = () => {
    oneMoreStepRef.current.style.visibility = "hidden";
    validateRef.current.style.classList.add("impact_more_step");

    handleTicketNumber((totalPrice - 3).toString(16));
    handleHoursPrint(moment().format("hh:mm a"));
    handleTimer("02:00:00");

    /* dispatch(templateActions.handleTicketNumber((totalPrice - 3).toString(16)));
    dispatch(templateActions.handleHoursPrint(moment().format("hh:mm a")));
    dispatch(templateActions.handleTimer("02:00:00")); */
  };

  const openToNewLocation = () => {
    if (minimizeOrApplyRef.current.textContent === "Apply") {
      handleNewLocation(true);
      /*  dispatch(templateActions.handleNewLocation(true)); */
    } else if (minimizeOrApplyRef.current.textContent === "Minimize") {
      ticketTempRef.current.style.classList.add("anim_hide_template");

      // add anim show bookOrder
      ticketManualRef.current.style.classList.add("anim_show_book");
    }
  };

  return (
    <div className="template_slider_boundary">
      <div className="template_slider_content">
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
            <h4 className="title_order">Sample {name}</h4>
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
                  <h4>15:46:38</h4>
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
                      <td>${thisOrder.totalPrice}</td>
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
                    ${dataTemplate.value.totalPrice}
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
                </div>
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

                    <li className="time_left">01:45:32</li>
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

                <div className="next_more_order">
                  {/* <button
                type="button"
                className="btn_next_template"
                ref={nextBtnRef}
                onClick={dat.refetch}
              >
                Next
              </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateOrder;
