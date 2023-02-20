const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

router.post("/", async (req, res) => {
  const { title, url, rating = 0 } = req.body;

  if (!title || !url) {
    return res.status(400).json({
      result: "Failure",
      message: "Video could not be saved",
    });
  }

  const { data, error } = await supabase
    .from("fav_video")
    .insert({ title, url, rating });

  if (error) {
    console.error(error);
    return res.status(500).json({
      result: "Failure",
      message: "Server error",
    });
  }

  res.status(201);
});

module.exports = router;
