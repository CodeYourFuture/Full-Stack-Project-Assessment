require("dotenv").config();
const express = require("express");
const path = require("path");
const { body, validationResult } = require("express-validator");
const fs = require("fs");
const bodyParser = require("body-parser");

const cors = require("cors");
const pool = require("./db");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.use(cors());
pool.connect();

const newVideoValidate = [
  body("title").trim().notEmpty(),
  body("url")
    .trim()
    .notEmpty()
    .isURL()
    .isLength({ min: 30 })
    .withMessage("Warning: YouTube URL Must be Provided as Embed"),
];


app.get("/videos/data", async (req, res) => {
  try {
    const videos = await pool.query("select * from videos")
      res.status(200).json(videos.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.post("/videos/data/create", newVideoValidate, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTitle = req.body.title;
    const newUrl = req.body.url;

    if (
      !newUrl.startsWith("https://www.youtube.com/embed/") &&
      !newUrl.startsWith("https://www.youtube.com/watch?v=")
    ) {
      res.status(400).json({ message: "Invalid YouTube URL" });
    }

    const query = `INSERT INTO videos(title, url)` + `VALUES ($1, $2)`;
    const result = await pool.query(query, [newTitle, newUrl]);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: err });
  }
});

app.delete("/videos/data/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const query = "DELETE FROM videos WHERE id=$1";
    const deleteVideo = await pool.query(query, [id]);
    
      if (deleteVideo.rowCount === 0) {
        return res.status(404).send(`message: video for ID requested is not found`);
    }
    return res.status(200).send({ message: "Video has been deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred while deleting the video" });
  }

});


app.listen(port, () => console.log(`Listening on port ${port}`));
