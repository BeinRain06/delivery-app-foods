const mongoose = require("mongoose");

const MealSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  miniDesc: {
    type: String,
    required: true,
  },
  longDesc: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  ratings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rating",
    required: false,
  },
  price: {
    type: Number,
    default: 0,
  },
  origin: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Meal", MealSchema);
