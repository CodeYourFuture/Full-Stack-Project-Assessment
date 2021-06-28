const express = require("express");
const cors = require("cors");
const Joi = require("joi");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const videos = require("../exampleresponse.json");
const port = process.env.PORT || 5000;

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

app.get("/", (req, res) => {
  const videosWithRating = videos.map((eachVideo) => ({
    ...eachVideo,
    rating: 0,
  }));
  res.send(videosWithRating);
});

app.get("/:id([0-9]+)", (req, res) => {
  const { id } = req.params;
  const video = videos.find((eachVideo) => eachVideo.id === parseInt(id));
  if (video) {
    res.json(video);
  } else {
    res.status(404).send("Please enter a valid id ");
  }
});

app.post("/", (req, res) => {
  const schema = Joi.object({
    id: Joi.required(),
    title: Joi.string().min(3).required(),
    url: Joi.string().max(100).required(),
  });
  const videoDetail = req.body;
  videoDetail.id = Date.now();
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    videos.push(result.value);
    res.send(videos);
  }
});

app.delete("/:id([0-9]+)", (req, res) => {
  const { id } = req.params;
  const videoToDelete = videos.findIndex(
    (eachVideo) => eachVideo.id === parseInt(id)
  );
  if (videoToDelete !== -1) {
    videos.splice(videoToDelete, 1);
    res.status(200).send(`You deleted the video with id, ${id}`);
  } else {
    res.status(404).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
