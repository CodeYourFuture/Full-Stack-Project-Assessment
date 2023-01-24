const express = require("express");
const app = express();
let cors = require("cors");
const port = process.env.PORT || 5000;

app.use(express.json()); // before our routes definition
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "example response.json" into here to have some data to work with
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

// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
  console.log(videos, "Sending video data");
});

// POST "/"
app.post("/", (req, res) => {
  let newVideo = req.body;
  if (!(req.body.title || req.body.url)) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    newVideo.id = videos[videos.length - 1].id + 1;
    console.log(newVideo.id);
    videos.push(newVideo);
    res.status(200).json({
      id: newVideo.id,
    });
  }
});

//  Read one video specified by an ID
app.get("/videos/:id", (req, res) => {
  console.log(req.params.id);
  const id = parseInt(req.params.id);
  res.status(200).send(videos.filter((video) => video.id === id));
  console.log(videos.filter((video) => video[id] === id));
});

//  Delete a video, by ID
app.delete("/videos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = videos.filter((video) => video.id !== id);
  videos = result;
  console.log("DELETE /video route");
  res.status(200).send(result);
});
