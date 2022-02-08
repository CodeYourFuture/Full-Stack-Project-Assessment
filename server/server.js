const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [
  {
    "id": 523523,
    "title": "Never Gonna Give You Up",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "rating": 23,
  },
  {
    "id": 523427,
    "title": "The Coding Train",
    "url": "https://www.youtube.com/watch?v=HerCR8bw_GE",
    "rating": 230,
  },
  {
    "id": 82653,
    "title": "Mac & Cheese | Basics with Babish",
    "url": "https://www.youtube.com/watch?v=FUeyrEN14Rk",
    "rating": 2111,
  },
  {
    "id": 858566,
    "title": "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    "url": "https://www.youtube.com/watch?v=xbs7FT7dXYc",
    "rating": 11,
  },
  {
    "id": 453538,
    "title":
      "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
    "url": "https://www.youtube.com/watch?v=4As0e4de-rI",
    "rating": 3211,
  },
  {
    "id": 283634,
    "title": "Learn Unity - Beginner's Game Development Course",
    "url": "https://www.youtube.com/watch?v=gB1F9G0JXOo",
    "rating": 211,
  },
  {
    "id": 562824,
    "title": "Cracking Enigma in 2021 - Computerphile",
    "url": "https://www.youtube.com/watch?v=RzWB5jL5RX0",
    "rating": 111,
  },
  {
    "id": 442452,
    "title": "Coding Adventure: Chess AI",
    "url": "https://www.youtube.com/watch?v=U4ogK0MIzqk",
    "rating": 671,
  },
  {
    "id": 536363,
    "title": "Coding Adventure: Ant and Slime Simulations",
    "url": "https://www.youtube.com/watch?v=X-iSQQgOd1A",
    "rating": 76,
  },
  {
    "id": 323445,
    "title": "Why the Tour de France is so brutal",
    "url": "https://www.youtube.com/watch?v=ZacOS8NBK6U",
    "rating": 73,
  },
];

const pool = new Pool(

})





// GET all videos
app.get("/", (req, res) => {
  const data = videos;
  res.send(data);
});




// POST(add) a video
app.post("/", (req, res) => {
  const title = req.body.title;
  const url = req.body.url;
  const newVideo = {
    "id": Math.floor(Math.random() * 1000000),
    "title": title,
    "url": url,
    "rating": 99999,
  };
  if (!title || !url) {
    res.status(404).json({
      "result": "failure",
      "message": "Video could not be saved",
    });
  } else {
    videos.push(newVideo);
    res.status(200).json([{ message: "success" }, newVideo]);
  }
});
// GET video by id
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const found = videos.find((video) => video.id === id);
  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "video could not be found" });
  }
});
// DELETE video by id
app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = videos.findIndex((video) => video.id === id);
  console.log(index);
  if (index !== -1) {
    videos.splice(index, 1);
    res.status(200).json({ message: "video deleted" });
  } else {
    res
      .status(404)
      .json({ result: "failure", message: "Video could not be deleted" });
  }
});
