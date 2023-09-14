const express = require("express");
const cors = require("cors");
const app = express();
const allVideos = require("./exampleresponse.json");

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

//all videos
app.get("/", (req, res) => {
  let sortedVideos = [...allVideos];
  sortedVideos.sort((a, b) => b.rating - a.rating);

  if (req.query.order === "desc") {
    // Sorting by rating in descending order
    sortedVideos.sort((a, b) => b.rating - a.rating);
  } else if (req.query.order === "asc") {
    // Sorting by rating in ascending order
    sortedVideos.sort((a, b) => a.rating - b.rating);
  }

  res.json(sortedVideos);
});

//add new video
app.post("/", (req, res) => {
  if (req.body.title.trim() === "" || req.body.url.trim() === "") {
    res.status(400).json({ message: "Please fill all the fields" });
    return;
  }
  const newVideos = {
    //creating id for the new booking
    id: Math.max(...allVideos.map((video) => video.id), 0) + 1,
    title: req.body.title,
    url: req.body.url,
    rating: 0,
  };
  allVideos.push(newVideos);
  res.status(201).json(allVideos);
});
//show video by Id
app.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const find = allVideos.find((video) => video.id === id);
  if (find) {
    res.status(200).json(find);
  } else res.status(404).json({ message: "not found" });
});

// delete the video by Id
app.delete("/:id", (req, res) => {
  const videoId = Number(req.params.id);
  const videoIndex = allVideos.findIndex((video) => video.id === videoId);
  if (videoIndex === -1) {
    res
      .status(404)
      .json({ msg: "the video to be delete cannot be found by id" });
  } else {
    allVideos.splice(videoIndex, 1);
    res.json(allVideos);
  }
});

//  updating the rating by Id
app.put("/:id", (req, res) => {
  const videoId = Number(req.body.id);
  const newRating = Number(req.body.rating);

  // Find the video with the given ID
  const video = allVideos.find((video) => video.id === videoId);

  // Update the rating of the video,
  if (video) {
    video.rating = newRating;
    res.json(allVideos);
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
