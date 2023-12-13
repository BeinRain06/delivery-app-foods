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
router.post("/", async (req, res) => {
  try {
    let payment = new Payment({
      order: req.body.order,
      account: req.body.account,
      status: req.body.status,
    });

    payment = await payment.save();

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
router.put("/:paymentId", async (req, res) => {
  try {
    const paymentId = req.params.paymentId;

    let payment = Payment.findByIdAndUpdate(
      paymentId,
      {
        account: req.body.account,
        status: req.body.status,
      },
      { new: true }
    );

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
