const express = require("express");
const app = express();
const cors = require("cors");
let videos = require("./exampleresponse.json");

app.use(express.json());
app.use(cors());
// GET "/"
app.get("/api/", (req, res) => {
  const sortedVideos = videos.sort((a, b) => b.rating - a.rating);
  res.json(videos);
});

app.delete("/api/:id", (req, res) => {
  const requestedID = Number(req.params.id);
  const found = videos.some((video) => video.id === requestedID);
  if (found) {
    const deletedVideoTitle = videos.filter(
      (video) => video.id === requestedID
    )[0].title;
    videos = videos.filter((video) => video.id !== requestedID);
    res.json({
      msg: `Video with title: ${deletedVideoTitle} has been deleted`,
    });
  } else {
    res
      .status(404)
      .json({ msg: `Video with title: ${deletedVideoTitle} not found` });
  }
});

app.post("/api/", (req, res) => {
  const { title, url } = req.body;
  const newVideo = {
    id: videos.length + 1,
    title: title.charAt(0).toUpperCase() + title.slice(1),
    url: url,
    rating: 0,
  };
  const isEmptyKey = Object.values(newVideo).some(
    (x) => x === null || x === ""
  );
  const errorMessage = {};
  if (isEmptyKey) {
    errorMessage.msgMissingKey = "Some information is missing";
    res.status(400).json(errorMessage);
  } else {
    {
      videos.push(newVideo);
      return res.json({
        msg: `You have submitted new video with title: ${newVideo.title}.`,
        videos,
      });
    }
  }
});

app.put("/api/:id", (req, res) => {
  const found = videos.some((video) => video.id === Number(req.params.id));
  if (found) {
    const { rating } = req.body;
    videos.forEach((video) => {
      if (video.id === Number(req.params.id)) {
        video.rating = rating;
        res.json({ msg: "Rating was updated", video });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `Member with id of ${req.params.id} not found` });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
