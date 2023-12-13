const mongoose = require("mongoose");

ratingUserSchema = new mongoose.Schema({
  ratingScore: {
    type: Number,
    default: 3,
  },
  feedback: {
    type: String,
    default: "",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("RatingUser", ratingUserSchema);
