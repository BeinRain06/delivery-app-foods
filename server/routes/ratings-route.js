const express = require("express");
const router = express.Router();

/* const RatingUser = require("../models/rating-user");
 */
const User = require("../models/user");
const Rating = require("../models/rating");

const RatedMeal = require("../models/rated-meal");

const Meal = require("../models/meal");

// middleware that is specific to this router
router.use(express.urlencoded({ extended: false }));

//FOR GET
router.use(async (req, res) => {
  try {
    const userId = req.params.userId;

    const ratings = await Rating.findOne({ user: userId }).populate({
      path: "ratedMeals",
      populate: ["meal", "note", "feedback"],
    });

    res.json({ success: true, data: ratings });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't GeT ratings document",
    });
    console.log(err);
  }
});

// FOR POST (CREATE)
router.use(async (req, res) => {
  try {
    const userId = req.body.user;

    let newRatedMeal = new RatedMeal({
      meal: req.body.meal,
      note: req.body.note,
      feedback: req.body.feedback,
    });

    /* newRatedMeal = await newRatedMeal
      .save()
      .populate({ path: "meal", populate: ["_id", "name"] }); */

    newRatedMeal = await newRatedMeal.save();

    let newRating = new Rating({
      user: userId,
      ratedMeals: newRatedMeal._id,
    });

    /* const ratedMeals = await Rating.findById(userId).then(
      (res) => res.ratedMeals
    );

    const exist = ratedMeals.forEach(async (ratingMeal, index) => {
      if (ratingMeal.meal === req.body.meal) {
        ratingMeal = newRatedMeal;
        ratedMeals = await Rating.findByIdAndUpdate(userId).then(
          (res) => res.ratedMeals
        );
        return index;
      }
    });

    if (!exist) {
      let newRating = new Rating({
        user: req.body.user,
        ratedMeals: newRatedMeal,
      });
    } */

    /*   newRating = await newRating.save().populate(); */

    newRating = await newRating.save();

    res.json({ success: true, data: newRating });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't create rating",
    });
    console.log(err);
  }
});

// FOR PUT (UPDATE)
router.use(async (req, res) => {
  try {
    console.log("rating updated!");

    const userId = req.params.userId;

    const mealId = req.body.meal;

    let ratingId = await Rating.findOne({ user: userId }).then(
      (res) => res._id
    );

    const updateRating = await Rating.findByIdAndUpdate(
      ratingId,
      {
        user: userId, // userId
        ratedMeals: req.body.ratedMeals,
      },
      { new: true }
    );

    //update key properties *ratings*  within Meal Collection

    const rating = await Rating.find().populate({
      path: "ratedMeals",
      populate: [
        "note",
        { path: "meal", populate: ["_id", "name", "ratings"] },
      ],
    });

    const notesMeal = async () => {
      return await Promise.all(
        rating.map((item) => {
          const ratedMeals = item.ratedMeals;
          ratedMeals.map((elt) => {
            if (elt.meal._id === mealId) {
              return elt.note;
            }
          });
        })
      );
    };

    const occurenceEachNote = () => {
      let tmpArr = [];
      let notesMeal = notesMeal();

      for (let i = 0; i < notesMeal.length; i++) {
        let count = 0,
          noteAttributed = 0;
        for (let j = i + 1; j < notesMeal.length; j++) {
          if (notesMeal[i] === notesMeal[j]) {
            count++;
            noteAttributed = notesMeal[i];
            let ratingObj = { rating: noteAttributed, count: count };
            if (tmpArr.length === 0) {
              tmpArr.push(ratingObj);
            } else {
              const indexExist = tmpArr.findIndex(
                (elt, i) => elt[i] === noteAttributed
              );

              if (indexExist) {
                tmpArr = {
                  ...tmpArr,
                  [indexExist]: { ...ratingObj, [count]: count },
                };
              }
            }

            notesMeal.split(j, 1);
          }
        }
      }

      return tmpArr;
    };

    const maxNote = () => {
      const ourNotes = occurenceEachNote();

      const maxCount = ourNotes.reduce((acc, val) => {
        let newacc = acc.count < val.count ? val.count : acc.count;

        return newacc;
      }, 0);

      const mynewNote = ourNotes.map((note) => {
        if (note.count === maxcount) {
          return +note.rating;
        }
      });

      return mynewNote;
    };

    const updateMeal = await Meal.findByIdAndUpdate(
      mealId,
      {
        ratings: maxNote(),
      },
      { new: true }
    );

    res.json({ success: true, dataRating: updateRating, dataMeal: updateMeal });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't update rating",
    });

    console.log(err);
  }
});

module.exports = router;
