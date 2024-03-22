"use strict";

var mongoose = require("mongoose");
var ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  ratedMeals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "RatedMeal",
    required: true
  }]
});
module.exports = mongoose.model("Rating", ratingSchema);