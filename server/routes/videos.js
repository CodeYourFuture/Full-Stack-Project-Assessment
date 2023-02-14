const express = require("express");
const router = express.Router();

let videos = require("../data/videos");

router.post("/", (req, res) => {
  const { title, url, rating = 0 } = req.body;

  if (!title || !url) {
    return res.status(400).json({
      result: "Failure",
      message: "Video could not be saved",
    });
  }

  const newID = Number(
    Date.now().toString().substr(-3) + Math.random().toString().substr(2, 3)
  );
  const createvideo = {
    id: newID,
    title: title,
    url: url,
    rating: rating,
  };

  videos.push(createvideo);
  console.log(createvideo);
  res.status(201).json({ id: newID });
});

module.exports = router;
