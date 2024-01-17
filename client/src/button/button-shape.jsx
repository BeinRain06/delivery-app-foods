import React, { useState, useEffect, useContext } from "react";
import { TemplateContext } from "../context/TemplateContext";
import "./button-shape.css";

export const Ordered = () => {
  return (
    <li className="btn_wrap_order">
      <button type="button" className=" btn btn_ordered">
        Ordered
      </button>
    </li>
  );
};

function Button({ mealid, mealname, mealprice }) {
  const {
    state: { orderSpecsCurrent },
    handleOrderSpecs,
  } = useContext(TemplateContext);

  const [isClicked, setIsCliked] = useState(false);
  let eltTarget = null;

  const upstreamOrder = (e) => {
    return new Promise(function (resolve, reject) {
      setIsCliked(true);
      console.log(e.target);
      eltTarget = e.target;
      const orderItems = buildOrderItem(eltTarget);

      setTimeout(() => {
        const sendOrderSpecs = async () => {
          await handleOrderSpecs(orderItems);
        };

        sendOrderSpecs();
      }, 3000);

      resolve();
    });
  };

  const buildOrderItem = (eltTarget) => {
    const mealID = eltTarget.parentElement.getAttribute("data-mealid");
    const mealName = eltTarget.parentElement.getAttribute("data-mealname");
    const mealPrice = eltTarget.parentElement.getAttribute("data-price");

    let orderItems = [];
    let indexItem = null;
    let qty = 0;

    if (orderSpecsCurrent.length === 0) {
      qty += 1;
      orderItems.push({
        meal: mealID,
        name: mealName,
        quantity: qty,
        price: mealPrice,
      });
    } else {
      indexItem = orderSpecsCurrent.findIndex((item) => item.meal === mealID);
      if (indexItem !== -1) {
        let orderItem = orderSpecsCurrent[indexItem];
        orderItems = {
          ...orderSpecsCurrent,
          [indexItem]: { ...orderItem, quantity: orderItem.quantity + 1 },
        };
      } else {
        qty += 1;
        orderItems.push({
          meal: mealID,
          name: mealName,
          quantity: qty,
          price: mealPrice,
        });
      }
    }

    /*  setTimeout(() => {
      const sendOrderSpecs = async () => {
        await handleOrderSpecs(orderItems);
      };

      sendOrderSpecs();
    }, 3000); */

    return orderItems;
  };

  const resetIsCilcked = () => {
    setTimeout(() => {
      setIsCliked(false);
    }, 3000);
  };

  /* useEffect(() => {
    const boostSendingOrders = async () => {
      await buildOrderItem(eltTarget);
    };

    setTimeout(() => {
      boostSendingOrders();
    }, 3000);
  }, [eltTarget]); */

  return (
    <>
      {!isClicked ? (
        <li
          className="btn_wrap_order"
          data-mealid={mealid}
          data-mealname={mealname}
          data-price={mealprice}
        >
          <button
            type="button"
            className=" btn btn_order"
            onClick={(e) => upstreamOrder(e).then(resetIsCilcked())}
          >
            Order
          </button>
        </li>
      ) : (
        <Ordered />
      )}
    </>
  );
}

export default Button;
