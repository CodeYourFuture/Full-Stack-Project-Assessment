const express = require("express");
const router = express.Router();
const services = require("./videosService");

// GET "/"
router.get("/", async (req, res) => {
  const result = await services.getAllVideos(req.query.order);
  return res.status(200).send(result.rows);
});

// POST "/"
router.use(express.json());
router.post("/", async (req, res) => {
  const result = await services.addNewVideo(req.body);
  return result.status === "OK"
    ? res.status(201).send({ id: result.value, message: result.message })
    : res.status(400).send({ result: "failure", message: result.message });
});

// GET "/{id}"
router.get("/:id", async (req, res) => {
  const result = await services.getVideoById(req.params.id);
  result.length > 0 ? res.status(200).send(result) : res.sendStatus(404);
});

// DELETE "/{id}"
router.delete("/:id", async (req, res) => {
  const videoIsDelted = await services.deleteVideoById(req.params.id);
  return videoIsDelted
    ? res.sendStatus(204)
    : res.status(400).send({
        result: "Failure",
        message: "Video could not be deleted",
      });
});

// PUT "/{id}" (update video rating)
router.put("/:id", async (req, res) => {
  const videoId = req.params.id;
  const rating = req.body.rating;

  const videoIsUpdated = await services.updateVideoRating(videoId, rating);
  return videoIsUpdated
    ? res.sendStatus(200)
    : res.status(404).json({
        result: "Failure",
        message: "Video could not be updated",
      });
});

module.exports = router;
