const express = require("express");
const router = express.Router();

const RatingUser = require("../models/rating-user");

const User = require("../models/user");

// middleware that is specific to this router
router.use(express.urlencoded({ extended: false }));

// FOR POST
router.use(async (req, res) => {
  try {
    console.log("Time: ", Date.now());
    // note: send userEmail(context api data) in the body post  rating-user frontend
    /* const userId = await User.findOne(req.body.userEmail)
      .then((user) => user.id)
      .catch((err) => console.log(err)); */

    let newRatingUser = new RatingUser({
      ratingScore: req.body.ratingScore,
      feedback: req.body.feedback,
      user: req.body.user, // userId (context API)
      dateSubmitted: req.body.dateSubmitted,
    });

    newRatingUser = await newRatingUser.save(); //mongoDB save

    /*  newRatingUser.populate("user", "id", "email", "city"); */

    res.json({ success: true, data: newRatingUser });
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

router.put("/:ratingUserId", async (req, res) => {
  try {
    const ratingUserId = req.params.ratingUserId;

    const ratingUser = await RatingUser.findByIdAndUpdate(
      ratingUserId,
      {
        ratingScore: req.body.ratingScore,
        feedback: req.body.feedback,
        user: req.body.user, // userId (context API)
        dateSubmitted: req.body.dateSubmitted,
      },
      { new: true }
    ).populate({
      path: "ratingUsers",
      populate: { path: "user", populate: ["id", "email", "city"] },
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
