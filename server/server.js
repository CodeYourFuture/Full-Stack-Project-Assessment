const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const port = process.env.PORT || 5000;
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(bodyParser.json());
// const videos = require("./movieData.json");

const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
 connectionTimeoutMillis : 6000,
 ssl: {
  rejectUnauthorized : false
 }
});


app.get("/videos", (req, res) => {
  const orderBy = req.query.order; 
  console.log(orderBy)

  const query =
    orderBy === "desc"
      ? `SELECT * FROM videos ORDER BY rating desc`
      : `SELECT * FROM videos ORDER BY rating`;

  pool.query(query).then((result) => res.status(200).json(result.rows));
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
  const newRating = req.body.rating;
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
// getting videos by id
app.get("/videos/:id", (req, res) => {
  const id = req.params.id;

  pool
    .query("SELECT * FROM videos WHERE  id=$1", [id])
    .then((result) => {
      if (result.rows.length === 0) res.status(404).send("Id not found");
      else res.status(200).json(result.rows);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// deleting by id
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

app.patch("/videos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const rating = req.body.rating || 0;
    await pool.query("UPDATE videos SET rating = $1 WHERE id = $2", [
      rating,
      id,
    ]);
  } catch (error) {
    res.status(500).json(error);
  }
});



app.listen(port, () => console.log(`Listening on port ${port}`));
