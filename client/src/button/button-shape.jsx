import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { TemplateContext } from "../context/TemplateContext";
import "./button-shape.css";

export const PreOrdered = ({ mealid, mealname, mealprice, buildOrderItem }) => {
  const {
    state: { orderSpecsCurrent },
    handleOrderSpecs,
  } = useContext(TemplateContext);

  useEffect(() => {
    const sendMyNewOrderSpecs = async () => {
      const orderItem = buildOrderItem();
      await handleOrderSpecs(orderItem);
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

export const Ordered = ({
  mealid,
  mealname,
  mealprice,
  isClicked,
  setIsCliked,
}) => {
  const {
    state: { orderSpecsCurrent },
    handleOrderSpecs,
  } = useContext(TemplateContext);

  const [waiting, setWaiting] = useState(true);
  const [item, setItem] = useState([]);

  const buildOrderItem = () => {
    const mealID = mealid;
    const mealName = mealname;
    const mealPrice = mealprice;

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

      /*  setItem(() =>
        item.push({
          meal: mealID,
          name: mealName,
          quantity: qty,
          price: mealPrice,
        })
      ); */
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

        /*  setItem(() => [
          ...orderSpecsCurrent,
          (orderSpecsCurrent[indexItem] = {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          }),
        ]); */
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

        /* setItem(() => [
          ...orderSpecsCurrent,
          {
            meal: mealID,
            name: mealName,
            quantity: qty,
            price: mealPrice,
          },
        ]); */
      }
    }

    console.log("orderItems:", orderItems);

    setTimeout(() => {
      const sendOrderSpecs = async () => {
        await handleOrderSpecs(orderItems);
      };

      sendOrderSpecs();
    }, 3000);

    return orderItems;
  };

  useEffect(() => {
    /*  const sendMyNewOrderSpecs = async () => {
      await buildOrderItem();
    };

    setTimeout(() => {
      sendMyNewOrderSpecs();
    }, 3000); */

    setTimeout(() => {
      buildOrderItem();
      console.log("orderSpecsCurrent context API:", orderSpecsCurrent);
    }, 4000);
  }, []);

  return (
    <ul className="order_confirmation">
      {waiting ? (
        <TimeAwait setWaiting={setWaiting} />
      ) : (
        <>
          <li className="btn_confirm_order">
            <Confirm isClicked={isClicked} setIsCliked={setIsCliked} />
          </li>
          <li className="btn_reject_order">
            <Reject isClicked={isClicked} setIsCliked={setIsCliked} />
          </li>
        </>
      )}
    </ul>
  );
};

export const Confirm = ({ isClicked, setIsCliked }) => {
  const {
    state: { orderSpecsCurrent },
    handleOrderSpecs,
  } = useContext(TemplateContext);

  const [waiting, setWaiting] = useState(false);

  const confirmOrder = () => {
    setTimeout(() => {
      console.log("updating...");
    }, 3000);

    setWaiting(true);

    setTimeout(() => {
      setIsCliked(false);
      console.log("order Confirmed!");
      console.log("orderSpecsCurrent catch :", orderSpecsCurrent);
    }, 3500);
  };

  useEffect(() => {
    console.log("confirm section update");
  }, [isClicked]);

  return (
    <button type="button" className="  btn_con_order" onClick={confirmOrder}>
      Confirm
    </button>
  );
};

export const Reject = ({ isClicked, setIsCliked }) => {
  const {
    state: { orderSpecsCurrent },
    handleOrderSpecs,
  } = useContext(TemplateContext);

  const [waiting, setWaiting] = useState(false);

  const rejectOrder = () => {
    setWaiting(true);
    setTimeout(() => {
      console.log("updating...");
    }, 2000);

    let newOrderSpecs;

    const lastIndex = orderSpecsCurrent.length - 1;

    /*   if (lastIndex === 0) {
      newOrderSpecs = [];
    } */

    newOrderSpecs = orderSpecsCurrent.splice(lastIndex, 1);

    setTimeout(async () => {
      await handleOrderSpecs(newOrderSpecs);
      setIsCliked(false);
      console.log("order Rejected!");
      console.log("orderSpecsCurrent after reject :", orderSpecsCurrent);
    }, 1800);
  };

  useEffect(() => {
    console.log("reject section update");
  }, [isClicked]);

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
    }, 2500);
  }, []);
  return (
    <button type="button" className="btn btn_ordered">
      loading...
    </button>
  );
};

function Button({ mealid, mealname, mealprice }) {
  const [isClicked, setIsCliked] = useState(false);
  const [isShadowClicked, setIsShadowClicked] = useState(false);

  /* const upstreamOrder = (e) => {
    return new Promise(function (resolve, reject) {
      console.log(e.target);

      setIsCliked(true);

      setTimeout(async () => {
        console.log(" isClicked set true");
      }, 1500);

      resolve();
    });
  }; */

  const upstreamOrder = (e) => {
    console.log(e.target);

    /* setIsCliked(true); */

    setTimeout(async () => {
      await setIsCliked(true);
      console.log(" isClicked set true");
    }, 1500);
  };

  const applyIsShadowClicked = () => {
    return new Promise(function (resolve, reject) {
      setIsShadowClicked(true);
      setTimeout(() => {
        console.log(" isshadowClicked set true");
      }, 2000);

      resolve();
    });
  };

  const resetIsClicked = () => {
    setTimeout(() => {
      console.log(" isClicked set false");
      setIsCliked(false);
    }, 4500);
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
