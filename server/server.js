require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_URL,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

app.get("/", async function (req, res) {
  const searchQuery = req.query.title;
  const orderQuery = req.query.order;
  let query = "SELECT * FROM videos";
  if (searchQuery) {
    query = `SELECT * FROM videos WHERE lower(title) LIKE '%${searchQuery}%'`;
  }
  if (orderQuery === "asc") {
    query += " ORDER BY title";
  } else if (orderQuery === "desc") {
    query += " ORDER BY title DESC";
  } else if (orderQuery === "asc_rating") {
    query += " ORDER BY rating";
  } else if (orderQuery === "desc_rating") {
    query += " ORDER BY rating DESC";
  }
  const client = await pool.connect();
  client.query(query, (error, result) => {
    res.json(result.rows);
  });
  client.release();
});

app.post("/", async function (req, res) {
  const newTitle = req.body.title;
  const newURL = req.body.url;
  if (newTitle && newURL) {
    const client = await pool.connect();
    await client.query("INSERT INTO videos (title, link) VALUES ($1, $2)", [
      newTitle,
      newURL,
    ]);
    const createdVideo = await client.query(
      "SELECT id FROM videos WHERE title = $1 AND link = $2",
      [newTitle, newURL]
    );
    if (createdVideo.rows.length > 0) {
      res.json({ id: createdVideo.rows[0].id });
    } else {
      res.status(400).json({
        result: "failure",
        message: "Video could not be saved",
      });
    }
    client.release();
  } else {
    res.status(400).send("missing required fields");
  }
});

app.get("/:id", async function (req, res) {
  const id = req.params.id;

  const client = await pool.connect();
  client
    .query("SELECT * FROM videos WHERE id=$1", [id])
    .then((result) => {
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404).json({ error: "video not found" });
      }
    })
    .catch((e) => console.error(e));
  client.release();
});

app.put("/:id", async function (req, res) {
  const id = req.params.id;
  const newRating = req.body.rating;

  if (Number.isInteger(newRating)) {
    const client = await pool.connect();
    client
      .query("UPDATE videos SET rating=$1 where id=$2", [newRating, id])
      .then(() => res.json({ rating: newRating }))
      .catch((e) =>
        res.status(400).json({
          result: "failure",
          message: "rating could not be updated",
        })
      );
    client.release();
  } else {
    res.status(400).json({
      result: "invalid input",
      message: "rating was not provided",
    });
  }
});

app.delete("/:id", async function (req, res) {
  const id = req.params.id;

  const client = await pool.connect();
  client
    .query("DELETE FROM videos WHERE id=$1", [id])
    .then(() => res.json({}))
    .catch((e) =>
      res.json({
        result: "failure",
        message: "Video could not be deleted",
      })
    );
  client.release();
});

const PORT = process.env.port || 5000;

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});
