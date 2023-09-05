const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const randomIntFromInterval = require("./utils/randomIntFromInterval");

app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("../exampleresponse.json");

app.get("/", (req, res) => {
  res.json(videos);
});

app.post("/", (req, res) => {
  if (!req.body || !req.body.title || !req.body.url) {
    res.status(400).send("Bad Request: Missing title or url field");
    return;
  }

  const newVideo = {
    id: randomIntFromInterval(10, videos[videos.length - 1].id),
    title: req.body.title,
    url: req.body.url,
    rating: 0,
  };
  videos.push(newVideo);
  res.json(videos);
});

app.get("/:id", (req, res) => {
  const video = videos.find((video) => video.id === parseInt(req.params.id));
  if (!video) {
    res.status(404).send("Video not found");
    return;
  }
  res.json(video);
});

app.delete("/:id", (req, res) => {
  const video = videos.find((video) => video.id === parseInt(req.params.id));
  if (!video) {
    res.status(404).send({
      result: "failure",
      message: "Video could not be deleted",
    });
    return;
  }
  videos.splice(videos.indexOf(video), 1);
  res.json({ message: "Video deleted" });
});
