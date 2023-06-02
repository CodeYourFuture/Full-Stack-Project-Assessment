const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

let videos = require("../exampleresponse.json");

function generateUniqueId() {
  return Math.floor(Math.random() * 1000000) + 1;
}
// GET "/"
app.get("/", (req, res) => {
  res.json(videos);
});

// POST "/"
app.post("/", (req, res) => {
  const { title, category, url } = req.body;

  if (!title || !category || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }

  const newVideo = {
    id: generateUniqueId(),
    title,
    category,
    url,
    rating: 0,
  };

  videos.push(newVideo);

  res.status(201).json({
    id: newVideo.id,
  });
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  const { id } = req.params;

  const video = videos.find((v) => v.id === Number(id));

  if (!video) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }

  res.json(video);
});

// DELETE "/{id}"
app.delete("/:id", (req, res) => {
  const { id } = req.params;

  const index = videos.findIndex((v) => v.id === Number(id));

  if (index === -1) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }

  videos.splice(index, 1);

  res.json({});
});

// GET "/category/:name"
app.get("/category/:name", (req, res) => {
  const { name } = req.params;

  if (name === "All videos") {
    // Return all videos
    res.json(videos);
  } else {
    // Filter the videos by category name
    const categoryVideos = videos.filter((video) => video.category === name);

    if (categoryVideos.length === 0) {
      return res.status(404).json({
        result: "failure",
        message: "No videos found for the specified category",
      });
    }

    res.json(categoryVideos);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
