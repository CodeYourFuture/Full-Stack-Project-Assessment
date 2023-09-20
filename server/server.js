const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./DBConfig");
const app = express();

app.use(express.json());
//app.use(bodyParser.json());
dotenv.config();

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(cors());

// Store and retrieve your videos from here

// GET "/"
app.get("/videos", async (req, res) => {
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
  const { title, url, rating, date } = req.body;
  const ratingValue = typeof rating === "undefined" ? 0 : rating;
  try {
    const newItem = await pool.query(
      "INSERT INTO videos (title, url, rating, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, url, rating, date]
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
app.delete("/videos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedItem = await pool.query("DELETE FROM videos WHERE id = $1", [
      id,
    ]);
    if (deletedItem.rowCount === 0) {
      res.status(404).json({ message: "Video not found" });
    } else {
      res.status(204).json({ message: "The video is deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
