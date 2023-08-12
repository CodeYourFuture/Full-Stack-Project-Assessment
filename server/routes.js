const express = require("express");
const router = express.Router();

const Clip = require("./clip-model");

router.get("/", async (req, res) => {
  try {
    const videos = await Clip.find({});
    console.log("All videos:", videos);
    res.json(videos);
  } catch (error) {
    console.error("Error retrieving videos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
