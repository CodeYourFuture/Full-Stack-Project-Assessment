const express = require("express");
const helmet = require("helmet");
const path = require("path");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const { Pool } = require("pg");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}


const dbConfig1 = {
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(dbConfig1);


// GET all videos
app.get("/", (req, res) => {
  const allVideosQuery = "SELECT * FROM videos";
  pool
    .query(allVideosQuery)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// POST(add) a video
app.post("/", (req, res) => {
  const title = req.body.title;
  const url = req.body.url;
  const rating = req.body.rating;
  const votes = req.body.votes;

  const addVideoQuery = `INSERT INTO videos (title,url,rating,votes) VALUES ($1,$2,$3,$4)`;
  const duplicateUrlQuery = `SELECT url FROM videos WHERE url=$1`;

  pool.query(duplicateUrlQuery, [url]).then((result) => {
    if (result.rows.length > 0) {
      res.status(400).json({ message: "video already in database" });
    } else {
      pool
        .query(addVideoQuery, [title, url, rating, votes])
        .then(() => res.json({ message: "video added" }))
        .catch((error) => res.status(500).json(error));
    }
  });
});

// DELETE video by id
app.delete("/:id", (req, res) => {
  const id = req.params.id;

  const delVidQuery = `DELETE FROM videos WHERE id=$1`;
  pool
    .query(delVidQuery, [id])
    .then(() => res.json({ message: `video ${id} deleted` }))
    .catch((error) => res.status(500).json(error));
});




app.listen(port, () => console.log(`Listening on port ${port}`));
