const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
// const youtubeRegex = require("youtube-regex");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // restrict calls to those this address
    methods: "GET", // only allow GET requests
  })
);
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [
  {
    id: 523523,
    title: "Never Gonna Give You Up",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 23,
  },
  {
    id: 523427,
    title: "The Coding Train",
    url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
    rating: 230,
  },
  {
    id: 82653,
    title: "Mac & Cheese | Basics with Babish",
    url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
    rating: 2111,
  },
  {
    id: 858566,
    title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
    rating: 11,
  },
  {
    id: 453538,
    title:
      "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
    url: "https://www.youtube.com/watch?v=4As0e4de-rI",
    rating: 3211,
  },
  {
    id: 283634,
    title: "Learn Unity - Beginner's Game Development Course",
    url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
    rating: 211,
  },
  {
    id: 562824,
    title: "Cracking Enigma in 2021 - Computerphile",
    url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
    rating: 111,
  },
  {
    id: 442452,
    title: "Coding Adventure: Chess AI",
    url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
    rating: 671,
  },
  {
    id: 536363,
    title: "Coding Adventure: Ant and Slime Simulations",
    url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
    rating: 76,
  },
  {
    id: 323445,
    title: "Why the Tour de France is so brutal",
    url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
    rating: 73,
  },
];

const addedVideos = [];
//return all videos
app.get("/videos", (req, res) => {
  res.send(videos);
});
//posting a new video
app.post("/videos", (req, res) => {
  let newVideo = {
    id: parseInt(uuidv4()),
    title: req.body.title,
    url: req.body.url,
    rating: 0,
  };
  const videoTitle = req.body.title;
  const videoUrl = req.body.url;
  let id = uuidv4();
  const videoRating = 0;
  if (videoTitle.length < 1) {
    res.send(400).json({
      result: "failure",
      msg: "A title is required.",
    });
    return;
  } else if (videoUrl.length < 1) {
    res.status(400).json({
      result: "failure",
      msg: "An url is required",
    });
    return;
  }
  if (id === null) {
    res.status(404);
  }
  //validate url
  const isValidUrl = videoUrl.match(
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
  );
  if (isValidUrl) {
    res.send(videos);
  }
  if (newVideo.title && isValidUrl) {
    videos.push(newVideo);
    res.status(200).json({ id: newVideo.id });
  }
});
//getting  a video by id
app.get("/videos/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  if (videoId > 0) {
    res.json(videos.find((v) => v.id === videoId));
  }
  if (!videoId) {
    return res.status(400).json({ msg: "Invalid input" });
  }
  res.send("OK");
});
// deleting a video by id
app.delete("/videos/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  const videoIndex = videos.findIndex((v) => v.id === videoId);

  if (videoIndex < 0) {
    res
      .status(404)
      .json({ result: "failure", message: "Video could not be deleted" });
    return;
  } else {
    videos.splice(videoIndex, 1);
  }
});
