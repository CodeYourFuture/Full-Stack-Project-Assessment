const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with


// // GET "/"
app.get("/videos", async (req, res) => {
  try {
    const query = `SELECT * FROM videos`;
    const result = await db.query(query);
    const videos = result.rows;
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//POST "/"
app.post("/videos", async (req, res) => {
  const title = req.body.title;
  const url = req.body.url;
  const rating = req.body.rating;
  const query = `INSERT INTO videos (title, url, rating)
VALUES ($1, $2, $3)`;
  const values = [title, url, rating];
  try {
    const result = await db.query(query, values);
    const videoId = result.rows[0].id;
    res.status(201).json({ id: videoId });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  const video = videos.find((singleVideo) => singleVideo.id === videoId);
  if (!video) {
    return res.status(404).json({
      result: "Failure",
      message: "Video not found",
    });
  } else {
    res.status(200).json(video);
  }
});

// DELETE "/{id}"

app.delete("/videos/:id", async (req, res) => {
  const videoId = req.params.id;
  const query = "DELETE FROM videos WHERE id = $1";
  const values = [videoId];

  try {
    await db.query(query, values);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
