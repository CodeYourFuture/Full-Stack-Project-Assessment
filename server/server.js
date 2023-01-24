const express = require("express");
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

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
  res.json({ videos });
});

// POST "/"
app.post("/", (req, res) => {
  const addedVideoTitle = req.body.title;
  const addedVideoUrl = req.body.url;
  if (!addedVideoTitle || !addedVideoUrl) {
    res.sendStatus(400);
    return;
  }
  const addedVideo = {
    id: Number(new Date()),
    title: addedVideoTitle,
    url: addedVideoUrl,
    rating: 0,
  };
  videos.push(addedVideo);
  res.status(201).json(addedVideo);
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  const requestedVideoId = Number(req.params.id);
  const requestedVideo = videos.find((video) => video.id === requestedVideoId);
  if (!requestedVideo) {
    res.sendStatus(404);
    return;
  }
  res.json(requestedVideo);
});

// DELETE "/{id}"
app.delete("/:id", (req, res) => {
  const deletedVideoId = Number(req.params.id);
  const deletedVideoIndex = videos.findIndex((video) => video.id === deletedVideoId);
  if (deletedVideoIndex < 0) {
    res.sendStatus(404);
    return;
  }
  videos.splice(deletedVideoIndex, 1);
  res.sendStatus(204);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
