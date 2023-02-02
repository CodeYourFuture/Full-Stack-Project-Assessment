const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.listen(port, () => console.log(`Listening on port ${port}`));



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
  }
];

// const maxID = uuid.v4();
// console.log(maxID);
let maxID = Math.max(...videos.map((video) => video.id));

app.get("/video", (req, res) => {
  const order = req.query.order;
  let sortedVideos;
  if (order === "asc") {
    sortedVideos = videos.sort((a, b) => a.rating - b.rating);
  } else if (order === "desc") {
    sortedVideos = videos.sort((a, b) => b.rating - a.rating);
  } else {
    sortedVideos = videos.sort((a, b) => b.rating - a.rating);
  }
  res.json(sortedVideos);
});


app.get("/video/:id", (req, res) => {
  const vidId = parseInt(req.params.id);

  const video = videos.find((v) => v.id === vidId);
  if (!video) {
    res.status(404).send("Not Found");
  }
  res.send(video);
});

//POST "/videos"

app.post("/video", (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ result: "error", message: "Missing Title" });
      } else if (!req.body.url) {
        res.status(400).send({ result: "error", message: "Missing URL" });
    return;
  }
 
  const newVideo = {
    id: ++maxID,
    title: req.body.title,
    url: req.body.url,
    rating: req.body.rating,
    };
  videos.push(newVideo);
  res.status(201).send({ id: newVideo.id, message: "data found" });
});

app.delete("/video/:id", (req, res) => {
  const vidId = parseInt(req.params.id);
  const vidIndex = videos.findIndex((v) => v.id === vidId);
  if (vidIndex < 0) {
    res.status(404).send("Video not found");
  }
  videos.splice(vidIndex, 1);
  res.send({ id: vidId, message: "Video deleted" });
});

