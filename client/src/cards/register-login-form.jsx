import React, { useContext, useRef, useState } from "react";
import { MealContext } from "../context/MealsContext";
import { TemplateContext } from "../context/TemplateContext";
import { userLogging, userRegistering } from "../callAPI/UsersApi";
import { initiateOrder } from "../callAPI/OrdersApi";
import moment from "moment";
import "./register-login-form.css";

function LogOrRegisterForm() {
  const {
    state: { user },
    handleRegisterForm,
    handleLoginForm,
    handleUser,
  } = useContext(MealContext);

  const {
    state: { orderSpecsCurrent, thisOrder, totalPrice },
    handleThisOrder,
    handleTotalPrice,
    handleTicketNumber,
    handleHoursPrint,
    handleFirstTimeOrder,
  } = useContext(TemplateContext);
  const loginRef = useRef();
  const [errMsgLogin, setErrMsgLogin] = useState(false);
  const [errMsgRegister, setErrMsgRegister] = useState(false);

  const [ticketNumber, setTicketNumber] = useState("_ _ _ _ _ _");
  const [hoursPrinted, setHoursPrinted] = useState("time");

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

    handleUser(async () => await userRegistering(registeringData));

    const myOrder = initiateOrder();

    setTimeout(() => {
      const primarUpdation = async () => {
        await handleTotalPrice(() => {
          let total = myOrder.totalPrice;
          let totalArr = Array.from(total);
          let output = "";
          totalArr.map((elt) => {
            output += elt + " ";
          });
          console.log(output);
          return output;
        });
        await handleHoursPrint(moment().format("hh:mm a"));
      };

      primarUpdation();
    }, 5000);

    setTimeout(() => {
      const secondaryUpdation = async () => {
        await handleTicketNumber((totalPrice - 3).toString(16));
        await handleFirstTimeOrder(false);
      };

      secondaryUpdation();
    }, 4000);
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
    loginData = { email, password };

    setTimeout(() => {
      const primarUpdation = async () => {
        await handleUser(() => userLogging(loginData));
        await handleThisOrder(() => initiateOrder(user.id, orderSpecsCurrent));
      };
      primarUpdation();
    }, 5000);

    setTimeout(() => {
      const secondaryUpdation = async () => {
        await handleTotalPrice(() => {
          let total = thisOrder.totalPrice;
          let totalArr = Array.from(total);
          let output = "";
          totalArr.map((elt) => {
            output += elt + " ";
          });
          console.log(output);
          return output;
        });
        await handleHoursPrint(moment().format("hh:mm a"));
      };
      secondaryUpdation();
    }, 4300);

    setTimeout(() => {
      const thirdlyUpdation = async () => {
        await handleTicketNumber((totalPrice - 3).toString(16));
        await handleFirstTimeOrder(false);
      };
      thirdlyUpdation();
    }, 4000);
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
                    {" "}
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
