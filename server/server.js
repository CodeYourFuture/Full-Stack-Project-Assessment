const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./DBConfig");
const app = express();

app.use(express.json());
app.use(bodyParser.json());
dotenv.config();

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
//let videos = require("./exampleresponse.json");
const { BubbleSort } = require("./functions/BubbleSort");
const { BubbleSortReverse } = require("./functions/BubbleSortReverse");
// GET "/"
app.get("/videos", async (req, res) => {
  // const { order } = req.query;
  // BubbleSort(videos);
  // if (order === "asc") {
  //   BubbleSortReverse(videos);
  // }
  // res.json(videos);
  try {
    const allVideos = await pool.query("SELECT * FROM videos");
    res.json({ videos: allVideos.rows });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

//POST "/"
app.post("/videos", async (req, res) => {
  // const title = req.body.title;
  // const url = req.body.url;
  // const newVideo = { id: 0, title: title, url: url, rating: 0 };

  // if (newVideo.title && newVideo.url) {
  //   newVideo.id = videos.length + 1;
  //   videos.push(newVideo);
  // } else {
  //   res
  //     .status(400)
  //     .json({ result: "failure", message: "Video could not be saved" });
  // }
  // res.status(200).json(videos);
  const { title, url } = req.body;
  try {
    const newItem = await pool.query(
      "INSERT INTO videos (title, url) VALUES ($1, $2) RETURNING *",
      [title, url]
    );
    res.status(201).json({
      message: "New item added!",
      item: newItem.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

//GET "/{id}"
app.get("/videos/:id", (req, res) => {
  const id = req.params.id;
  const video = videos.find((v) => v.id == id);

  if (!video) {
    res.status(400).json(`There is no video with id ${id}`);
  }

  res.status(200).json(video);
});

//DELETE "/{id}"
app.delete("/videos/:id", (req, res) => {
  const id = req.params.id;
  const deletedVideoIndex = videos.findIndex((v) => v.id == id);

  if (deletedVideoIndex == -1) {
    res.status(404).json(`There is no video with id ${id}`);
  }

  videos.splice(deletedVideoIndex, 1);
  res.sendStatus(200).end();
});
