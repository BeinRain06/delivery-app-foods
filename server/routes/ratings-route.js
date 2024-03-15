const express = require("express");
const router = express.Router();
const moment = require("moment");

/* const RatingUser = require("../models/rating-user");
 */
const User = require("../models/user");
const Rating = require("../models/rating");

const RatedMeal = require("../models/rated-meal");

const Meal = require("../models/meal");

// middleware that is specific to this router
router.use(express.urlencoded({ extended: false }));

//FOR GETTING THIS USER ALL RATINGS
router.get("/rating:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const rating = await Rating.findOne({ user: userId });

    if (rating !== null) {
      const ratedMealElts = rating.ratedMeals;

      const ratedMealsIdMealRef = rating.ratedMeals.meal;

      const ratedMealId = await ratedMealsIdMealRef.map((thisMealId, i) => {
        if (thisMealId === mealId) {
          const indexMeal = i;
          return { thisMealId, indexMeal };
        }
      });

      const ratedMealItems = await Promise.all(
        ratedMealsIdMealRef.map(async (thisMealId, i) => {
          const mealSpec = await RatedMeal.findById(thisMealId)
            .populate("category", "name")
            .project({
              name: 1,
              origin: 1,
              category: 1,
              ingredients: 1,
              longDesc: 1,
            });

          const ratingNote = ratedMealElts.note[i];
          const feedback = ratedMealElts.feedback[i];
          const dateOfOrder = ratedMealElts.dateMention[i];

          const dataMatch = {
            ...mealSpec,
            rating: ratingNote,
            feedback: feedback,
            dateMention: dateOfOrder,
            mealId: thisMealId,
          };

          /* console.log("DATA MATCH:", dataMatch); */

          return dataMatch;
        })
      );

      console.log("rated Meal Items back - end :", ratedMealItems);
      return res.status(200).json({ success: true, data: ratedMealItems });
    } else {
      return res.status(200).json({ success: true, data: [] });
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

//FOR GETTING THAT RATING OR CREATE ONE
router.get("/rating:userId&:mealId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const mealId = req.params.mealId;

    const rating = await Rating.findOne({ user: userId });

    if (rating) {
      const ratedMealElt = rating.ratedMeals;

      const ratedMealsIdMealRef = rating.ratedMeals.meal;

      const ratedMealId = await ratedMealsIdMealRef.map((thisMealId, i) => {
        if (thisMealId === mealId) {
          const indexMeal = i;
          return { thisMealId, indexMeal };
        }
      });

      if (ratedMealId.thisMealId) {
        const thisMealId = ratedMealId.thisMealId;

        const mealGrabbed = await Meal.findById(thisMealId).select(
          "_id",
          "name",
          "longDesc",
          "origin"
        );

        const { _id, name, longDesc, origin } = mealGrabbed;

        const note = ratedMealElt.note[ratedMealId.indexMeal];

        const feedback =
          ratedMealElt.feedback[ratedMealId.indexMeal] !== undefined
            ? ratedMealElt.feedback[ratedMealId.indexMeal]
            : "";

        const dateMention = ratedMealElt.dateMention[ratedMealId.indexMeal];

        const result = {
          _id,
          name,
          longDesc,
          origin,
          note,
          feedback,
          dateMention,
        };

        return res.status(200).json({ success: true, data: result });
      } else {
        return res.status(200).json({
          success: true,
          data: "This Meal hasn't yet been rated by the user",
        });
      }
    } else {
      return res
        .status(200)
        .json({ success: true, data: "This User hasn't rated any meals" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't GeT ratings document",
    });
    console.log(err);
  }
});

// POST A RATING FOR THE FIRST TIME
router.post("/rating", async (req, res) => {
  try {
    let newRating = new Rating({
      user: req.body.user,
      ratedMeals: req.body.ratedMeal,
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

module.exports = router;
