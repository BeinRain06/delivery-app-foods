const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  favouriteFoods: {},
});

module.exports = mongoose.model("Favourite", favouriteSchema);
