const express = require("express");
const router = express.Router();

let videos = require("../data/videos");

router.get("/", (req, res) => {
  res.json(videos);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const video = videos.find((v) => v.id === id);
  if (!video) {
    return res.status(404).json({
      result: "Failure",
      message: "Video not found",
    });
  }
  res.json(video);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = videos.findIndex((v) => v.id === id);
  console.log(index);
  if (index === -1) {
    return res.status(404).json({
      result: "Failure",
      message: "Video not found",
    });
  }
  const deleted = videos.splice(index, 1);
  res.json({ message: `${id} has been deleted` });
});

module.exports = router;
