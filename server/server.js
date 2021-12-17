const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const videos = require("../exampleresponse.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const { Pool } = require("pg");
const pool = new Pool({
  user: "dharma",
  connectionString:
    "postgres://ynehfehljaszas:3d0363831d348ea599ceea15b97afcb4019b745bb2ef9164a8a388fe646ee42d@ec2-52-30-133-191.eu-west-1.compute.amazonaws.com:5432/d4u6hoaud3j05c",
  ssl: { rejectUnauthorized: false },
  host: "ec2-52-30-133-191.eu-west-1.compute.amazonaws.com",
  database: "d4u6hoaud3j05c",
  password: "",
  port: 5432,
});

// GET "/" all videos
app.get("/", (req, res, next) => {
  pool.query("SELECT * FROM videos", (db_err, db_res) => {
    if (!db_err) {
      res.status(200).send(db_res.rows);
    } else {
      res.status(500).send(db_err);
    }
    next();
  });

  /*   if (res.status(200)) {
    res.send(videos);
  } else {
    res.status(500).send("error!");
  } */
});

//Get video by ID
app.get("/:videoId", (req, res) => {
  const videoId = req.params.videoId;
  const videoWithId = videos.find((video) => video.id == videoId);
  videoWithId
    ? res.send(videoWithId)
    : res.status(404).send({ result: "failure", msg: "Video doesn't exist" });
});

//Add New Video
let tempId = Math.floor(Math.random() * 10000);
app.post("/", (req, res) => {
  let title = req.body.title;
  console.log(req.body.url);
  let url = req.body.url;
  const newVideoToAdd = {
    id: tempId,
    title: title,
    url: url,
  };

  if (!title || !url || !url.includes("youtube") || !url.includes("watch?v=")) {
    return res
      .status(400)
      .send({ result: "failure", msg: "Video could not be saved" });
  }

  videos.push(newVideoToAdd);
  res.send({ id: newVideoToAdd.id });
});

app.delete("/:videoId", (req, response) => {
  const videoId = req.params.videoId;
  const videoIndex = videos.findIndex((video) => video.id == videoId);
  if (videoIndex === -1) {
    return response.status(404).send({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
  videos.splice(videoIndex, 1);
  response
    .status(204)
    .send({ msg: `Video with the id of ${videoId} was successfully deleted` });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
