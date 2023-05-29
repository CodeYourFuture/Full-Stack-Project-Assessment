const express = require("express");
const { v4: uuid } = require("uuid");

const videoData = require("../../client/src/video-data.json");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(videoData);
});

router.get("/:id", (req, res) => {
  const video = videoData.find((video) => video.id === parseInt(req.params.id));
  if (!video) {
    res.status(404).json({ error: "Video not found" });
  } else {
    res.send(video);
  }
});

router.post("/", (req, res) => {
  const { title, url, rating } = req.body;

  if (!title || !url) {
    res
      .status(400)
      .json({
        error: "Please make sure you have entered a title and a valid URL.",
      });
  } else {
    const newVideo = { id: uuid(), title, url, rating };
    videoData.push(newVideo);
    res.send(videoData);
  }
});
router.delete("/:id", (req, res) => {
  res.send(videoData.filter((video) => video.id !== parseInt(req.params.id)));
});
module.exports = router;
