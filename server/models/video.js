const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  id: { type: String, required: false},
  title: { type: String, required: true },
  url: { type: String, required: true },
  rating: { type: Number, required: false},
  votes: { type: Number, required: false},

});

module.exports = mongoose.model('Video', videoSchema);