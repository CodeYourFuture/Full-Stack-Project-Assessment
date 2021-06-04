const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./data/exampleresponse.json");

// GET "/"
// Display all the videos
app.get("/", (req, res) => {
  res.send(videos);
});

// POST "/"
// Add a new video to the list of videos
app.post("/", (req, res) => {
  let newVideo = req.body;

  const extractVideoId = (videoUrl) => {
    const regex = /(?<=v=|v\/|vi=|vi\/|youtu\.be\/)[a-zA-Z0-9_-]{11}/g;
    const videoId = videoUrl.match(regex);
    return videoId;
  };

  // needs to be improved
  if (newVideo.title !== undefined && newVideo.url !== undefined) {
    let videoId = extractVideoId(newVideo.url);
    if (videoId !== null && newVideo.title !== "") {
      newVideo = { id: videos.length, ...newVideo, rating: 0 };
      videos.push(newVideo);
      res.status(201);
      res.send({ id: newVideo.id });
    } else {
      /*
     Unprocessable Entity - the syntax of the request entity is correct
     (thus a 400 (Bad Request) status code is inappropriate) but was unable
     to process the contained instructions.
    */
      res.status(422);
      res.send({
        result: "failure",
        message: "Video could not be saved",
      });
    }
  } else {
    /*
     Unprocessable Entity - the syntax of the request entity is correct
     (thus a 400 (Bad Request) status code is inappropriate) but was unable
     to process the contained instructions.
    */
    res.status(422);
    res.send({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let filteredVideo = videos.filter((video) => video.id === id);
  if (filteredVideo.length === 0) {
    res.status(404);
    res.send(`No video found for the ID: ${id}`);
  } else {
    res.status(200);
    res.send(filteredVideo);
  }
});

// DELETE "/{id}"
app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let initialLength = videos.length;
  videos = videos.filter((video) => video.id !== id);
  let finalLength = videos.length;
  if (initialLength > finalLength) {
    res.send({});
  } else {
    res.send({ result: "failure", message: "Video could not be deleted" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
