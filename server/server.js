const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.db_url,
  ssl: { rejectUnauthorized: false },
});

const port = process.env.PORT || 5005;
app.use(express.json());
app.use(cors());

// pool.connect();
// GET "/"
// app.get("/", (req, res) => {
//   res.send("Welcome to Island Tony");
// });

app.get("/videos/:id", (req, res) => {
  const videosId = parseInt(req.params.id);
  const eachVideo = "SELECT * FROM videos WHERE id=$1";
  pool.query(eachVideo, [videosId]).then((result) => {
    if (result.rowCount === 0) {
      res.status(400).json({ message: `Video ${videosId} not found` });
    } else {
      res.status(200).json(result.rows);
    }
  });
});

//get request for all videos
app.get("/", async (req, res) => {
  try {
    const order = req.query.order || "ASC";
    let query = "SELECT * FROM videos ORDER BY rating ";
    if (order === "DESC") {
      query = "SELECT * FROM videos ORDER BY rating DESC";
    }
    const result = await pool.query(query);
    const sortedVideos = result.rows;
    res.json(sortedVideos);
  } catch (error) {
    console.error("Error retrieving videos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/videos/:id", function (req, res) {
  const videosId = parseInt(req.params.id);
  const eachVideo = "DELETE FROM videos WHERE id = $1";
  pool
    .query(eachVideo, [videosId])
    .then(() => res.status(200).json({ message: `Video ${videosId} deleted` }))
    .catch((error) => console.log(error));
});

app.post("/videos", async (req, res) => {
  try {
    if (req.body.title.trim() === "" || req.body.url.trim() === "") {
      res.status(400).json({ message: "All fields need to be filled" });
      return;
    }
    const order = req.query.order || asc;
    const newVideo = {
      title: req.body.title,
      url: req.body.url,
      rating: 0,
    };

    const query =
      "INSERT INTO videos(title,url,rating,date) VALUES ($1,$2,$3,$4)";
    const postDate = new Date().toLocaleString();
    const values = [newVideo.title, newVideo.url, newVideo.rating, postDate];
    const result = await pool.query(query, values);
    const createdVideo = result.rows[0];

    const allVideosQuery = `SELECT * FROM videos ORDER BY rating ${order}`;
    const allVideosResult = await pool.query(allVideosQuery);
    const allVideos = allVideosResult.rows;

    res.status(201).json(allVideos);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/video/:id", async (req, res) => {
  try {
    const videosId = Number(req.params.id);
    const newRating = Number(req.body.rating);
    const updateQuery = "UPDATE videos SET rating = $1 WHERE id = $2";
    const updateValues = [newRating, videosId];

    await pool.query(updateQuery, updateValues);
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Video could not be updated", error);
    res.status(500).json({ error: " Internal Server Error" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
