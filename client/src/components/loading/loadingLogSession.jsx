import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { templateActions } from "../../services/redux/createslice/TemplateSlice";
import { mealActions } from "../../services/redux/createslice/MealSplice";
import { userLogging } from "../../callAPI/UsersApi";
import { initiateOrder } from "../../callAPI/OrdersApi";
import moment from "moment";
import "./loadingLogSession.css";

function LoadingLogSession({ loginData, setIsLoggingDataSession }) {
  const dispatch = useDispatch();
  // branching your data to Local Storage
  const appState = JSON.parse(localStorage.getItem("appState"));

  const user = appState.mealPrime.user;
  /* const user = useSelector(user_section); */

  const orderSpecsCurrent = appState.orderPrime.orderSpecsCurrent;
  const thisOrder = appState.orderPrime.thisOrder;
  const totalPrice = appState.orderPrime.totalPrice;

  const updateLogSession = async () => {
    const userInfo = await updateUserData();
    console.log("user here:", userInfo);
    const myOrder = await updateOrderedSpecData(userInfo);
    console.log("this order once again here:", myOrder);
    updatefieldTemplate(myOrder);
  };

  const updateUserData = async () => {
    let { email, password } = loginData;
    console.log("loginData:", loginData);

    const userInfo = await sendLoggingData({ email, password });
    return userInfo;
  };

  const updateOrderedSpecData = async (userInfo) => {
    const myOrder = await updateUserandInitOrder(userInfo);
    setTimeout(() => {
      console.log("updating ordered specs data!");
    }, 2000);
    return myOrder;
  };

  const sendLoggingData = async ({ email, password }) => {
    console.log(`that email: ${email}, that password:  ${password}`);
    const res = await userLogging({ email, password });

    return res;
  };

  const updateUserandInitOrder = async (userInfo) => {
    await dispatch(mealActions.handleUser(userInfo));

    const userEmail = userInfo.userEmail;

    console.log("user email Log session", userEmail);

    let myOrderIn;
    const initThatOrder = async () => {
      const res = await initiateOrder(userEmail, orderSpecsCurrent);
      return res;
    };
    myOrderIn = await initThatOrder();
    await dispatch(templateActions.handleThisOrder(myOrderIn));

    console.log("that result here:", myOrderIn);
    myOrderIn;
    return myOrderIn;
  };

  const updatefieldTemplate = (myOrder) => {
    setTimeout(async () => {
      /*  console.log("this order in templateSlice :", thisOrderSplice); */

      console.log("this order in appState:", thisOrder);

      let totalPriceIn = catchTotalPrice(myOrder);

      await dispatch(templateActions.handleTotalPrice(totalPriceIn));

      let currentTime = moment().format("hh:mm a");
      await dispatch(templateActions.handleHoursPrint(currentTime));
    }, 3500);

    setTimeout(async () => {
      let codePayment = (totalPrice - 3).toString(16);
      await dispatch(templateActions.handleTicketNumber(codePayment));

      setIsLoggingDataSession(false);

      await dispatch(templateActions.handleFirstTimeOrder(false));

      console.log("updation ended");
    }, 3000);
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

  useEffect(() => {
    setTimeout(async () => {
      console.log("updating Orders Specification when logging!");
      await updateLogSession();
    }, 3000);
  }, []);

  return (
    <div className="load_log_wrapper">
      <ul className="load_log_content">
        <li>
          <span className="load_log_text">Loading</span>
        </li>
      </ul>
    </div>
  );
}

export default LoadingLogSession;
