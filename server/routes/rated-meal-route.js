const express = require("express");
const router = express.Router();

const RatedMeal = require("../models/rated-meal");

const User = require("../models/user");

// middleware that is specific to this router
router.use(express.urlencoded({ extended: false }));

// FOR POST
router.use(async (req, res) => {
  try {
    console.log("Time POST: ", Date.now());
    // note: send userEmail(context api data) in the body post  rating-user frontend
    /* const userId = await User.findOne(req.body.userEmail)
      .then((user) => user.id)
      .catch((err) => console.log(err)); */

    let newRatedMeal = new RatedMeal({
      ratingScore: req.body.ratingScore,
      feedback: req.body.feedback,
      user: req.body.user, // userId (context API)
      dateSubmitted: req.body.dateSubmitted,
    });

    newRatedMeal = await newRatedMeal
      .save()
      .populate({ path: "meal", populate: ["_id", "name"] }); //mongoDB save

    /*  newRatingUser.populate("user", "id", "email", "city"); */

    res.json({ success: true, data: newRatedMeal });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't create meal",
    });

    console.log(err);
  }
});

// send ratingUserId in context API frontend
router.get("/", async (req, res) => {
  try {
    const ratingUserId = await req.body._id;

    res.json({ success: true, data: ratingUserId });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't create meal",
    });

    console.log(err);
  }
});

// FOR UPDATE
router.use("/:ratedMealId", async (req, res) => {
  try {
    const ratedMealId = req.params.ratedMealId;

    const ratedMeal = await RatedMeal.findByIdAndUpdate(
      ratedMealId,
      {
        meal: req.body.meal,
        note: req.body.note,
        feedback: req.body.feedback,
        dateMention: req.body.dateMention,
      },
      { new: true }
    ).populate({
      path: "meal",
      populate: ["_id", "name"],
    });

    res.json({ success: true, data: ratingUser });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't create meal",
    });

    console.log(err);
  }
});

module.exports = router;
