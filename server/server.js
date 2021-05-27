const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));

let videos = require("..//client/src/data/exampleresponse.json");

// GET "/" all videos
app.get("/", (req, res) => {
  res.send(videos);
});

// Create a new video. This endpoint is used to add a video to the API.
app.post("/", (req, res) => {
  const newVideo = {
    id: videos[videos.length - 1].id + 1, // The id field is assigned upon successful post.
    ...req.body,
  };

  // check that all field is filled out
  if (
    newVideo.title &&
    newVideo.url
  ) {
    videos.push(newVideo);
    res
      .status(201)
      .json(
        `Successfully created a new video with Id number ${newVideo.id}!.`
      );
  } else {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

// Returns the video with the ID contained within the `{id}` parameter
app.get("/:id", (req, res) => {
  const getVideoId = videos.find(
    (video) => video.id === parseInt(req.params.id)
  );
  getVideoId
    ? res.json(getVideoId)
    : res.status(404).json({ message: "Video Id not found" });
});

// Deletes the video with the ID container within the `{id}` parameter
app.delete("/:id", (req, res) => {
  const deleteVideo = videos.findIndex(
    (video) => video.id === parseInt(req.params.id)
  );
  if (deleteVideo >= 0) {
    videos.splice(deleteVideo, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});