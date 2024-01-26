const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { Pool } = require("pg");
require("dotenv").config();
app.use(express.json());
app.use(cors());

// const db = new Pool({
//   user: process.env.db_user,
//   host: process.env.db_host,
//   database: process.env.db_name,
//   password: process.env.db_password,
//   port: process.env.db_port,
//   ssl: true,
// });

const db = new Pool({
  user: "cyf",
  host: "localhost",
  database: "build-videodb",
  password: "glasgow321!",
  port: 5432,
  //ssl: true,
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
//const videos = require("./exampleresponse.json");

// GET "/" to get all the videos from online server and db
app.get("/", (req, res) => {
  db.query("SELECT * FROM videos")
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST "/" to post a new video

// app.post("/", (req, res) => {
//   const { title, url } = req.body;
//   if (!title || !url) {
//     return res.status(400).json({
//       result: "failure",
//       message: "Video could not be saved.",
//     });
//   } else {
//     const videoId = url.match(
//       /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/
//     )[1];
//     const newVideo = {
//       id: videoId,
//       title: title,
//       url: url,
//       rating: 0,
//     };
//     videos.push(newVideo);
//     res.status(201).json({
//       id: newVideo.id,
//     });
//   }
// });

//POST to online server and db

app.post("/", async function (req, res) {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      return res.status(400).json({
        result: "failure",
        message: "Video could not be saved.",
      });
    }
    const addNewVideoQuery =
      "INSERT INTO videos (title, url, rating)" +
      "VALUES ($1, $2, $3) RETURNING id";
    const showVideo = "SELECT * FROM videos WHERE id = $1";
    const dbResult = await db.query(addNewVideoQuery, [title, url, 0]);
    const videoResult = await db.query(showVideo, [dbResult.rows[0].id]);
    return res.status(201).json(videoResult.rows[0]);
  } catch (err) {
    console.log("Error adding video");
    return res.status(500).json({ err: "error" });
  }
});

//DELETE "/{id}"

app.delete("/:id", async function (req, res) {
  try {
    const videoId = Number(req.params.id);
    const deletedVideo = await db.query("DELETE FROM videos WHERE id = $1", [
      videoId,
    ]);
    res.status(201).json({
      message: "Video deleted",
    });
  } catch (error) {
    res.status(404).json({
      result: "failure",
      error: "Video could not be deleted",
    });
  }
});

//GET BY id "/{id}"

app.get("/:id", async function (req, res) {
  try {
    const videoId = parseInt(req.params.id);
    const videoById = await db.query("SELECT * FROM videos WHERE id = $1", [
      videoId,
    ]);
    res.status(202).json(videoById.rows);
  } catch (error) {
    res.status(400).json(error);
  }
});

//PUT method

app.put("/:id", async function (req, res) {
  try {
    const videoId = parseInt(req.params.id);
    const videoRating = parseInt(req.body.rating);
    const updateVideo = await db.query(
      "UPDATE videos SET rating = $1 WHERE id = $2",
      [videoRating, videoId]
    );
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});
