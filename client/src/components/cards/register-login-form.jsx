import React, { useContext, useRef, useState, useEffect } from "react";
import LoadingLogSession from "../loading/loadingLogSession";
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
  const [isloggingDataSession, setIsLoggingDataSession] = useState(false);
  const [loginData, setLoginData] = useState({});

  const [ticketNumber, setTicketNumber] = useState("_ _ _ _ _ _");
  const [hoursPrinted, setHoursPrinted] = useState("time");

  // branching your data to Local Storage
  const appState = JSON.parse(localStorage.getItem("appState"));

  const user = appState.mealPrime.user;
  /* const user = useSelector(user_section); */

  const orderSpecsCurrent = appState.orderPrime.orderSpecsCurrent;
  const thisOrder = appState.orderPrime.thisOrder;
  const totalPrice = appState.orderPrime.totalPrice;

  const thisOrderSplice = useSelector(thisOrder_section);

  const handleRegistering = (e) => {
    e.preventDefault();
    let registeringData;
    let password = e.target.elements.password.value;
    let city = e.target.elements.city.value;
    let street = e.target.elements.street.value;
    let country = e.target.elements.country.value;
    let phone = e.target.elements.phone.value;
    let email = e.target.elements.email.value;
    if (
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

      password === "";
      city === "";
      street === "";
      country === "";
      phone === "";
      email === "";
      return;
    }

    // right data
    registeringData = { password, city, street, country, phone, email };

    console.log(registeringData);

    // updateRegiSession(myOrder, false);

    updateRegiSession({ password, city, street, country, phone, email }, false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
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
    setLoginData(() => {
      return { email, password };
    });
    setTimeout(() => {
      setIsLoggingDataSession(true);
    }, 3000);
  };

  const updateRegiSession = async (
    { password, city, street, country, phone, email },
    firstStatus
  ) => {
    const goToUser = await sendRegisteringData(
      password,
      city,
      street,
      country,
      phone,
      email
    );

    updateUserandInitOrder(goToUser);

    console.log("thisorder when registering  :", thisOrder);
    console.log("user when registerings :", user);

    updatefieldTemplate(firstStatus);
  };

  /* const sendLoggingData = async ({ email, password }) => {
    console.log(`that email: ${email}, that password:  ${password}`);
    const res = await userLogging({ email, password });

    return res;
  }; */

  const sendRegisteringData = async ({
    password,
    city,
    street,
    country,
    phone,
    email,
  }) => {
    console.log(
      `that email: ${email}, that password:  ${password} , that street: ${street}, ...and so many else`
    );
    const res = await userRegistering({
      password,
      city,
      street,
      country,
      phone,
      email,
    });

    return res;
  };

  const catchTotalPrice = (myOrder) => {
    let total = myOrder;
    console.log("thisorder here :", total);
    let totalArr = Array.from(total);
    let output = "";
    totalArr.map((elt) => {
      output += elt + " ";
    });
    console.log(output);
    return output;
  };

  /*  const updateLogSession = async ({ email, password }) => {
    const goToUser = await sendLoggingData({ email, password });

    const myOrder = await updateUserandInitOrder(goToUser, email);

    return myOrder;
  }; */

  const updateUserandInitOrder = async (goToUser, email) => {
    await dispatch(mealActions.handleUser(goToUser));

    let myOrderIn;

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
      myOrderIn = await initThatOrder();
      await dispatch(templateActions.handleThisOrder(myOrderIn));

      console.log("that result here:", myOrderIn);
    }, 5000);

    setTimeout(() => {
      console.log("update thisOrder data");
      /* setIsUpdate(true) */
    }, 3000);

    return myOrder;
  };

  const updatefieldTemplate = (firstStatus, myOrder) => {
    setTimeout(() => {
      console.log("this order in templateSlice :", thisOrderSplice);

      console.log("this order in appState:", thisOrder);

      let totalPriceIn = catchTotalPrice(myOrder);

      dispatch(templateActions.handleTotalPrice(totalPriceIn));
    }, 3000);

    console.log("total price in login:", totalPrice);

    let currentTime = moment().format("hh:mm a");
    dispatch(templateActions.handleHoursPrint(currentTime));

    let codePayment = (totalPrice - 3).toString(16);
    dispatch(templateActions.handleTicketNumber(codePayment));

    dispatch(templateActions.handleFirstTimeOrder(firstStatus));

    setTimeout(() => {
      console.log("updation ended");
      /*  setIsUpdate(false); */
    }, 3000);
  };

  /* useEffect(() => {
    console.log(
      "This means to update data Order for our template ticket after login or registering"
    );
  }, [isUpdate]); */

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
            {isloggingDataSession && (
              <div className="loading_login_wrapper">
                <LoadingLogSession
                  loginData={loginData}
                  setIsLoggingDataSession={setIsLoggingDataSession}
                />
              </div>
            )}
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
