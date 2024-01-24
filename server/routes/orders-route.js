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
        // instance of OrderSpecs Model
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

// UPDATING NEW LOCATION
router.put("/order/newlocation:orderId", async (req, res) => {
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

// UPDATING ORDER TOTAL PRICE
router.put("/order:orderId", async (req, res) => {
  try {
    const ordersItems = Promise.all(
      req.body.orderSpecs.map(async (item) => {
        let orderSpecId = item._id;

        if (orderSpecId === undefined) {
          let newOrderSpec = new OrderSpecs({
            meal: item.meal,
            quantity: item.quantity,
          });
          newOrderSpec = await newOrderSpec.save();

          orderSpecId = newOrderSpec._id;
        }

        const orderSpec = await OrderSpecs.findById(orderSpecId).populate(
          "meal",
          ["_id", "name", "price", "origin", "ratings"]
        );
        return orderSpec;
      })
    );

    const totalPrices = Promise.all(
      ordersItems.map(async (orderItem) => {
        const orderSpec = await OrderSpecs.findById(orderItem._id).populate(
          "meal",
          "price"
        );

        const totalPrice = orderSpec.meal.price * orderSpec.quantity;

        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((acc, elt) => acc + elt, 0);

    const updateOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        orderSpecs: ordersItems,
        totalPrice: totalPrice,
        codePayment: totalPrice.toString(16),
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
