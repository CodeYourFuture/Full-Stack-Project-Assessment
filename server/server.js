const express = require("express");
const cors = require("cors");
const app = express();
const { Pool } = require("pg");

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString:
    "postgres://user:BzA52BUb5uHl8B2oNiSWM8uixzot4m7W@dpg-cfakkd82i3mjduj6onq0-a.frankfurt-postgres.render.com/dbvideos",
  ssl: { rejectUnauthorized: false },
  user: "user",
  host: "postgres://user:BzA52BUb5uHl8B2oNiSWM8uixzot4m7W@dpg-cfakkd82i3mjduj6onq0-a.frankfurt-postgres.render.com/dbvideos",
  database: "dbvideos",
  password: "BzA52BUb5uHl8B2oNiSWM8uixzot4m7W",
  port: 5432,
});

// GET "/"
app.get("/", (req, res) => {
  pool
    .query("SELECT * FROM videos")
    .then((videos) => res.json(videos.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// POST "/"
const todayDate = new Date().toISOString().slice(0, 10);
const REGEXP =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

const isValidYoutubeUrl = (link) => {
  return link.trim().match(REGEXP) !== null;
};

app.post("/", (req, res) => {
  const addedVideoTitle = req.body.title.trim();
  const addedVideoUrl = req.body.url.trim();
  const addedVideoRating = 0;
  const addedVideoDate = todayDate;

  if (!addedVideoTitle || !isValidYoutubeUrl(addedVideoUrl)) {
    res.sendStatus(400);
    return;
  }
  pool
    .query("SELECT * FROM videos WHERE url=$1", [addedVideoUrl])
    .then((result) => {
      if (result.rows.length > 0) {
        res.sendStatus(422); // if url already exists
        return;
      }
      const query =
        "INSERT INTO videos (title, url, rating, date) VALUES ($1, $2, $3, $4)";
      pool
        .query(query, [
          addedVideoTitle,
          addedVideoTitle,
          addedVideoRating,
          addedVideoDate,
        ])
        .then(() => res.status(201))
        .catch((error) => {
          console.error(error);
          res.status(500).json(error);
        });
    });
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  const requestedVideoId = Number(req.params.id);
  if (!requestedVideoId) {
    return sendStatus(404);
  }
  const query = "SELECT * FROM videos WHERE id=$1";
  pool
    .query(query, [requestedVideoId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// DELETE "/{id}"
app.delete("/:id", (req, res) => {
  const deletedVideoId = Number(req.params.id);
  if (!deletedVideoId) {
    return sendStatus(404);
  }
  const query = "DELETE FROM videos WHERE id=$1";
  pool
    .query(query, [deletedVideoId])
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// PUT "{id}"
app.put("/id", function (req, res) {
  const requestedVideoId = req.params.id;
  const changedVideoRating = req.body.rating;
  if ((!requestedVideoId) || (!changedVideoRating)) {
    return sendStatus(404);
  }
  pool
    .query("UPDATE videos SET rating=$1 WHERE id=$2", [changedVideoRating, requestedVideoId])
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));