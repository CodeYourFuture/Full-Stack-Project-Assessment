const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const crypto = require("crypto");
const cors = require("cors");
const { Pool } = require("pg");

app.use(cors()); // this is installed to allow react to fetch data from the api refer =>  https://tinyurl.com/m4de5wt6 & https://www.npmjs.com/package/cors

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const pool = new Pool({
  user: "riyaaz",
  host: "dpg-cf6i86ta499d72v8lk0g-a.oregon-postgres.render.com",
  database: "full_stack_db",
  password: "p16wwl631GxxMFFXsDYmKAmk0NCIa8cQ",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

// GET "/"
app.get("/", (req, res) => {
  pool
    .query("SELECT * FROM videos")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// POST "/"
// CREATE NEW VIDEO

app.post("/", (req, res) => {
  const newVideoTitle = req.body.title;
  const newVideoUrl = req.body.url;
  const newVideoRating = req.body.rating;

  if (newVideoTitle.title === "" || newVideoUrl.url === "") {
    return res.status(400).send("Video could not be saved");
  } else {
    pool
      .query(
        "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)",
        [newVideoTitle, newVideoUrl, newVideoRating]
      )
      .then(() => res.send("Video created"))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
});

// GET by "{id}""

app.get("/:id", (req, res) => {
  const videoId = req.params.id;
  pool
    .query("SELECT * FROM videos WHERE id = $1", [videoId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

//DELETE "/{id}"

app.delete("/:id", (req, res) => {
  const videoId = req.params.id;
  const query = "DELETE FROM videos WHERE id = $1";

  pool
    .query(query, [videoId])
    .then(() => res.send("Video deleted"))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
