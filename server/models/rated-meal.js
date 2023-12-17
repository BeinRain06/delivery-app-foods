const mongoose = require("mongoose");

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
    default: new Date(),
  },
});

module.exports = mongoose.model("RatedMeal", ratedMealSchema);
