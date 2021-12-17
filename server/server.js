const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const videos = require("../exampleresponse.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const { Pool } = require("pg");
const pool = new Pool({
  user: "ynehfehljaszas",
  connectionString:
    "postgres://ynehfehljaszas:3d0363831d348ea599ceea15b97afcb4019b745bb2ef9164a8a388fe646ee42d@ec2-52-30-133-191.eu-west-1.compute.amazonaws.com:5432/d4u6hoaud3j05c",
  ssl: { rejectUnauthorized: false },
  host: "ec2-52-30-133-191.eu-west-1.compute.amazonaws.com",
  database: "d4u6hoaud3j05c",
  password: "",
  port: 5432,
});

// GET "/" all videos
app.get("/", (req, res) => {
  pool.query("SELECT * FROM videos", (db_err, db_res) => {
    if (!db_err) {
      res.status(200).json(db_res.rows);
    } else {
      res.status(500).send(db_err);
    }
  });
});

//Get video by ID
app.get("/:videoId", (req, res) => {
  const videoId = req.params.videoId;
  pool
    .query("SELECT * FROM videos WHERE id=$1", [videoId])
    .then((db_res) => {
      if (db_res.rowCount > 0) res.status(200).json(db_res.rows);
      else
        res.status(404).json({
          result: "failure",
          message: "Video could not be found",
        });
    })
    .catch((db_err) => res.status(500).send("server error"));
});

//Add New Video

app.post("/", (req, res) => {
  const newTitle = req.body.title;
  const newUrl = req.body.url;
  const newRating = req.body.rating;

  pool.query("SELECT * FROM videos WHERE url=$1", [newUrl]).then((db_res) => {
    if (db_res.rows.length > 0) {
      return res.status(400).send("This url already exists!");
    } else {
      pool
        .query("INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)", [
          newTitle,
          newUrl,
          newRating,
        ])
        .then((db_res) => res.status(204).send("New video created"))
        .catch((db_err) => res.status(500).send("Server Error"));
    }
  });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;

  pool.query("SELECT * FROM videos WHERE id=$1", [id], (db_err, db_res) => {
    if (db_res.rows.length > 0) {
      pool.query("DELETE FROM videos WHERE id=$1", [id], (db_err, db_res) => {
        if (db_err) {
          res.status(500).send(JSON.stringify(db_err.message));
        } else {
          res.json(db_res.rows);
        }
      });
    } else {
      res.status(400).send("Unable to locate the video with the id provided");
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
