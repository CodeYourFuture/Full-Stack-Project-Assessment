const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const port = process.env.PORT || 5000;
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(bodyParser.json());
// const videos = require("./movieData.json");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_videos",
  password: "Hannover8",
  port: 5432,
});

app.get("/videos", async (req, res) => {
  let order = req.query.order || "DESC";
  try {
    let result = await pool.query(`SELECT * FROM videos `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Post videos

function validateYouTubeUrl(url) {
  let regExp =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return url.match(regExp);
}
app.post("/videos", function (req, res) {

  const newtTitle = req.body.title;
  const newUrl = req.body.url;
  const newRating = 0;
  const query = "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)";
  if (!req.body.title || !validateYouTubeUrl(req.body.url)) {
    res
      .status(400)
      .json({ msg: "Please make sure to include  title and valid url" });
    return;
  }
  pool
    .query(query, [newtTitle, newUrl, newRating])
    .then(() => res.send("Video added!"))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// get video by id
app.get("/videos/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let filteredVideos = videos.find((video) => video.id === id);

  if (!filteredVideos) {
    res.status(404).send(`No video with the ${id} is found`);
    return;
  }
  res.send(filteredVideos);
});

app.delete("/videos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  pool
    .query("SELECT * FROM videos WHERE id= $1", [id])
    .then((result) => {
      if (result.rows === 0) res.status(404).send("Video doesn't exist");
      else {
        pool
          .query("DELETE FROM videos WHERE id= $1", [id])
          .then((result) => {
            res.status(200).send("video deleted");
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
