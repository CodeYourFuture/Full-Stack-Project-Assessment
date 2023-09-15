require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const videos = require("./exampleresponse.json");

app.use(express.json());

// credentials for database
const db = new Pool({
  user: process.env.POSTGRES_USERNAME,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  ssl: true,
});

// GET "/"

// Connecting to database
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


// This endpoint is used to get all the videos using SQL queries

app.get("/videos", (req, res) => {
  // getting data from videos table
  db.query(`SELECT * FROM videos ORDER BY title`, (error, result) => {
    // using callback function to catch the error; later on we can use .then promises
    if (!error) {
      res.json(result.rows);
    } else {
      console.log(error.message);
    }
    db.end;
  });
});

// get one particular video using the ID using SQL queries
app.get("/videos/:id", function (req, res) {
  const searchId = Number(req.params.id);

  db.query("SELECT * FROM videos WHERE id = $1", [searchId])
    .then((result) => {
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404).json({
          result: "failure",
          message: "Video could not be found",
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(404).json({
        result: "failure",
        message: "Video could not be found",
      });
    });
});

// app.get("/videos", (req, res) => {
//   db.query("SELECT * FROM videos").then((result) => {
//   response.json( result.rows );
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// });

// This endpoint is used to create new videos
app.post("/videos", (req, res) => {
  const { title, url } = req.body;
  if (!title || !url || !url.startsWith("https://www.youtube.com")) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    const idList = videos.map((video) => video.id);
    const id = Math.max(...idList) + 1;
    const newVideo = {
      id,
      title,
      url,
      rating: 0,
    };
    videos.push(newVideo);
    res.status(201).json({ id });
  }
});

// This endpoint is used to get a single video with a given ID
app.get("/videos/:id", (req, res) => {
  const id = Number(req.params.id);
  const matchingVideo = videos.find((video) => {
    return video.id === id;
  });
  if (!matchingVideo) {
    res.status(400).send("No matching video with this ID exists.");
  } else {
    res.status(200).json({ matchingVideo });
  }
});

// This endpoint is used to delete a single video with a given ID
app.delete("/videos/:id", (req, res) => {
  let id = Number(req.params.id);
  const matchingVideo = videos.find((video) => {
    return video.id === id;
  });

  if (!matchingVideo) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be deleted",
      id: id,
    });
  } else {
    const videoIndexToBeDeleted = videos.indexOf(matchingVideo);
    videos.splice(videoIndexToBeDeleted, 1);
    res.status(200).json({});
  }
});

// This endpoint is used to update an existing video with a given ID
app.put("/videos/:id", (req, res) => {
  const newVideo = req.body;
  let id = Number(req.params.id);
  const videoIndex = videos.findIndex((video) => {
    return video.id === id;
  });
  if (videoIndex === -1) {
    res.status(404).send("Video not found");
  } else {
    videos.splice(videoIndex, 1, newVideo);
    res.status(200).send({ newVideo });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
