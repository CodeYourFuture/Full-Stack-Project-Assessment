const express = require("express");
var isUrl = require("is-url");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(express.json());
app.use(cors());

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
  },
];

// GET "/"
app.get("/", (req, res) => {
  res.json(videos);
});

app.post("/", function (req, res) {
  const id = videos[videos.length - 1].id + 1;
  const newVideo = {
    id: id,
    title: req.body.title,
    url: req.body.url,
    rating: Math.floor(Math.random() * 100),
  };
  if (req.body.title && req.body.url && isUrl(req.body.url)) {
    videos.push(newVideo);
    res.status(200).json(videos);
  } else res.status(404).send("Please check the fields have been correctly filled in");
});

app.get("/search", function (req, res) {
  const searchItem = req.query.term;
  if (searchItem) {
    const searchVideos = videos.filter((video) =>
      video.title.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase())
    );
    if (searchVideos.length > 0) {
      res.status(200).json(searchVideos);
    } else {
      res.send("No match Found");
    }
  } else {
    res.status(404).send("Invalid input data.");
  }
});

app.get("/:id", function (req, res) {
  const id = Number(req.params.id);
  const filteredVideos = videos.filter((video) => video.id === id);
  if (filteredVideos.length !== 0) {
    res.status(200).json(filteredVideos);
  } else {
    res.status(404).send("Please check ID number");
  }
});

app.delete("/:id", function (req, res) {
  const id = Number(req.params.id);
  const videoID = videos.findIndex((video) => video.id === id);
  if (videoID > 0) {
    videos.splice(videoID, 1);
    res.status(200).send("Video successfully deleted");
    res.status(200).json({});
  } else {
    res.status(404).send("Please check ID number");
    res.status(404).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});
