const express = require("express");
const router = express.Router();

const Clip = require("./clip-model");

router.get("/", async (req, res) => {
  try {
    const videos = await Clip.find({});
    console.log("All videos:", videos.length);
    res.json(videos);
  } catch (error) {
    console.error("Error retrieving videos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:pid", async (req, res) => {
  const videoIdToDelete = req.params.pid;

  try {
    await Clip.deleteOne({ id: videoIdToDelete });
    res.status(200).json({ message: "Video deleted." });
    console.log("Video deleted.");
  } catch (err) {
    console.error("Error deleting video:", err);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the video." });
  }
});

router.patch("/:pid", async (req, res) => {
  const videoIdToUpdate = req.params.pid;
  const updatedRating = req.body.rating;

  try {
    const updatedClip = await Clip.findOneAndUpdate(
      { id: videoIdToUpdate },
      { $set: { rating: updatedRating } },
      { new: true }
    );
    res.status(200).json({ message: "Video updated." });
    console.log("Video updated.", updatedClip);
  } catch (err) {
    console.error("Error updating video:", err);
    res
      .status(500)
      .json({ message: "An error occurred while updating the video." });
  }
});

router.post("/", async (req, res) => {
  try {
    const newClip = new Clip({
      id: req.body.id,
      url: req.body.url,
      title: req.body.title,
      rating: req.body.rating,
    });
    const savedItem = await newClip.save();

    res.status(201).json(savedItem);
    console.log("Video added");
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
  }
});

module.exports = router;
