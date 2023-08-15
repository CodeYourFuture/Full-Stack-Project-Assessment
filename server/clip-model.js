const mongoose = require("mongoose");

const clipSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  rating: Number,
});

const Clip = mongoose.model("Clip", clipSchema, "videos");

module.exports = Clip;
