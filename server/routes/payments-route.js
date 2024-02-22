const express = require("express");

const router = express.Router();

const Payment = require("../models/user");

// Get All List
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong cannot  retrieve  payments ",
    });
    console.log(err);
  }
});

// create payment
router.post("/payment", async (req, res) => {
  try {
    const status = "non-paid";
    let payment = new Payment({
      order: req.body.order,
      account: req.body.account,
      status: status,
    });

    payment = await payment.save();

    console.log("POST PAYMENT:", payment);

    res.json({ success: true, data: payment });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error:  cannot create payment ",
    });
    console.log(err);
  }
});

// update payment
router.put("/payment/:paymentId", async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const status = "paid";

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      {
        account: req.body.account,
        status: status,
      },
      { new: true }
    );
    console.log("update payment , end payment", payment);

    res.json({ success: true, data: payment });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error:  cannot  update  payment ",
    });
    console.log(err);
  }
});

module.exports = router;
