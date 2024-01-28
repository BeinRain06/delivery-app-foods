import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  templateActions,
  recordAllTemplateSliceState,
} from "../redux/services/TemplateSlice";
import { dataTemplatesOrdersDay_section } from "../redux/services/TemplateSlice";

import "./TemplateOrder.css";

function TemplateOrder({ timer }) {
  /*  const {
    state: { dataTemplatesOrdersDay },
    handleTemplateOrdersDay,
    useAsyncGenerator,
  } = useContext(MealContext); */

  const dispatch = useDispatch();

  const dataTemplatesOrdersDay = useSelector(dataTemplatesOrdersDay_section);

  const nextBtnRef = useRef(null);
  const ticketTempRef = userRef(null);
  const ticketManualRef = useRef(null);

  const templateState = dispatch(
    templateActions.useAsyncGenerator(createTemplateIterator)
  );

  let templateVar = {
    orderSpecsCurrent: template.orderSpecsCurrent,
    thisOrder: template.thisOrder,
    ticketNumber: template.ticketNumber,
    hoursPrinted: template.hoursPrinted,
    totalPrice: template.totalPrice,
    timer: template.timer,
    payment: template.payment,
  };

  function* createTemplateIterator() {
    let index = 0;
    const dataTemplate = dataTemplatesOrdersDay;

    while (true) {
      yield dataTemplate[index++ % dataTemplate.length];
    }
  }

  /*  const createTemplateIterator* = () => {
    let index= 0;
  }; */

  return (
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
              <h4>{templateState.value.hoursPrinted}</h4>
              {/* change with ok button last step */}
            </div>
            <div className="statement_to_client">
              <p>AS you order, your time is valued by our Team</p>
            </div>
          </div>
          <div className="type_sample">
            <p style={{ fontWeight: "bold" }}>Delivery Foods</p>
            <p>Ticket N³%: {templateState.value.ticketNumber} </p>
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
              {templateState.value.orderSpecsCurrent.map((order, i) => {
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
                <td>${templateState.value.thisOrder.totalPrice}</td>
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
                $ {templateState.value.totalPrice}
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

            <div className="next_more_order">
              <button
                type="button"
                className="btn_next_template"
                ref={nextBtnRef}
                onClick={templateState.refetch}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateOrder;
