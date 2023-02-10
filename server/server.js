const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const videos = require("../exampleresponse.json");
// let videos = [];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

app.get("/videos", function (req, res) {
  res.send(videos);
});

app.get("/videos/:id", function (req, res) {
  const matched = videos.find((video) => video.id === +req.params.id);
  if (!matched) return res.status(404).send("incorrect id");
  res.json(matched);
});

app.post("/videos", function (req, res) {
  const newVideo = req.body;
  newVideo.id = new Date().getTime();
  const arrayOfValues = Object.values(newVideo);
  const valid = arrayOfValues.every((value) => value !== "" && value !== undefined);
  if (!valid)
    return res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  videos.push(newVideo);
  console.log(videos);
  res.json({
    id: newVideo.id,
  });
});

app.delete("/videos/:id", (req, res) => {
  const videoIndex = videos.findIndex((video) => video.id === +req.params.id);
  if (videoIndex === -1)
    return res.status(404).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  videos.splice(videoIndex, 1);
  res.json({});
});
