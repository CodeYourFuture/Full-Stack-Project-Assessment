const express = require("express");
const path = require("path");
const app = express();
const uuid = require("uuid");
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./exampleresponse.json");

// GET all videos
app.get("/", (req, res) => {
  videos.length > 0
    ? res.send(videos)
    : res.status(500).send("No video is available");
});

// POST new video
app.post("/", (req, res) => {
  let newVideo = {
    id: uuid.v4(),
    title: req.body.title,
    url: req.body.url,
    postedAt: new Date(),
  };
  videos.push(newVideo);
  res.send("The video was successfully added");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
