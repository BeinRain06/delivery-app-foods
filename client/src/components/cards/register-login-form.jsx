import React, { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mealActions } from "../../services/redux/createslice/MealSplice";
import { templateActions } from "../../services/redux/createslice/TemplateSlice";
import {
  thisOrder_section,
  totalPrice_section,
  orderSpecsCurrent_section,
} from "../../services/redux/createslice/TemplateSlice";
import { user_section } from "../../services/redux/createslice/MealSplice";
import { userLogging, userRegistering } from "../../callAPI/UsersApi";
import { initiateOrder } from "../../callAPI/OrdersApi";
import moment from "moment";
import "./register-login-form.css";

function LogOrRegisterForm() {
  const dispatch = useDispatch();

  const loginRef = useRef();
  const [errMsgLogin, setErrMsgLogin] = useState(false);
  const [errMsgRegister, setErrMsgRegister] = useState(false);

  const [ticketNumber, setTicketNumber] = useState("_ _ _ _ _ _");
  const [hoursPrinted, setHoursPrinted] = useState("time");

  // branching your data to Local Storage
  const appState = JSON.parse(localStorage.getItem("appState"));

  const user = appState.mealPrime.user;
  /* const user = useSelector(user_section); */

  const orderSpecsCurrent = appState.orderPrime.orderSpecsCurrent;
  const thisOrder = appState.orderPrime.thisOrder;
  const totalPrice = appState.orderPrime.totalPrice;

  const handleRegistering = (e) => {
    e.preventDefault();
    let registeringData;
    let name = e.target.elements.name.value;
    let password = e.target.elements.password.value;
    let city = e.target.elements.city.value;
    let street = e.target.elements.street.value;
    let country = e.target.elements.country.value;
    let phone = e.target.elements.phone.value;
    let email = e.target.elements.email.value;
    if (
      name === "" ||
      password === "" ||
      city === "" ||
      street === "" ||
      country === "" ||
      phone === "" ||
      email === ""
    ) {
      setErrMsgRegister(true);

      setTimeout(() => {
        setErrMsgRegister(false);
      }, 3000);

      name === "";
      password === "";
      city === "";
      street === "";
      country === "";
      phone === "";
      email === "";
      return;
    }

    registeringData = { name, password, city, street, country, phone, email };
    console.log(registeringData);

    dispatch(
      mealActions.handleUser(async () => await userRegistering(registeringData))
    );

    const myOrder = initiateOrder();

    updateRegiSession(myOrder, false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let loginData;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    if (email === "" || password === "") {
      setTimeout(() => {
        setErrMsgLogin(true);
      }, 3000);
      setErrMsgLogin(false);
      email === "";
      password === "";
      return;
    }
    //right data
    loginData = { email, password };

    updateLogSession({ email, password }, false);
  };

  const updateRegiSession = (myOrder, firstStatus) => {
    setTimeout(() => {
      dispatch(
        templateActions.handleTotalPrice(() => {
          let total = myOrder.totalPrice;
          let totalArr = Array.from(total);
          let output = "";
          totalArr.map((elt) => {
            output += elt + " ";
          });
          console.log(output);
          return output;
        })
      );
    }, 3000);

    dispatch(templateActions.handleHoursPrint(moment().format("hh:mm a")));
    dispatch(templateActions.handleTicketNumber((totalPrice - 3).toString(16)));
    dispatch(templateActions.handleFirstTimeOrder(firstStatus));
  };

  const sendLoggingData = async ({ email, password }) => {
    console.log(`that email: ${email}, that password:  ${password}`);
    const res = await userLogging({ email, password });

    return res;
  };

  const updateLogSession = async ({ email, password }, firstStatus) => {
    const goToUser = await sendLoggingData({ email, password });

    dispatch(mealActions.handleUser(goToUser));

    const isEmptyObject = (specUser) => {
      return JSON.stringify(specUser);
    };

    const userObj = isEmptyObject(user);

    const userData =
      userObj !== "{}"
        ? { user: user.id, type: "id" }
        : { user: email, type: "email" };

    console.log("user data", userData);

    setTimeout(async () => {
      const initThatOrder = async () => {
        const res = await initiateOrder(userData, orderSpecsCurrent);
        return res;
      };

      let result = await initThatOrder();

      dispatch(templateActions.handleThisOrder(result));
    }, 3000);

    console.log("thisorder :", thisOrder);
    console.log("user:", user);

    setTimeout(() => {
      const catchTotalPrice = () => {
        let total = thisOrder;
        console.log("thisorder here :", total);
        let totalArr = Array.from(total);
        let output = "";
        totalArr.map((elt) => {
          output += elt + " ";
        });
        console.log(output);
        return output;
      };
      let totalPriceIn = catchTotalPrice();

      dispatch(templateActions.handleTotalPrice(totalPriceIn));
    }, 3000);

    let currentTime = moment().format("hh:mm a");
    dispatch(templateActions.handleHoursPrint(currentTime));

    let codePayment = (totalPrice - 3).toString(16);
    dispatch(templateActions.handleTicketNumber(codePayment));

    dispatch(templateActions.handleFirstTimeOrder(firstStatus));
  };

  return (
    <div className="registration_wrapper">
      <div className="register_content">
        <div className="login_face" ref={loginRef}>
          <h3 className="title_appeal_log">LoGin</h3>
          <form className="login_panel_control" onSubmit={handleLogin}>
            {/* <label htmlFor="login">login</label> */}
            <ul>
              <li>
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  name="email"
                  id="user_email"
                  className="user_email common_layout"
                />
              </li>
              <li>
                <label htmlFor="password">password</label>
                <input
                  type="text"
                  name="password"
                  id="user_password"
                  className="user_password common_layout"
                />
              </li>
              {errMsgLogin && (
                <li className="warning_msg_wrap">
                  <span className="warning_msg">
                    Please Fill all the Fields !
                  </span>
                </li>
              )}
              <li>
                <button
                  type="submit"
                  id="btn_ratings_login"
                  className="btn_ratings_login"
                >
                  Login
                </button>
              </li>
            </ul>
          </form>
        </div>
        <div className="registering_face">
          <h3 className="title_appeal_reg ">reGisTer</h3>
          <form className="register_panel_control" onSubmit={handleRegistering}>
            <ul>
              <li>
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  name="email"
                  id="user_email"
                  className="user_email common_layout"
                />
              </li>
              <li>
                <label htmlFor="password">password</label>
                <input
                  type="text"
                  name="password"
                  id="user_password"
                  className="user_password common_layout"
                />
              </li>
              <li>
                <label htmlFor="city">city</label>
                <input
                  type="text"
                  name="city"
                  id="user_city"
                  className="user_city common_layout"
                />
              </li>
              <li>
                <label htmlFor="street">street</label>
                <input
                  type="text"
                  name="street"
                  id="user_street"
                  className="user_street common_layout"
                />
              </li>
              <li>
                <label htmlFor="country">country</label>
                <input
                  type="text"
                  name="country"
                  id="user_country"
                  className="user_country common_layout"
                />
              </li>
              <li>
                <label htmlFor="phone">phone</label>
                <input
                  type="text"
                  name="phone"
                  id="user_phone"
                  className="user_phone common_layout"
                />
              </li>
              <li>
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  name="email"
                  id="user_email"
                  className="user_email common_layout"
                />
              </li>
              <li>
                {errMsgRegister && (
                  <li className="warning_msg_wrap">
                    <span className="warning_msg">
                      {" "}
                      Please Fill all the Fields !
                    </span>
                  </li>
                )}
                <button
                  type="submit"
                  id="btn_ratings_register"
                  className="btn_ratings_register"
                >
                  Register
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogOrRegisterForm;
