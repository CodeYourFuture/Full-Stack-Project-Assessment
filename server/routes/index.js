const express = require("express");
const router = express.Router();

let videos = require("../data/videos");

router.get("/", (req, res) => {
  res.json(videos);
});

module.exports = router;
