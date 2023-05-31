const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
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
    id: 752342,
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
//  Get all of the videos
app.get("/videos", (req, res) => {
  res.json(videos);
});
let idCounter = 858567;

//  Add a video to the API.
app.post("/videos", (req, res) => {
  if (!req.body.title || !req.body.url) {
    return res.status(400).json({ Message: "Video could not be saved" });
  }
  const newVideos = {
    id: idCounter++,
    title: req.body.title,
    url: req.body.url,
    rating: 0,
  };
  videos.push(newVideos);
  console.log("New video added:", newVideos);
  res.json({ id: newVideos.id });
});

// Get the video with the ID

app.get("/videos/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let foundVideo = videos.find((v) => v.id === id);
  if (foundVideo) {
    res.json(foundVideo);
  } else {
    res.status(404).json({ result: "failure", message: "Video not found" });
  }
});
//  Deletes the video with the ID
app.delete("/videos/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let foundVideo = videos.find((v) => v.id === id);
  if (foundVideo) {
    videos = videos.filter((v) => v.id !== id);
    res.json(videos);
  } else {
    res
      .status(404)
      .json({ result: "failure", message: "Video could not be deleted" });
  }
});

// GET "/"
// app.get("/", (req, res) => {
// Delete this line after you've confirmed your server is running
// res.send({ express: "Your Backend Service is Running" });
// });
app.listen(port, () => console.log(`Listening on port ${port}`));
