const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("../exampleresponse.json");

// GET "/running"
app.get("/running", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

// GET "/" This endpoint is used to return all of the videos
app.get("/", (req, res) => {
  res.send({ videos: videos });
});

// `POST` This endpoint is used to add a video to the API.
app.post("/", (req, res) => {
  const newVideo = req.body;
  const {
    id,
    title,
    url,
    rating
  } = newVideo
  videos.push(newVideo);
  res.status(201).json(newVideo);
});


