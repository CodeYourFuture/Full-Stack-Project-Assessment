const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const data = require("./exampleresponse.json");

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [...data];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.status(200).json(videos);
});

// Add a new video
app.post("/", async (req, res) => {
  const { title, url } = req.body;
  if (!title.trim() || !url.trim()) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    const id = uuidv4();
    const newVideo = {
      id,
      title,
      url,
      rating: 0,
    };
    videos = [...videos, newVideo];
    res.status(200).json(videos);
  }
});

// Get a video with id
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const video = videos.find((video) => video.id.toString() === id);
  if (!video) {
    res.status(400).json("ID is not valid");
  } else {
    res.status(200).json(video);
  }
});

// Delete a video with id
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  filteredVideos = videos.filter((video) => video.id.toString() !== id);
  if (filteredVideos.length === videos.length) {
    res.status(400).json("ID is not valid");
  } else {
    res.status(200).json(video);
  }
});
