const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()); // needed to parse JSON data

const { Pool } = require("pg");

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: true,
});

// Store and retrieve your videos from here
// let videos = require("./exampleResponse.json"); // Get this from Render db?????
let videoIdHighest = Math.max(...videos.map((video) => video.id));

app.get("/videos", function (request, response) {
  db.query("SELECT * FROM videos")
    .then((response) => {
      response.json(response.rows);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error: "Error" });
    });
});

app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("/home/coder/Desktop/CYF/Full-Stack-Project-Assessment/client/src/exampleResponse.json");

// GET "/"
// This endpoint is used to return all of the videos
app.get("/", function (request, response) {
  response.json(videos);
});

// POST "/"
// This endpoint is used to add a video to the API.
app.post("/", function (request, response) {
  let newVideo = request.body;
  newVideo.id = videoIdHighest + 1;

  if (!newVideo.title || !newVideo.url) {
    response.status(400).json({
      result: "Failure",
      message: "Video could not be saved",
    });
  } else {
    videos.push({
      id: newVideo.id,
      title: newVideo.title,
      url: newVideo.url,
    });
    response.status(201).json({
      id: newVideo.id,
    });
  }
});

// GET "/{id}"
// Returns the video with the ID contained within the {id} parameter
app.get("/:id", function (request, response) {
  let selectedVideo = videos.filter(
    (video) => video.id === Number(request.params.id)
  );
  response.status(404).json(selectedVideo);
});

// DELETE "/{id}"
// Deletes the video with the ID container within the {id} parameter
app.delete("/:id", function (request, response) {
  let videoIdDelete = Number(request.params.id);
  const videoIndex = videos.findIndex(({ id }) => id === videoIdDelete);
  if (videoIndex >= 0) {
    videos.splice(videoIndex, 1);
    response.json({});
  } else {
    response.status(404).json({
      result: "Failure",
      message: "Video could not be deleted",
    });
  }
});

});


app.listen(port, () => console.log(`Listening on port ${port}`));
