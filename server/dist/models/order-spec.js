"use strict";

var mongoose = require("mongoose");
var orderSpecSchema = new mongoose.Schema({
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meal",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});
module.exports = mongoose.model("OrderSpecs", orderSpecSchema);