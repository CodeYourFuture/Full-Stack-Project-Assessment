const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3005;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let videos = require("../exampleresponse.json");

// GET
app.get("/", (req, res) => {
  res.send("You are on Andriana's video server");
});

// GET ALL VIDEOS
app.get("/videos", (req, res) => {
  res.json(videos);
});

// POST VIDEO
app.post("/video", (req, res) => {
  const { title, url } = req.body;
  let randomID = Math.floor(100000 + Math.random() * 900000);
  let randomRating = Math.floor(100 + Math.random() * 900);
  const word = "youtube";

  const newVideo = {
    id: randomID,
    title: title,
    url: url,
    rating: randomRating,
  };

  if (!newVideo.title || !newVideo.url) {
    return res
      .status(400)
      .json({ result: "failure", message: "Video could not be added" });
  }

  if (!newVideo.url.includes(word)) {
    return res.status(404).json({ message: "Enter valid YouTube address" });
  }

  if (newVideo.url.split("").length > 43) {
    console.log(newVideo.url.split("").slice(0, 43).join(""));
    // res.send()
  }

  videos.push(newVideo);
  res.json(videos);
});

// GET BY ID
app.get("/video:id", (req, res) => {
  const foundVideo = videos.find(
    (video) => video.id === parseInt(req.params.id)
  );

  foundVideo
    ? res.json(foundVideo)
    : res.status(400).json({ message: `Video ${req.params.id} not found` });
});

// DELETE BY ID
app.delete("/video:id", (req, res) => {
  const foundVideo = videos.find(
    (video) => video.id === parseInt(req.params.id)
  );

  if (foundVideo) {
    videos = videos.filter((video) => video.id !== parseInt(req.params.id));
    res.json({ message: `Video ${req.params.id} deleted` });
  } else {
    res
      .status(400)
      .json({ result: "failure", message: "Video could not be found" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
