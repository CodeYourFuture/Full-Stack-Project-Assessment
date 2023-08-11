const express = require("express");
const router = express.Router();

const videos = require("../exampleresponse.json");

router.get("/", (req, res) => {
  res.json(videos);
});

module.exports = router;
