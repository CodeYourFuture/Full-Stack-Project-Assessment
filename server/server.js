const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

const { Pool } = require("pg");

// const db = new Pool({
//   host: "localhost",
//   user: "karleenrichards",
//   port: 5432,
//   password: "",
//   database: "kr-videos",
// });

const db = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  port: 5432,
  password: "",
  database: process.env.DATABASE,
});

// const db = new Pool({
//   host: "localhost",
//   user: process.env.USER,
//   port: 5432,
//   password: "",
//   database: process.env.DATABASE,
// });

// app.get("/videos", function (req, res) {
//   db.query("SELECT * FROM movies")
//     .then((result) => {
//       res.status(200).json(result.rows);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.get("/videos", (req, res) => {
  db.query("SELECT * FROM movies", (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
    } else {
      res.json(result.rows);
    }
  });
});

// app.get("/videos", (request, response) => {
//   const sortType = request.query.sort;
//   videos = videos.sort((a, b) => b.rating - a.rating);

//   if (sortType === "asc") {
//     videos.sort((a, b) => a.rating - b.rating);
//   } else if (sortType === "desc") {
//     videos.sort((a, b) => b.rating - a.rating);
//   }
//   response.status(200).json(videos);
// });

app.delete("/videos/:id", function (req, res) {
  const videoId = parseInt(req.params.id);
  db.query("SELECT * FROM movies WHERE id = $1", [videoId])
    .then((result) => {
      res.status(200).send("Video deleted successfully");
    })
    .catch((error) => {
      console.log(error);
    });
});

// GET BY ID
// app.get("/videos/:id", function (request, response) {
//   const videoId = request.params.id;
//   let video = videos.find((video) => video.id === videoId);
//   video ? response.send(video) : response.status(404);
// });

app.get("/videos/:id", function (req, res) {
  const videoId = parseInt(req.params.id);
  db.query("DELETE * FROM movies WHERE id = $1", [videoId])
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

// DELETE BY ID
// app.delete("/videos/:id", function (request, response) {
//   const videoId = request.params.id;
//   videos.find((video) => video.id === videoId)
//     ? (videos = videos.filter((video) => {
//         return video.id !== videoId;
//       }))
//     : response.status(404);
//   response.send(videos).status(204);
// });

// POST"/"
app.post("/videos", function (request, response) {
  const videoTitle = request.body.title;
  const VideoUrl = request.body.url;

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;

  if (!videoTitle) {
    return response
      .status(400)
      .json({ message: "Please add a title for your video" });
  }
  if (!VideoUrl) {
    return response.status(400).json({ message: "Please enter a url" });
  }

  if (request.body.url.match(youtubeRegex) === null) {
    return response.status(400).json({ message: "Please add a valid url" });
  }

  request.body.id = request.body.url.replace(
    "https://www.youtube.com/watch?v=",
    ""
  );

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const uploadDate = currentYear + "-" + currentMonth + "-" + currentDay;

  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();
  const uploadTime = currentHours + ":" + currentMinutes + ":" + currentSeconds;

  request.body.uploadTime = uploadTime;
  request.body.uploadDate = uploadDate;
  request.body.likes = 0;
  request.body.dislikes = 0;
  videos.push(request.body);

  videos.find((video) => video.id === request.body.id)
    ? response.status(201).json(request.body)
    : response.status(400).json({
        result: "failure",
        message: "Video could not be saved",
      });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
