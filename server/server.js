const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

var cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const { v4: uuidv4 } = require("uuid");
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [
  {
    id: 523523,
    title: "Never Gonna Give You Up",
    url: "http://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: 23,
  },
  {
    id: 523427,
    title: "The Coding Train",
    url: "http://www.youtube.com/embed/HerCR8bw_GE",
    rating: 230,
  },
  {
    id: 82653,
    title: "Mac & Cheese | Basics with Babish",
    url: "http://www.youtube.com/embed/FUeyrEN14Rk",
    rating: 2111,
  },
  {
    id: 858566,
    title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    url: "http://www.youtube.com/embed/xbs7FT7dXYc",
    rating: 11,
  },
  {
    id: 453538,
    title:
      "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
    url: "http://www.youtube.com/embed/4As0e4de-rI",
    rating: 3211,
  },
  {
    id: 283634,
    title: "Learn Unity - Beginner's Game Development Course",
    url: "http://www.youtube.com/embed/gB1F9G0JXOo",
    rating: 211,
  },
  {
    id: 562824,
    title: "Cracking Enigma in 2021 - Computerphile",
    url: "http://www.youtube.com/embed/RzWB5jL5RX0",
    rating: 111,
  },
  {
    id: 442452,
    title: "Coding Adventure: Chess AI",
    url: "http://www.youtube.com/embed/U4ogK0MIzqk",
    rating: 671,
  },
  {
    id: 536363,
    title: "Coding Adventure: Ant and Slime Simulations",
    url: "http://www.youtube.com/embed/X-iSQQgOd1A",
    rating: 76,
  },
  {
    id: 323445,
    title: "Why the Tour de France is so brutal",
    url: "http://www.youtube.com/embed/ZacOS8NBK6U",
    rating: 73,
  },
];
// GET "/"
app.get("/videos", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.json(videos);
});

app.delete("/deletedvideo/:id", (req, res) => {
  const { id } = req.params;
  const deletedVideo = videos.findIndex((video) => video.id == id);
  if (deletedVideo !== -1) {
    videos.splice(deletedVideo, 1);
    res.status(200).json(videos);
  } else {
    res.status(404).json({
      result: "failure",
      msg: "impossible to delete this video",
    });
  }
});

app.post("/api/addnewvideo", (req, res) => {
  const newAddedVideo = req.body;
  newAddedVideo.id = uuidv4();
  if (
    newAddedVideo.title.length === 0 ||
    newAddedVideo.url.length === 0 ||
    newAddedVideo.rating.length === 0
  ) {
    return res.status(400).json({ msg: "please include all the fields" });
  }
  videos.push(newAddedVideo);
  res.json(videos);
});

app.get("/api/searchvideos", (req, res) => {
  const { search } = req.query;
  const foundVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );
  if (foundVideos.length !== 0) {
    res.json(foundVideos);
  } else {
    res.status(400).json({ msg: "no video found" });
  }
});
