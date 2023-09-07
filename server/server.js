const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
});

app.post("/", (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Both title and url must be provided",
    });
  }

  const id = Date.now();
  videos.push({ id, title, url });
  res.status(201).json({ id });
});


app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const video = videos.find((video) => video.id === id);
  if (!video) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }
  res.json(video);
});

app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = videos.findIndex((video) => video.id === id);
  if (index === -1) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }
  videos.splice(index, 1);
  res.json({});
});
app.listen(port, () => console.log(`Listening on port ${port}`));