const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const jsonData = require("../exampleresponse.json");
const app = express();
app.use(cors());
app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [...jsonData];

// Get all videos
app.get("/", (req, res) => {
  const {order} = req.query
  let orderedVideos = [...videos]
  if(order === "desc"){
    orderedVideos.sort((a,b) => b.rating - a.rating)
  } else {
    orderedVideos.sort((a,b) => a.rating - b.rating)
  }
  res.status(200).json(orderedVideos);
});

// Get a specific video
app.get("/:id", (req, res) => {
  const { id } = req.params;
  const video = videos.find((video) => video.id == id);
  if (!video) {
    res.status(404).json({
      result: "failure",
      message: "There is no vide with given data",
    });
  } else {
    res.status(200).json(video);
  }
});

// Post a video
app.post("/", (req, res) => {
  const { title, url, rating } = req.body;
  const id = uuidv4();
  try {
    const newVideo = {
      title,
      url,
      rating,
      id,
    };
    videos.push(newVideo);
    res.status(201).json(videos);
  } catch (err) {
    res.status(404).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

//Update video rating
app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  try {
    const video = videos.find((video) => video.id == id);
    if (!video) {
      res.status(404).json({
        result: "failure",
        message: "There is no vide with given data",
      });
    } else {
      videos = videos.map((video) => {
        if (video.id == id) {
          return { ...video, rating };
        }
        return video;
      });
    }
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
  }
});

//Delete a video
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const video = videos.find((video) => video.id == id);
  if (!video) {
    res.status(404).json({
      result: "failure",
      message: "There is no vide with given data",
    });
  } else {
    const index = videos.indexOf(video);
    videos.splice(index, 1);
    res.status(200).json(videos);
  }
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));
