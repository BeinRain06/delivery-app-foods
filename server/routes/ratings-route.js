const express = require("express");
const router = express.Router();
const moment = require("moment");

/* const RatingUser = require("../models/rating-user");
 */
const User = require("../models/user");
const Rating = require("../models/rating");

const RatedMeal = require("../models/rated-meal");

// middleware that is specific to this router
router.use(express.urlencoded({ extended: false }));

//FOR GETTING THIS USER ALL RATINGS
router.get("/rating:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const rating = await Rating.findOne({ user: userId }).populate(
      "ratedMeals"
    );

    if (rating !== null) {
      console.log("rated Meal Items back - end :", rating);

      return res.status(200).json({ success: true, data: rating });
    } else {
      return res.status(200).json({ success: true, data: {} });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error:
        "Error: something went wrong can't GeT all ratings document of this User",
    });
    console.log(err);
  }
});

//POST A RATING IDENTITY  (ONE TIME)
router.post("/rating", async (req, res) => {
  try {
    const arrTransmit = [req.body.ratedMeal];

    let newRating = new Rating({
      user: req.body.user,
      ratedMeals: arrTransmit,
    });

    newRating = await newRating.save();

    console.log("newRating :", newRating);

    res.json({ success: true, data: newRating });
  } catch (err) {
    res.status(500).json({
      success: false,
      error:
        "Error: something went wrong can't create rating(posting first time)",
    });
    console.log(err);
  }
});

//UPDATE IN RATING SENDING NEW RATEDMEAL IDS
router.post("/rating", async (req, res) => {
  try {
    const updateMyRating = await Rating.findByIdAndUpdate(
      req.params.ratingId,
      {
        ratedMeals: req.body.ratedMeals,
      },
      { new: true }
    ).populate("ratedMeals");

    console.log("updateMyRating in route :", updateMyRating);

    res.json({ success: true, data: updateMyRating });
  } catch (err) {
    res.status(500).json({
      success: false,
      error:
        "Error: something went wrong can't create rating(posting first time)",
    });
    console.log(err);
  }
});

module.exports = router;
