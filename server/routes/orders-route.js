const express = require("express");
const router = express.Router();

const Order = require("../models/order");

const OrderSpecs = require("../models/order-spec");

const User = require("../models/user");

//Emit Order
router.post("/", async (req, res) => {
  try {
    const orderSpecIds = Promise.all(
      req.body.ordersSpecs.map(async (orderSpec) => {
        let newOrderSpec = new OrderSpecs({
          meal: orderSpec.meal,
          quantity: orderSpec.quantity,
        });
        newOrderSpec = await newOrderSpec.save();

        return newOrderSpec._id;
      })
    );

    //await to return Promise in an array
    const orderSpecIdsResolved = await orderSpecIds;

    const totalPrices = Promise.all(
      orderSpecIdsResolved.map(async (orderSpecId) => {
        const orderSpec = await OrderSpecs.findById(orderSpecId).populate(
          "meal",
          "price"
        );

        const totalPrice = orderSpec.meal.price * orderSpec.quantity;

        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((acc, elt) => acc + elt, 0);

    let timeInMilliSeconds = 7200000; // 02 hours
    let { hours, min, sec } = deliveryClock;

    const minimizeTwoDigit = async ({ hours, min, sec }) => {
      if (hours < 10) {
        hour.toString().slice(-2);
      }
      if (min < 10) {
        min.toString().slice(-2);
      }
      if (sec < 10) {
        sec.toString().slice(-2);
      }

      const timeElapsing = await { hour: +hour, min: +min, sec: +sec };

      return timeElapsing;
    };

    const timeIntervals = setInterval(() => {
      let rest1, rest2;
      if (timeInMilliSeconds === 0) {
        deliveryClock = minimizeTwoDigit({ hours: 0, min: 0, sec: 0 });
        stopTimeFuncton();
        console.log(
          "Soon an agent will be here with your commands. Thanks you for your trust !"
        );
        return null;
      }

      timeInMilliSeconds = timeInMilliSeconds - 1000;
      hours = Math.floor(timeInMilliSeconds / 3600000);

      rest1 = timeInMilliSeconds - hours * 3600000;
      min = Math.floor(rest1 / 60000);
      sec = rest1 % 60000;

      deliveryClock = minimizeTwoDigit(hours, min, sec);
    }, 1000);

    const stopTimeFuncton = () => {
      clearInterval(timeIntervals);
    };

    const ordersItems = Promise.all(
      orderSpecIdsResolved.map(async (orderSpecId) => {
        const orderSpec = await OrderSpecs.findById(orderSpecId).populate(
          "meal",
          "price"
        );
        return orderSpec;
      })
    );

    const isHome = async () => {
      let city = req.body.city;
      let street = req.body.street;
      let country = req.body.country;

      let location;

      try {
        //all field not entered (use this also to make an **alert** or **showAlert** in UI of frontend)
        if (city === "" || street === "" || country === "") {
          return res.status(500).json({
            success: false,
            error: "Error: Error: one ore more location field missing ! ",
          });
        }

        if (city === "" && street === "" && country === "") {
          const userId = req.body.user; // userId passed here
          const user = await User.findById(userId);
          city = user.city;
          street = user.street;
          country = user.country;
        }

        if (city !== "" && street !== "" && country !== "") {
          city = req.body.city;
          street = req.body.street;
          country = req.body.country;
        }

        location = { city, street, country };

        return location;
      } catch (err) {
        res
          .status(500)
          .json({ success: false, error: "Error: cannot match location " });
        console.log(err);
      }
    };

    const location = isHome();

    let order = new Order({
      ordersSpecs: ordersItems,
      location: {
        city: location.city,
        street: location.street,
        country: location.country,
      },
      totalPrice: totalPrice,
      user: req.body.user, // frontend pass id of user login or created (retrieve the id user after user is authenticated)
      phone: req.body.phone,
      deliveryTimes: deliveryClock,
      status: req.body.status,
      codePayment: totalPrice.toString(16),
      status: req.body.status,
      payment: req.body.payment,
    });

    order = await order.save();

    console.log("new Order successfully posted", order);

    res.json({ success: true, data: order });
    // ...be continued, add user in order and phone user in order but first finish categories-routes code implementation
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

// --> here we are i writed authenticated user => next move i have to **POST** order after this authentication (order-routes.js)
