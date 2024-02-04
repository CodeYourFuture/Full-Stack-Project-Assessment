const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 5000;

const { Pool } = require("pg");

// const isProduction = process.env.NODE_ENV === "production";
// // const connectionString = `postgresql://${process.env.user}:${process.env.PASSWORD}@${process.env.host}:${process.env.port}/${process.env.database}`;
// const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ...

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.get("/", (req, res) => {
  res.send("Hello from the Server!");
});

app.get("/videos", (req, res) => {
  const orderBy = req.query.order;
  let query;

  if (orderBy === "desc") {
    query = "SELECT * FROM videos ORDER BY rating DESC";
  } else {
    query = "SELECT * FROM videos ORDER BY rating ASC";
  }

  pool
    .query(query)
    .then((result) => res.status(200).json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Search a video by title
// Search a video by title
app.get("/videos/:videoTitle", function (req, res) {
  const videoTitle = req.params.videoTitle;

  // Use the correct column name (title) in the WHERE clause
  pool
    .query("SELECT * FROM videos WHERE title=$1", [videoTitle])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// Add a new video
// const videoId = Date.now();

function validateYouTubeUrl(url) {
  let regExp =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  return url.match(regExp);
}

app.post("/videos", function (req, res) {
  // const newVideoId = videoId
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
    });
});


app.delete("/videos/:videosId", function (req, res) {
  const videosId = req.params.videosId;

 
  const query = "DELETE FROM videos WHERE id = $1";

  pool
    .query(query, [videosId]) 
    .then(() => res.status(200).send("Video deleted!"))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.put("/videos/:id", (req, res) => {
  const updateId = req.params.id;
  const newRating = req.body.rating;
  pool
    .query("UPDATE videos SET rating=$1 WHERE id=$2", [newRating, updateId])
    .then(() => res.status(201).send({ success: "Rating has been updated" }))
    .catch((error) => console.log(error));
});
app.listen(port, () => console.log(`Listening on port ${port}`));
