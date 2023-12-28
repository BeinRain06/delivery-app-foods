const express = require("express");
const router = express.Router();

const RatedMeal = require("../models/rated-meal");

const User = require("../models/user");

// middleware that is specific to this router
router.use(express.urlencoded({ extended: false }));

// FOR POST
router.post("/newratedmeal", async (req, res) => {
  try {
    console.log("Time POST: ", Date.now());

    let newRatedMeal = new RatedMeal({
      meal: req.body.meal,
      note: req.body.note,
      feedback: req.body.feedback,
    });

    newRatedMeal = await newRatedMeal.save(); //mongoDB save

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

// FOR UPDATE (READY)
router.put("/ratedmeal/:ratedMealId", async (req, res) => {
  try {
    const ratedMealId = req.params.ratedMealId;
    console.log("Time PUT: ", Date.now());

    let ratedMeal = await RatedMeal.findByIdAndUpdate(
      ratedMealId,
      {
        meal: req.body.meal,
        note: req.body.note,
        feedback: req.body.feedback,
        dateMention: new Date(),
      },
      { new: true }
    ).populate({
      path: "meal",
      populate: ["_id", "name"],
    });

    res.json({ success: true, data: ratedMeal });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't update once again this meal",
    });
    console.log(err);
  }
});

module.exports = router;
