const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

app.use(express.json());

const videos = []; // in-memory array to store videos

// Get all videos
app.get("/videos", (req, res) => {
  res.json(videos);
});

// Get single video
app.get("/videos/:id", (req, res) => {
  const video = videos.find((v) => v.id === parseInt(req.params.id));
  if (!video) return res.status(404).send("Video not found");
  res.json(video);
});

// Add new video
app.post("/videos", (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).send("Title and url are required");
  }

  const newVideo = {
    id: videos.length + 1,
    title,
    url,
  };

  videos.push(newVideo);
  res.status(201).json(newVideo);
});

// Delete video
app.delete("/videos/:id", (req, res) => {
  videos = videos.filter((v) => v.id !== parseInt(req.params.id));
  res.status(204).end();
});

// Update video
app.put("/videos/:id", (req, res) => {
  // TODO: update video by id
  res.status(200).end();
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
