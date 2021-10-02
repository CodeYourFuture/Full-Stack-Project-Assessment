const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
let videos = require("../client/src/exampleresponse.json");
// GET "/"
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
