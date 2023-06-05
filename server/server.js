const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5050;
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(cors());
app.use(express.json());

//  Get all of the videos
app.get("/videos", async (req, res) => {
  try {
    const query = "SELECT * FROM videos";
    const result = await pool.query(query);
    const videos = result.rows;
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
  }
});
// let idCounter = Math.max(...videos.map((video) => video.id)) + 1;

//  Add a video to the API.
app.post("/videos", async (req, res) => {
  try {
    //  if  (!req.body.title || !req.body.url) {
    //     return res.status(400).json({ Message: "Video could not be saved" });
    //   }
    const { title, url } = req.body;
    const rating = 0;
    const query =
      "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3) RETURNING *";
    const values = [title, url, rating];
    const result = await pool.query(query, values);
    const newVideo = result.rows[0];
    res.status(201).json(newVideo);
  } catch (error) {
    console.error(error);
  }
  // const newVideos = {
  //   id: idCounter,
  //   title: req.body.title,
  //   url: req.body.url,
  //   rating: 0,
  // };
  // videos.push(newVideos);
  // console.log("New video added:", newVideos);
  // res.json({ id: newVideos.id });
});

// Get the video with the ID

app.get("/videos/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let foundVideo = videos.find((v) => v.id === id);
  if (foundVideo) {
    res.json(foundVideo);
  } else {
    res.status(404).json({ result: "failure", message: "Video not found" });
  }
});
// Deletes the video with the ID
app.delete("/videos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query = "DELETE FROM videos WHERE id = $1";
    const values = [id];
    await pool.query(query, values);
    res.json({ result: "success", message: "Video deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ result: "failure", message: "Video could not be deleted" });
  }
});

// Upvote a video by ID
app.put("/videos/:id/upvote", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query =
      "UPDATE videos SET rating = rating + 1 WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await pool.query(query, values);
    const updatedVideo = result.rows[0];
    res.json(updatedVideo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ result: "failure", message: "Video could not be upvoted" });
  }
});

// Downvote a video by ID
app.put("/videos/:id/downvote", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query =
      "UPDATE videos SET rating = rating - 1 WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await pool.query(query, values);
    const updatedVideo = result.rows[0];
    res.json(updatedVideo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ result: "failure", message: "Video could not be downvoted" });
  }
});

// GET "/"
// app.get("/", (req, res) => {
// Delete this line after you've confirmed your server is running
// res.send({ express: "Your Backend Service is Running" });
// });
app.listen(port, () => console.log(`Listening on port ${port}`));
