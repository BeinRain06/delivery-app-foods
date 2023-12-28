const mongoose = require("mongoose");
const moment = require("moment");
ratedMealSchema = new mongoose.Schema({
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meal",
    required: true,
  },
  note: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
    default: "",
  },
  dateMention: {
    type: Date,
    default: moment().format("Do MMMM, YYYY"),
  },
});

module.exports = mongoose.model("RatedMeal", ratedMealSchema);
