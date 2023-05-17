const express = require("express");
const app = express();
const allVideos = require("./exampleresponse.json");

app.use(express.json());
//all videos
app.get("/", (req, res) => {
  res.send({ allVideos });
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
    res.status(200).json({ find });
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
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
