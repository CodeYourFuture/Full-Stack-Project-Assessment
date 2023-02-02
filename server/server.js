const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const path=require("path");
dotenv.config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_STRING } = process.env;

const db = new Pool({
  host: DB_HOST,
  port: 5432,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  connectionString: DB_STRING,
  ssl: { rejectUnauthorized: false },
});

if(process.env.NODE_ENV==="development"){
 const cors=require('cors');
 app.use(cors());
}else{
    app.use(express.static(path.resolve(__dirname,'../client/build'))); 
}
app.use(express.json());

const port = process.env.PORT || 5000;

// GET  all videos
app.get("/videos", (req, res) => {
  const order = req.query.order;
  let query = `SELECT * FROM videos ORDER BY rating DESC`;
  if (order === "asc") {
    query = `SELECT * FROM videos ORDER BY rating`;
  }
  db.query(query)
    .then((result) => res.json(result.rows))
    .catch((error) => res.status(500).json(error));
});

//POST new video
app.post("/videos", (req, res) => {
  const newTitle = req.body.title;
  const newUrl = req.body.url;
  const date = new Date().toLocaleString();
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  if (!newTitle || !newUrl) {
    return res.status(400).json({
      result: "failure",
      message: "Both title and url fields are required",
    });
  }
  if (!youtubeRegex.test(newUrl)) {
    return res
      .status(400)
      .json({ result: "failure", message: "Invalid YouTube URL" });
  }
  const query =
    "INSERT INTO videos (title,url,rating,date) VALUES ($1, $2, $3, $4)";
  db.query(query, [newTitle, newUrl, 0, date])
    .then(() =>
      res.json({
        result: "success",
        message: "Video has been successfully added!",
      })
    )
    .catch((error) => res.status(500).json(error));
});

//GET video by ID
app.get("/videos/:id", (req, res) => {
  let videoID = parseInt(req.params.id);
  const query = `SELECT * FROM videos WHERE id =$1`;
  if (!Number.isInteger(videoID)) {
    return res.status(400).json({ message: "Invalid input" });
  }
  db.query(query, [videoID])
    .then((result) => {
      if (result.rows.length == 0) {
        res
          .status(500)
          .json({ message: `No video with id ${videoID} has been found` });
      } else {
        res.json(result.rows);
      }
    })
    .catch((error) => res.status(500).json(error));
});

//DELETE the video
app.delete("/videos/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  db.query("SELECT * FROM videos WHERE id = $1", [videoId]).then((result) => {
    if (result.rows.length == 0) {
      return res
        .status(500)
        .json({ result: "failure", message: "Video could not be deleted" });
    } else {
      db.query("DELETE FROM videos WHERE id=$1", [videoId])
        .then(() => res.status(200).json({ message: `Video has been deleted` }))
        .catch((error) => res.status(500).json(error));
    }
  });
});

//UPDATE rating of video
app.patch("/videos/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  const newRating = req.body.rating;
  db.query("UPDATE videos SET rating=$1 WHERE id=$2", [newRating, videoId])
    .then(() => res.send(`Ratings of video id ${videoId} updated!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
