const express = require("express");
const router = express.Router();

const RatingUser = require("../models/rating-user");

const User = require("../models/user");
const Rating = require("../models/rating");

const Meal = require("../models/meal");

// middleware that is specific to this router
router.use(express.urlencoded({ extended: false }));

// FOR POST (CREATE)
router.use(async (req, res) => {
  try {
    let newRating = new Rating({
      ratingUsers: req.body.ratingUser, // you as Owner create the first ratingUser
      averageRatings: req.body.averageRatings,
    });

    newRating = await newRating.save();

    res.json({ success: true, data: newRating });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't create meal",
    });
    console.log(err);
  }
});
// FOR PUT (UPDATE)
router.use(async (req, res) => {
  try {
    console.log("Time: ", Date.now());
    /* const ratingUnitId = req.body.ratingId; */
    const meal = await Meal.findById(req.body.mealRatedId); //where to take ? --> (send to the body PUT request for ratings frontend and taken from Context API)

    const newRatingUser = await RatingUser.findById(req.body.ratingUserId);

    const ratingId = meal.ratings;

    const rating = await Rating.findById(ratingId);

    let ratingUsers = rating.ratingUsers;

    //  rating key ratingUsers
    ratingUsers = { newRatingUser, ...rating };

    /* start calculating rating score */
    const ratingUserIds = Promise.all(
      ratingUsers.map((ratingUser) => ratingUser._id)
    );

    const ratingUserIdsResolved = await ratingUserIds;

    const ratingScoreArray = Promise.all(
      ratingUserIdsResolved.map(async (ratingUserId) => {
        const ratingUser = await RatingUser.findById(ratingUserId);
        return ratingUser.ratingScore;
      })
    );

    const ratingScore = ratingScoreArray.reduce((acc, elt) => acc + elt);

    /* end calculating rating score */

    const updateRating = await Rating.findByIdAndUpdate(
      ratingId,
      {
        ratingUsers: ratingUsers,
        averageRatings: ratingScore,
      },
      { new: true }
    );

    res.json({ success: true, data: updateRating });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't update rating",
    });

    console.log(err);
  }
});

module.exports = router;
