const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
    required: true,
  },
  account: {
    type: String,
    required: true,
    default: "",
  },
  status: {
    type: String,
    required: true,
    default: "non-paid",
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
