const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({});

module.exports = mongoose.model("Favourite", favouriteSchema);
