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

router.delete('/:pid', async (req,res) => {
  const videoId = req.params.pid;

  try {
    await Clip.deleteOne({id: videoId})
    res.status(200).json({ message: "Video deleted." });
    console.log("Video deleted.");
  } catch (err) {
    console.error('Error deleting video:', err);
    res.status(500).json({ message: "An error occurred while deleting the video." });
  }
})

module.exports = router;
