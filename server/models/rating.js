const mongoose = require("mongoose");

ratingSchema = new mongoose.Schema({
  ratingUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingUser",
      required: true,
    },
  ],
  averageRatings: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Rating", ratingSchema);
