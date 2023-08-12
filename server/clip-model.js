const mongoose = require("mongoose");

const clipSchema = new mongoose.Schema({
  id: Number,
  title: String,
  url: String,
  rating: Number,
});

const Clip = mongoose.model("Clip", clipSchema, "videos");

module.exports = Clip;
