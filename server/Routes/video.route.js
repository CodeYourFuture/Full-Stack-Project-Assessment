const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
let videos = require("../exampleresponse.json");

router.get("/", function (req, res) {
  res.json(videos);
});

router.get("/:id", function (req, res) {
  res.json(videos.filter((item) => item.id.toString() === req.params.id));
});

router.delete("/:id", function (req, res) {
  videos = videos.filter((video) => video.id.toString() !== req.params.id);
  if (true) {
    res.status(200).json({});
  } else {
    res.status(406).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});

router.post("/", (req, res) => {
  const data = {
    ...req.body,
    id: uuidv4(),
    rating: 0,
    time: new Date(),
  };
  videos.push(data);
  if (true) {// succesfull
    res.json({ id: data.id });
  } else {
    res.json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

module.exports = router;
