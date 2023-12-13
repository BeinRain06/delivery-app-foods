const mongoose = require("mongoose");

orderSchema = new mongoose.Schema({
  ordersSpecs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderSpecs",
      required: true,
    },
  ],

  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    default: "",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  phone: {
    type: String,
    required: true,
  },
  deliveryTimes: {
    hours: {
      type: Number,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    },
    secondes: {
      type: Number,
      required: true,
    },
  },
  /*  hoursDelivery: {
    type: Date,
  },
  minutesDelivery: {
    type: Date,
  },
  secondesDelivery: {
    type: Date,
  }, */
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  codePayment: {
    type: String,
    required: true,
  },
});

orderSchema.virtual("id").get(() => {
  return this._id.toHexString();
});
orderSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Order", orderSchema);
