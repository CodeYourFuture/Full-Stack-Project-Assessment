const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model('Video', videoSchema);