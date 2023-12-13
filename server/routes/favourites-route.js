const express = require("express");
const router = express.Router();

const Favourite = require("../models/favourite");

/*get Favourites*/

//GET all

router.get("/", async (req, res) => {
  try {
    const favourites = await Favourite.find();

    res.json({ success: true, data: favourites });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot list of favourites" });
  }
});

//GET an User favourite
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    /* const favourites = await Favourite.findBy({}).sort({ ratings: -1 }).limit(3); */
    const favourites = await Favourite.findById(userId);

    res.json({ success: true, data: favourites });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find  user favourites" });
  }
});

module.exports = router;
