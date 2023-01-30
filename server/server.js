const express = require("express");
const path = require("path");
const app = express();
const generateUniqueId = require("generate-unique-id");
const port = process.env.PORT || 3005;
const { Pool } = require("pg");
const dotenv = require("dotenv");

// Config .env file path
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// Connection to db setting
const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
});

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/build")));

let videos = require("./exampleresponse.json");

// Validate url function
function isValidYouTubeUrl(url) {
  if (url !== undefined || url !== "") {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
    return url.match(regExp) ? url : false;
  }
}

// GET all videos
app.get("/api", async (req, res) => {
  const order = req.query.order || "DESC";
  try {
    let result = await pool.query(
      `SELECT * FROM videos ORDER BY rating ${order}`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST new video
app.post("/api", async (req, res) => {
  try {
    const videoId = generateUniqueId({
      length: 6,
      useLetters: false,
    });
    const newVideo = {
      id: parseInt(videoId),
      title: req.body.title,
      url: req.body.url,
      rating: 0,
      postedAt: new Date(),
    };
    const query =
      "INSERT INTO videos (id, title, url, rating, posted_at) VALUES ($1, $2, $3, $4, $5)";
    await pool.query(query, [
      newVideo.id,
      newVideo.title,
      newVideo.url,
      newVideo.rating,
      newVideo.postedAt,
    ]);
    res.send({ success: "New video added" });
  } catch (error) {
    res
      .status(400)
      .send({ result: "failure", message: "Video could not be saved" });
  }
});

// GET video by id
app.get("/api/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query("SELECT * FROM videos WHERE id = $1", [id]);
    if (result.rows.length <= 0) {
      res.status(404).send({
        result: "failure",
        message: "No matching result",
      });
    }
    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE video by id
app.delete("/api/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query("DELETE FROM videos WHERE id = $1", [id]);
    res.json({});
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE video rating by id
app.patch("/api/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const rating = req.body.rating;
    await pool.query("UPDATE videos SET rating = $1 WHERE id = $2", [
      rating,
      id,
    ]);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
