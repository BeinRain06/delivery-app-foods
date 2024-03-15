const express = require("express");
const router = express.Router();
const moment = require("moment");

const RatedMeal = require("../models/rated-meal");

const User = require("../models/user");

// middleware that is specific to this router
router.use(express.urlencoded({ extended: false }));

// FOR POSTING QUITE THE FIRST TIME
router.post("/", async (req, res) => {
  try {
    let setInFeedBack;

    if (req.body.feedback === "") {
      setInFeedBack = "average";
    } else {
      setInFeedBack = req.body.feedback;
    }

    let newRatedMeal = new RatedMeal({
      meal: [...req.body.meal],
      rating: [...req.body.rating],
      feedback: [...setInFeedBack],
      dateMention: [moment().format("Do MMMM, YYYY")],
    });

    newRatedMeal = await newRatedMeal.save(); //mongoDB save
    console.log("newRatedMeal :", newRatedMeal);

    res.json({ success: true, data: newRatedMeal });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't create rated-meal",
    });

    console.log(err);
  }
});

// send ratingUserId in context API frontend
//FOR GET
router.get("/", async (req, res) => {
  try {
    const ratingUserId = await req.body._id;

    res.json({ success: true, data: ratingUserId });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't get ratedMeals",
    });

    console.log(err);
  }
});

// FOR PUT (UPDATE SENDING A NEW ITEM)
router.put("/ratedmeal:ratedMealId", async (req, res) => {
  try {
    console.log("rating on updation process");

    const ratedMealId = req.params.ratedMealId;
    const mealId = req.body.meal;

    const ratedInstance = await RatedMeal.findById(ratedMealId);

    const indArr = ratedInstance.meal.length;

    const newMeal = [
      ...ratedInstance.meal,
      (ratedInstance.meal[indArr] = mealId),
    ];

    const newRating = [
      ...ratedInstance.rating,
      (ratedInstance.rating[indArr] = req.body.rating),
    ];

    const newFeedback = [
      ...ratedInstance.feedback,
      (ratedInstance.feedback[indArr] = req.body.feedback),
    ];

    const newDateMention = [
      ...ratedInstance.dateMention,
      (ratedInstance.dateMention[indArr] = moment().format("Do MMMM, YYYY")),
    ];

    let updateInstance;

    if (req.body.feedback !== "") {
      updateInstance = await RatedMeal.findByIdAndUpdate(
        ratedMealId,
        {
          meal: newMeal,
          rating: newRating,
          feedback: newFeedback,
          dateMention: newDateMention,
        },
        { new: true }
      ).populate("meal", ["name", "origin", "ratings"]);
    } else {
      updateInstance = await RatedMeal.findByIdAndUpdate(
        ratedMealId,
        {
          meal: newMeal,
          rating: newRating,
          dateMention: newDateMention,
        },
        { new: true }
      ).populate("meal", ["name", "origin", "ratings"]);
    }

    res.json({
      success: true,
      data: updateInstance,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't update rating",
    });

    console.log(err);
  }
});

// FOR PUT (UPDATE ITEM ALREADY EXISTING)
router.put("/ratedmeal:ratedMealId", async (req, res) => {
  try {
    console.log("rating on updation process");

    const ratedMealId = req.params.ratedMealId;

    const mealId = req.body.meal;
    const indArr = req.body.indArr;

    const ratedInstance = await RatedMeal.findById(ratedMealId);

    const newRating = [
      ...ratedInstance.rating,
      (ratedInstance.rating[indArr] = req.body.rating),
    ];

    const newFeedback = [
      ...ratedInstance.feedback,
      (ratedInstance.feedback[indArr] = req.body.feedback),
    ];

    const newDateMention = [
      ...ratedInstance.dateMention,
      (ratedInstance.dateMention[indArr] = moment().format("Do MMMM, YYYY")),
    ];

    let updateInstance;

    if (req.body.feedback !== "") {
      updateInstance = await RatedMeal.findByIdAndUpdate(
        ratedMealId,
        {
          rating: newRating,
          feedback: newFeedback,
          dateMention: newDateMention,
        },
        { new: true }
      ).populate("meal", ["name", "origin", "ratings"]);
    } else {
      updateInstance = await RatedMeal.findByIdAndUpdate(
        ratedMealId,
        {
          rating: newRating,
          dateMention: newDateMention,
        },
        { new: true }
      ).populate("meal", ["name", "origin", "ratings"]);
    }

    res.json({
      success: true,
      data: updateInstance,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't update rating",
    });

    console.log(err);
  }
});

module.exports = router;
