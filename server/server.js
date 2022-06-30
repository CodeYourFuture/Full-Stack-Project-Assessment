const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
const data = require("../exampleresponse.json");

const { uuid } = require("uuidv4");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_videos",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.get("/", function (req, res) {
  pool
    .query("SELECT * FROM videos")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

let videos = [...data];

// app.get("/", function (req, res) {
//   res.json(videos);
// });

app.post("/", function (req, res) {
  const { title, url, rating } = req.body;

  const newVideo = {
    id: uuid(),
    title,
    url,
    rating: rating ? rating : 0,
  };

  if (!newVideo.title || !newVideo.url) {
    return res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    videos.push(newVideo);
    //use pool to write a query that will insert a row into a table videos
    res.status(200).json({ message: `Added video id: ${id}` });
  }
});

app.get("/search", (req, res) => {
  const searchTerm = req.query.term;
  //use pool to write a query using WHERE clause to search for search term then return the results to the client
  // const filteredData = videos.filter((video) => {
  //   video.title.toLowerCase().includes(searchTerm.toLowerCase());

  //   if (filteredData.length === 0) {
  //     res
  //       .status(400)
  //       .json({ message: `No videos including ${searchTerm} found` });
  //   }

  //   return res.json(filteredData);
  // });
});

app.get("/:id", function (req, res) {
  let id = parseInt(req.params.id);
  //use pool to write a query to filter videos by id, using WHERE clause
  // let foundVideo = videos.filter((i) => i.id == id); //rephrase
  //write it as then promise
  if (foundVideo) {
    res.status(200).json(foundVideo);
  } else {
    res.status(400).send({ message: `No video with id: ${id} found` });
  }
});

app.delete("/:id", function (req, res) {
  let id = parseInt(req.params.id);
  // let foundVideo = videos.filter((i) => i.id == id); //rephrase
  //write a query that given the id deletes the video with that id
  if (foundVideo) {
    return res.status(200).json({});
  } else {
    return res.status(400).json({
      result: "failure",
      message: `Video ${id} could not be deleted`,
    });
  }
});

//write post request to back end to add video to the list
//change it to work for database as in the examples above

app.listen(port, () => console.log(`Listening on port ${port}`));
