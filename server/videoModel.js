const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: Number,
  title: String,
  url: String,
  rating: Number
});

const Videos = mongoose.model("videos", schema, "videos");

module.exports = { Videos };