const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});
const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

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

// GET "/"
app.get("/videos", async (req, res) => {
  try {
    const query = `SELECT * FROM videos`;
    const result = await db.query(query);
    const videos = result.rows;
    res.status(200).json(videos);
  } catch (error) {
    res.status(404).json({ error: "Fetch" });
  }
});

//POST "/"
app.post("/videos", (req, res) => {
  //const { title, url } = req.body;
  // const title = req.body.title;
  // const url = req.body.url;
  // if (!title || !url) {
  //   return res.status(400).json({
  //     result: "Failure",
  //     message: "Video could not be saved",
  //   });
  // } else {
  //   let nextVideoId = videos[videos.length - 1].id + 1;
  //   const newAddedVideo = {
  //     id: nextVideoId,
  //     title: title,
  //     url: url,
  //   };
  //   console.log(newAddedVideo);
  //   videos.push(newAddedVideo);
  //   res.status(201).json(videos);
  // }
  const title = req.body.title;
  const url = req.body.url;
  const rating = req.body.rating;
  const query = `INSERT INTO videos (title, url, rating)
VALUES ($1, $2, $3)`;
  db.query(query, [title, url, rating])
    .then(() => {
      res.status(201).send("New video succesfully added!");
    })
    .catch((error) => {
      console.log(error);
    });
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  const video = videos.find((singleVideo) => singleVideo.id === videoId);
  if (!video) {
    return res.status(404).json({
      result: "Failure",
      message: "Video not found",
    });
  } else {
    res.status(200).json(video);
  }
});

// DELETE "/{id}"

app.delete("/videos/:id", (req, res) => {
  const videoId = parseInt(request.params.id);
  const singleVideo = videos.find((singleVideo) => singleVideo.id === videoId);
  if (singleVideo) {
    videos.splice(singleVideo, 1);
  }
  res.json(videos);
});
