require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const port = process.env.PORT || 5000;

// Connect to `youtube-video-db` on hertaku
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Import local json data
const data = require(".././exampleresponse.json");

// Import uuid int library
const UUID = require("uuid-int");

// Enable cross-origin resource sharing middleware in app
app.use(cors());

// Enable POST's from a form in app
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//GET endpoint `/order`
app.get("/", (req, res) => {
  pool.query("SELECT * FROM youtube_videos", (error, result) => {
    const sortOrder = req.query.order;
    const orderedData = [...result.rows];

    sortOrder === "asc"
      ? orderedData.sort((v1, v2) => v1.rating - v2.rating)
      : orderedData.sort((v1, v2) => v2.rating - v1.rating);

    error
      ? res.status(400).json({ success: false })
      : res.status(200).json(orderedData);
  });
});

// GET endpoint `/:id`
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    `select * FROM youtube_videos AS yv WHERE yv.id = ${id};`,
    (error, result) => {
      error
        ? res.status(400).json({
            result: "failure",
            message: "No Video with that id",
          })
        : res.status(200).json(result.rows);
    }
  );
});

// POST endpoint `/` to add new `video` content with valid field check
app.post("/", (req, res) => {
  const title = req.body.title;
  const url = req.body.url;
  const uploaded = req.body.uploaded;

  pool.query(
    `INSERT INTO youtube_videos (title, url, rating, uploaded) VALUES('${title}', '${url}', '${0}', '${uploaded}');`,
    (error, result) => {
      title === undefined || url === undefined || error
        ? res
            .status(400)
            .json({ result: "failure", message: "Video could not be saved" })
        : res.status(201).json({ id: result.rows.id });
    }
  );
});

// DELETE endpoint `/:id` with feedback
app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    `DELETE FROM youtube_videos AS yv WHERE yv.id = ${id};`,
    (error, result) => {
      error
        ? res
            .status(400)
            .json({ result: "failure", message: "Video could not be deleted" })
        : res.status(200).json({});
    }
  );
});

// PUT endpoint `/:id` to update `youtube-video-db.rating`
app.put("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  const videoRating = req.body.rating;

  pool.query(
    `UPDATE youtube_videos SET rating = ${videoRating} where id = ${videoId}`,
    (error, result) => {
      error
        ? res.status(400).json({
            result: "failure",
            message: `Video with id:${videoId} not updated`,
          })
        : res.status(200).json({
            result: "success",
            message: `Video with id:${videoId} updated!`,
          });
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
