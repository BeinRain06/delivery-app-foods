const express = require("express");
const router = express.Router();

const Order = require("../models/order");

const OrderSpecs = require("../models/order-spec");

const User = require("../models/user");

// middleware that is specific to this router
router.use(express.urlencoded({ extended: false }));

//Emit Order
router.post("/order", async (req, res) => {
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

    const ordersItems = Promise.all(
      orderSpecIdsResolved.map(async (orderSpecId) => {
        const orderSpec = await OrderSpecs.findById(orderSpecId).populate(
          "meal",
          ["_id", "name", "price", "origin", "ratings"]
        );
        return orderSpec;
      })
    );

    /*  const isHome = async () => {
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

    const location = isHome(); */

    let order = new Order({
      ordersSpecs: ordersItems,
      city: location.city,
      street: location.street,
      totalPrice: totalPrice,
      user: req.body.user, // frontend pass id of user login or created (retrieve the id user after user is authenticated)
      phone: req.body.phone,
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

// FOR UPDATE
router.put("/order:orderId", async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        phone: req.body.phone,
        city: req.body.city,
        street: req.body.street,
      },
      { new: true }
    );
    console.log(" Order successfully updated", updateOrder);

    res.json({ success: true, data: updateOrder });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't create rated-meal",
    });
    console.log(err);
  }
});

module.exports = router;

// --> here we are i writed authenticated user => next move i have to **POST** order after this authentication (order-routes.js)
