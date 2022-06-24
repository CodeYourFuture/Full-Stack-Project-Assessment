const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  user: "craig",
  database: "cyf_videos",
  host: "localhost",
  password: "2509",
  port: 5432,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Gets all the videos
app.get("/", (req, res) => {
  const order = req.query.order;

  pool
    .query(`SELECT * FROM videos ORDER BY rating ${order.toUpperCase()}`)
    .then((data) => res.send(data.rows))
    .catch((e) => console.log(e));
});

// Posts a video from the client
app.post("/", (req, res) => {
  const { title, url } = req.body;
  const date = new Date();

  if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }

  pool
    .query(
      "INSERT INTO videos (title, url, rating, posted) VALUES ($1, $2, $3, $4)",
      [title, url, 0, date]
    )
    .then(() => res.json("Successful"))
    .catch((e) => console.log(e));
});

// Gets info about an individual video
app.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  pool
    .query("SELECT * FROM videos WHERE id = $1", [id])
    .then((data) => res.send(data.rows[0]))
    .catch((e) => console.log(e));
});

// Deletes a video
app.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  pool
    .query("SELECT * FROM videos WHERE id = $1", [id])
    .then((data) => {
      if (data.rows.length < 0) {
        res.status(400).json({
          result: "failure",
          message: "Video could not be deleted",
        });
      } else {
        pool
          .query("DELETE FROM videos WHERE id = $1", [id])
          .then(() => res.json({}))
          .catch((e) => console.log(e));
      }
    })
    .catch((e) => console.log(e));
});

// Manipulates the video rating
app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { vote } = req.query;

  pool.query(
    `UPDATE videos SET rating = (SELECT rating FROM videos WHERE id  = $1) ${
      vote === "up" ? "+ 1" : "- 1"
    } WHERE id = $1`,
    [id]
  );

  res.send({});
});
