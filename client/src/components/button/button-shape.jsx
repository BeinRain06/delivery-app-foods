import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { templateActions } from "../../services/redux/createslice/TemplateSlice";
import { orderSpecsCurrent_section } from "../../services/redux/createslice/TemplateSlice";
import "./button-shape.css";

export const PreOrdered = ({ buildOrderItem }) => {
  const dispatch = useDispatch();

  const orderSpecsCurrent = useSelector(orderSpecsCurrent_section);

  useEffect(() => {
    const sendMyNewOrderSpecs = async () => {
      const orderItem = buildOrderItem();
      await dispatch(templateActions.handleOrderSpecs(orderItem));
    };

    setTimeout(async () => {
      await sendMyNewOrderSpecs();
    }, 3000);

    console.log("pre-orderSpecsCurrent context API:", orderSpecsCurrent);
  }, []);

  return (
    <li className="btn_wrap_order">
      <button type="button" className=" btn btn_ordered">
        Init...
      </button>
    </li>
  );
};

export const Ordered = ({ mealid, mealname, mealprice, setIsCliked }) => {
  const [waiting, setWaiting] = useState(true);

  return (
    <ul className="order_confirmation">
      {waiting ? (
        <TimeAwait setWaiting={setWaiting} />
      ) : (
        <>
          <li className="btn_confirm_order">
            <Confirm
              mealid={mealid}
              mealname={mealname}
              mealprice={mealprice}
              setIsCliked={setIsCliked}
            />
          </li>
          <li className="btn_reject_order">
            <Reject setIsCliked={setIsCliked} />
          </li>
        </>
      )}
    </ul>
  );
};

export const Confirm = ({ mealid, mealname, mealprice, setIsCliked }) => {
  const dispatch = useDispatch();
  const orderSpecsCurrent = useSelector(orderSpecsCurrent_section);

  const buildOrderItem = () => {
    const mealID = mealid;
    const mealName = mealname;
    const mealPrice = mealprice;

    let orderItems = [];
    let indexItem = null;
    let qty = 0;

    if (orderSpecsCurrent.length === 0) {
      qty += 1;

      orderItems = [
        ...orderItems,
        { meal: mealID, name: mealName, quantity: qty, price: mealPrice },
      ];
    } else {
      indexItem = orderSpecsCurrent.findIndex((item) => item.meal === mealID);

      if (indexItem !== -1) {
        let orderItem = orderSpecsCurrent[indexItem];

        orderItems = [
          ...orderSpecsCurrent,
          (orderSpecsCurrent[indexItem] = {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          }),
        ];
      } else {
        qty += 1;

        orderItems = [
          ...orderSpecsCurrent,
          {
            meal: mealID,
            name: mealName,
            quantity: qty,
            price: mealPrice,
          },
        ];
      }
    }

    console.log("orderItems:", orderItems);

    setTimeout(() => {
      const sendOrderSpecs = async () => {
        await dispatch(templateActions.handleOrderSpecs(orderItems));
      };

      sendOrderSpecs();
    }, 3000);
  };

  const confirmOrder = () => {
    setTimeout(() => {
      console.log("updating...");
      buildOrderItem();
    }, 3000);

    setTimeout(() => {
      setIsCliked(false);
      console.log("order Confirmed!");
      console.log("orderSpecsCurrent catch :", orderSpecsCurrent);
    }, 3500);
  };

  return (
    <button type="button" className="  btn_con_order" onClick={confirmOrder}>
      Confirm
    </button>
  );
};

export const Reject = ({ setIsCliked }) => {
  const orderSpecsCurrent = useSelector(orderSpecsCurrent_section);

  const rejectOrder = () => {
    setTimeout(() => {
      console.log("updating reject...");
    }, 2000);

    setTimeout(async () => {
      console.log("order Rejected!");
      setIsCliked(false);
      console.log("orderSpecsCurrent after reject :", orderSpecsCurrent);
    }, 1800);
  };

  return (
    <button type="button" className="  btn_rej_order" onClick={rejectOrder}>
      Reject
    </button>
  );
};

export const TimeAwait = ({ setWaiting }) => {
  useEffect(() => {
    setTimeout(() => {
      setWaiting(false);
    }, 2200);
  }, []);
  return (
    <button type="button" className="btn btn_ordered">
      loading...
    </button>
  );
};

function Button({ mealid, mealname, mealprice }) {
  const [isClicked, setIsCliked] = useState(false);

  const upstreamOrder = (e) => {
    console.log(e.target);

    /* setIsCliked(true); */

    setTimeout(async () => {
      await setIsCliked(true);
      console.log(" isClicked set true");
    }, 1000);
  };

  return (
    <>
      {!isClicked ? (
        <li className="btn_wrap_order">
          <button
            type="button"
            className=" btn btn_order"
            onClick={(e) => upstreamOrder(e)}
          >
            Order
          </button>
        </li>
      ) : (
        <Ordered
          mealid={mealid}
          mealname={mealname}
          mealprice={mealprice}
          isClicked={isClicked}
          setIsCliked={setIsCliked}
        />
      )}
    </>
  );
}

export default Button;
