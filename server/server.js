const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const crypto = require("crypto");
const cors = require("cors");
const { Pool } = require("pg");

app.use(cors()); // this is installed to allow react to fetch data from the api refer =>  https://tinyurl.com/m4de5wt6 & https://www.npmjs.com/package/cors

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const pool = new Pool({
  user: "riyaaz",
  host: "dpg-cf6i86ta499d72v8lk0g-a.oregon-postgres.render.com",
  database: "full_stack_db",
  password: "p16wwl631GxxMFFXsDYmKAmk0NCIa8cQ",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

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

// GET "/"
app.get("/", (req, res) => {
  res.status(200).json(videos);
});

// POST "/"

app.post("/", (req, res) => {
  let newVideo = {
    id: crypto.randomBytes(8).toString("hex"),
    title: req.body.title,
    video: req.body.url,
  };
  if (newVideo.title || newVideo.url) {
    videos.push(newVideo);
    res.json({
      id: newVideo.id,
    });
  } else {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

// GET "{id}""

app.get("/:id", (req, res) => {
  let videoId = req.params.id;
  let found = videos.some((video) => video.id === videoId);
  if (found) {
    res.json(videos.filter((video) => video.id === videoId));
  } else {
    res.status(404).json({
      msg: `There is no video found with ID: ${videoId}`,
    });
  }
});

//DELETE "/{id}"

app.delete("/:id", (req, res) => {
  const videoId = req.params.id;
  let found = videos.some((video) => video.id === videoId);
  if (found) {
    videos = videos.filter((vid) => vid.id !== videoId);
    res.json({
      msg: `Successfully delete video with id: ${videoId}`,
    });
  } else {
    res.status(400).json({
      msg: `No video with id: ${videoId} found`,
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
