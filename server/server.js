const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://localhost:3000",
};
// So the API will be accessible from http://localhost:8080 in our case and blocked for other domains.
app.use(express.urlencoded({ extended: true })); // sending data for POST and PUT requests
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false })); // sending data for POST and PUT requests

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
let videos = require("../client/src/exampleresponse.json");
// GET "/"

app.get("/", (req, res) => {
  const orderBy = req.query.order;

  if (orderBy === "asc") {
    const ascendVideoData = videos.sort(
      (video1, video2) => video1.rating - video2.rating
    );
    res.status(200).json(ascendVideoData);
  } else if (orderBy === "desc") {
    const descendVideoData = videos.sort(
      (video1, video2) => video2.rating - video1.rating
    );
    res.status(200).json(descendVideoData);
  } else if (!orderBy) {
    res.status(200).json(videos);
  } else {
    res.status(404).json("Please input correct query!");
  }
});

//200-1- This endpoint is used to return all of the videos
app.get("/videos", (req, res) => {
  res.status(200).json(videos);
});

//200-3- Returns the video with the ID contained within the {id} parameter

app.get("/videos/:id", (req, res) => {
  const requestedId = req.params.id;
  const findVideo = videos.find((video) => video.id === parseInt(requestedId));
  if (findVideo) {
    res.status(200).json(findVideo);
  } else
    res.status(400).json({ message: `No video with this id:${requestedId}` });
});

//200-2 POST
app.post("/", (req, res) => {
  const newVideoId = Math.floor(Math.random() * 1000000);
  const newVideoRating = Math.floor(Math.random() * 10000);
  const newVideo = {
    id: newVideoId,
    title: req.body.title,
    url: req.body.url,
    rating: newVideoRating,
    timeSent: new Date().toLocaleString(),
  };
  if (!req.body.title || !req.body.url) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    videos.push(newVideo);
    res.status(200).json(videos);
  }
});

//DELETE "/{id}" Deletes the video with the ID container within the {id} parameter

app.delete("/videos/:id", (req, res) => {
  const requestedId = +req.params.id;
  const findVideo = videos.some((video) => video.id === requestedId);

  if (findVideo) {
    videos = videos.filter((video) => video.id !== requestedId);
    res.status(200).json({
      result: "successful",
      message: "Video has been deleted",
    });
  } else
    res.status(400).json({
      result: "failure",
      message: "Video could not be deleted",
    });
});
