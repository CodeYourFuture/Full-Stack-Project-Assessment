const express = require("express");
const app = express();
let cors = require("cors");
const port = process.env.PORT || 5000;

const { Pool } = require("pg");

const pool = new Pool({
  user: "test_user",
  host: "dpg-cf84pipgp3jqqer4p7pg-a.oregon-postgres.render.com",
  database: "videodatabase",
  password: "DADzD8tW2qqHuF8NI4AHDhEH9z7L7Lqo",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(express.json()); // before our routes definition
app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "example response.json" into here to have some data to work with

// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
  console.log(videos, "Sending video data");
});

// POST "/"
app.post("/", (req, res) => {
  let newVideo = req.body;
  if (!(req.body.title || req.body.url)) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    newVideo.id = videos[videos.length - 1].id + 1;
    console.log(newVideo.id);
    videos.push(newVideo);
    res.status(200).json({
      id: newVideo.id,
    });
  }

  //  Read one video specified by an ID
  app.get("/videos/:id", (req, res) => {
    console.log(req.params.id);
    const id = parseInt(req.params.id);
    res.status(200).send(videos.filter((video) => video.id === id));
    console.log(videos.filter((video) => video[id] === id));
  });

  //  Delete a video, by ID
  app.delete("/videos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const result = videos.filter((video) => video.id !== id);
    videos = result;
    console.log("DELETE /video route");
    res.status(200).send(result);
  });

  function createTable() {
    const createTable =
      "CREATE TABLE videos( id SERIAL PRIMARY KEY, title VARCHAR(30) NOT NULL, url VARCHAR(120) NOT NULL, rating INT)";
    return createTable;
  }

  app.post("/videos", function (req, res) {
    console.log(createTable(), "My post query should work!!");
    pool
      .query(createTable())
      .then((result) => res.json(result.rows))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  });
});
app.listen(port, () => console.log(`Listening on port ${port}`));
