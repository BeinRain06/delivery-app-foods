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

//FOR GET
router.get("/rating:userId&:mealId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const mealId = req.params.mealId;

    /*  const ratings = await Rating.findOne({ user: userId }).populate({
      path: "ratedMeals",
      populate: [{ path: "meal", populate: "name" }, "note", "feedback"],
    }); */

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

// FOR POST (CREATE)
router.post("/rating:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const rating = await Rating.findOne({ user: userId }).populate({
      path: "ratedMeals",
      populate: [
        { path: "meal", populate: ["_id", "name", "origin"] },
        "note",
        "feedback",
        "dateMention",
      ],
    });

    if (!rating) {
      const feedback = req.body.feedback !== undefined ? req.body.feedback : "";

      const dateMention = moment().format("Do MMMM, YYYY");

      let newRatedMeal = new RatedMeal({
        meal: [req.body.meal],
        note: [req.body.note],
        feedback: [feedback],
        dateMention: [dateMention],
      });

      newRatedMeal = await newRatedMeal.save();

      let newRating = new Rating({
        user: userId,
        ratedMeals: newRatedMeal._id,
      });

      newRating = await newRating.save();

      return res.json({ success: true, data: newRating });
    } else {
      let newArrMeal = rating.ratedMeals.meal;
      newArrMeal = [
        ...newArrMeal,
        (newArrMeal[newArrMeal.length] = req.body.meal),
      ];
      let newArrNote = rating.ratedMeals.note;
      newArrNote = [
        ...newArrNote,
        (newArrNote[newArrNote.length] = req.body.note),
      ];
      let newArrFeedback = rating.ratedMeals.feedback;
      newArrFeedback = [
        ...newArrFeedback,
        (newArrFeedback[newArrFeedback.length] = req.body.feedback),
      ];
      let newArrDateMention = rating.ratedMeals.dateMention;
      newArrDateMention = [
        ...newArrDateMention,
        (newArrDateMention[newArrDateMention.length] =
          moment().format("Do MMMM, YYYY")),
      ];

      const updateRatedMeals = await RatedMeal.findByIdAndUpdate(
        rating.ratedMeals._id,
        {
          meal: newArrMeal,
          note: newArrNote,
          feedback: newArrFeedback,
          dateMention: newArrDateMention,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        data: rating,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't create rating",
    });
    console.log(err);
  }
});

// FOR PUT (UPDATE)
router.put("/rating:userId", async (req, res) => {
  try {
    console.log("rating on updation process");

    const userId = req.params.userId;

    const mealId = req.body.meal;

    const rating = await Rating.findOne({ user: userId });

    if (rating) {
      const ratingMeal = rating.ratedMeals.map((theMealId, i) => {
        if (theMealId === mealId) {
          const indexMeal = i;
          return { theMealId, indexMeal };
        }
      });

      if (ratingMeal.theMealId) {
        let newArrMeal = rating.ratedMeals.meal;
        newArrMeal = [
          ...newArrMeal,
          (newArrMeal[ratingMeal.indexMeal] = req.body.meal),
        ];
        let newArrNote = rating.ratedMeals.note;
        newArrNote = [
          ...newArrNote,
          (newArrNote[ratingMeal.indexMeal] = req.body.note),
        ];
        let newArrFeedback = rating.ratedMeals.feedback;
        newArrFeedback = [
          ...newArrFeedback,
          (newArrFeedback[newArrFeedback.length] =
            newArrFeedback[newArrFeedback.length] !== undefined
              ? req.body.feedback
              : ""),
        ];
        let newArrDateMention = rating.ratedMeals.dateMention;
        newArrDateMention = [
          ...newArrDateMention,
          (newArrDateMention[ratingMeal.indexMeal] =
            moment().format("Do MMMM, YYYY")),
        ];

        const updateRatedMeals = await RatedMeal.findByIdAndUpdate(
          rating.ratedMeals._id,
          {
            meal: newArrMeal,
            note: newArrNote,
            feedback: newArrFeedback,
            dateMention: newArrDateMention,
          },
          { new: true }
        );

        const notesArr = retrieveAllMealNote(ratingMeal.theMealId);

        const tmpArr = occurenceEachNote(notesArr);

        const maxNoteRes = maxNote(tmpArr);

        const updateMeal = await Meal.findByIdAndUpdate(
          ratingMeal.theMealId,
          {
            ratings: maxNoteRes,
          },
          { new: true }
        );

        res.json({
          success: true,
          data: updateRatedMeals,
          data_meal: updateMeal,
        });
      } else {
        throw new Error(" User hasn't rated this Meal Once");
      }
    } else {
      throw new Error("Cannot Update ratings for this user!");
    }

    const retrieveAllMealNote = async (mealId) => {
      const ratings = await Rating.find();
      let tmpArrNotes = [];
      const usersRatedMeals = ratings.map((rating, i) => {
        const singleRatedMeals = rating.ratedMeals;

        singleRatedMeals.meal.map((item, i) => {
          if (item === mealId) {
            const noteToTake = singleRatedMeals.notes[i];
            tmpArrNotes.push(noteToTake);
          }
        });
      });

      return tmpArrNotes;
    };

    const occurenceEachNote = (notesArr) => {
      let tmpArr = [];
      let notesMeal = notesArr;

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
                (elt, i) => elt[i].rating === noteAttributed
              );

              if (indexExist) {
                tmpArr = [
                  ...tmpArr,
                  (tmpArr[indexExist] = {
                    ...tmpArr[indexExist],
                    [count]: count,
                  }),
                ];
              }
            }

            notesMeal.split(j, 1);
          }
        }
      }

      return tmpArr;
    };

    const maxNote = (occurenceNote) => {
      const ourNotes = occurenceNote;

      const maxCount = ourNotes.reduce((acc, val) => {
        let newacc = acc.count < val.count ? val.count : acc.count;

        return newacc;
      }, 0);

      const mynewNote = ourNotes.map((note) => {
        if (note.count === maxCount) {
          return +note.rating;
        }
      });

      return mynewNote;
    };
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't update rating",
    });

    console.log(err);
  }
});

module.exports = router;
