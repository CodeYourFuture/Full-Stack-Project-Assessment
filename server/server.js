const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("../exampleresponse.json");

// GET "/"
app.get("/", (req, res) => {
  res.json(videos);
});

// POST a new Video

app.post("/", (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    return res
      .status(400)
      .json({ result: "failure", message: "Title and URL are required" });
  }
  const id = Date.now();
  videos.push({ id, title, url, rating: 0 });
  res.json({ id });
});

// GET a video by ID
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const video = videos.find((v) => v.id === id);
  if (!video) {
    return res
      .status(404)
      .json({ result: "failure", message: "Video not found" });
  }
  res.json(video);
});

// Delete a video by id

app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = videos.findIndex((v) => v.id === id);
  if (index === -1) {
    return res
      .status(404)
      .json({ result: "failure", message: "Video not found" });
  }
  videos.splice(index, 1);
  res.json({});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
