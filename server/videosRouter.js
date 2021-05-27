const express = require("express");
const router = express.Router();
const services = require("./videosService");
const youTubeVideos = require("../exampleresponse.json");

let videos = [...youTubeVideos];

// GET "/"
router.get("/", (req, res) => {
  const sortOrder = req.query.order;
  const sortedVideos = services.sortVideosByRating(videos, sortOrder);
  res.status(200).send(sortedVideos);
});

// POST "/"
router.use(express.json());
router.post("/", (req, res) => {
  const result = services.addNewVideo(req.body);
  res.status(200).send(result);
});

// GET "/{id}"
router.get("/:id", (req, res) => {
  const video = services.getVideoById(req.params.id);
  video ? res.status(200).send(video) : res.sendStatus(404);
});

// DELETE "/{id}"
router.delete("/:id", (req, res) => {
  const videoDelted = services.deleteVideoById(req.params.id);
  if (videoDelted) {
    return res.sendStatus(204);
  }
  res.status(400).send({
    result: "failure",
    message: "Video could not be deleted",
  });
});

// PUT "/{id}" (update video rating)
router.put("/:id", (req, res) => {
  const videoId = req.params.id;
  const videoExists = services.findVideo(videoId);
  if (videoExists) {
    services.updateVideoRating(videoId, req.body.rating);
    return res.sendStatus(200);
  }
  res.status(404).json({ message: "Video could not be updated." });
});

module.exports = router;
