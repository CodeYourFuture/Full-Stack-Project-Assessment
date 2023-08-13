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
  const videoIdToDelete = req.params.pid;

  try {
    await Clip.deleteOne({id: videoIdToDelete})
    res.status(200).json({ message: "Video deleted." });
    console.log("Video deleted.");
  } catch (err) {
    console.error('Error deleting video:', err);
    res.status(500).json({ message: "An error occurred while deleting the video." });
  }
})

router.patch('/:pid', async (req, res) => {
  const videoIdToUpdate = req.params.pid;
  const updatedRating = req.body.rating;
  console.log(updatedRating);

  try {
    await Clip.updateOne({ id: videoIdToUpdate }, { $set: { rating: updatedRating } },)
    res.status(200);
    console.log("Video updated.");
  } catch (err) {
    console.error('Error updating video:', err);
    res.status(500).json({ message: "An error occurred while updating the video." });
  }
})

module.exports = router;
