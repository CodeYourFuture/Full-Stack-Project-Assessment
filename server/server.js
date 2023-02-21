const express = require("express");
const app = express();
// const videos = require("./exampleresponse.json");
const { Pool } = require("pg");

const port = 5000;
app.use(express.json());

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "1",
  database: "videos_list_project",
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//  level200-start
app.get("/videos", (req, res) => {
  // let { order } = req.query;
  // order = order === "asc" ? "ASC" : "DESC";
  //  level299-Ordered Data - Back End/start
  // send url: http://localhost:5000/videos?order=desc or asc for test in postman
  pool.query("SELECT * FROM videos", (error, result) => {
    res.json(result.rows);
  });
  // db.query("SELECT * FROM youtube_videos ORDER BY rating "+ order )
  //   .then((result) => res.json(result.rows))
  //   .catch((error) => res.status(500).json(error));
});

// for convert string to number add + before request
app.get("/videos/:id", (req, res) => {
  const newId = +req.params.id;
  const oneVideo = videos.find((video) => video.id === newId);
  if (oneVideo) {
    res.json(oneVideo);
  }
  res.json({ result: "not Found" });
});

// insert into the database
app.post("/videos", function (req, res) {
  const { title, url } = req.body;
  if (title && url) {
    pool.query(
      "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)",
      [title, url, 0],
      (error, results) => {
        if (error) {
          throw error;
        }
      }
    );
  } else {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});
// delete from database
app.delete("/videos/:id", (req, res) => {
  const newId = +req.params.id;
  pool.query("DELETE FROM videos WHERE id = $1", [newId], (error, results) => {
    if (error) {
      res.status(404).json({
        result: "failure",
        message: "Video could not be deleted",
      });
      throw error;
    }
  });
});
