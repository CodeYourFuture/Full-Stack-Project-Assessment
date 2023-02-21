const cors = require("cors");
const { Pool } = require("pg");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
// let videos = require("./data/exampleresponse.json");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "codeyourfuture",
  password: "cyf123",
  database: "cyf_videos_project"
});

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const rs = await pool.query("SELECT * FROM videos");

  res.json(rs.rows);
});

app.get("/:id", (req, res) => {
  
  const video = videos.find(video => video.id === +req.params.id);
  res.json(video);
});

app.post("/", async (req, res) => {
  const video = {
    id: Math.round(Math.random() * 1000),
    title: req.body.title,
    url: req.body.url,
    rating: 0
  };

  try {
    await pool.query("INSERT INTO videos (title, url) VALUES($1, $2, $3, $4)", [video.id, video.title, video.url, video.rating]);
    const rs = await pool.query("SELECT id from videos ORDER BY id DESC LIMIT 1");

    res.json({ id: rs.rows[0].id });
  } catch (error) {
    console.log(error.message);
    res.json({
      result: "failure",
      message: "Video could not be saved"
    });
  }
});

app.patch("/:id/increaserating", async (req, res) => {
  const videoId = +req.params.id;

  try {
    await pool.query("UPDATE videos SET rating = (rating + 1) WHERE id = $1", [videoId]);

    res.json({});
  } catch (error) {
    res.json({
      result: "failure",
      message: "Video could not be deleted"
    });
  }
});

app.patch("/:id/decreaseRating", async (req, res) => {
  const videoId = +req.params.id;

  try {
    await pool.query("UPDATE videos SET rating = (rating - 1) WHERE id = $1", [videoId]);

    res.json({});
  } catch (error) {
    res.json({
      result: "failure",
      message: "Video could not be deleted"
    });
  }
});

app.delete("/:id", async (req, res) => {
  const videoId = +req.params.id;

  try {
    await pool.query("DELETE FROM videos WHERE id = $1", [videoId]);

    res.json({});
  } catch (error) {
    res.json({
      result: "failure",
      message: "Video could not be deleted"
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));