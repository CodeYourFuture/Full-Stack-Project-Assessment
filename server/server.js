const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");

const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// const pool = new Pool({
//   user: "timea",
//   host: "localhost",
//   database: "videos",
//   password: "password",
//   port: 5432,
// });
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  pool
    .query("SELECT * FROM videos")
    .then((result) => res.send(result.rows))
    .catch((err) => console.error(err));
});
app.get("/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query("SELECT * FROM videos WHERE videos.id=$1", [id])
    .then((result) => {
      if (result.rows.length > 0) {
        pool
          .query("SELECT * FROM videos WHERE videos.id=$1", [id])
          .then((result) => res.send(result))
          .catch((err) => console.error(err));
      } else {
        res.send("No video with this id.");
      }
    })
    .catch((err) => console.error(err));
});
app.get("/", (req, res) => {
  const order = req.query.order;
  if (order === "asc") {
    pool
      .query("SELECT * FROM videos ORDER BY rating ASC")
      .then((result) => res.send(result))
      .catch((err) => console.error(err));
  }
  if (order === "desc") {
    pool
      .query("SELECT * FROM videos ORDER BY rating DESC")
      .then((result) => res.send(result))
      .catch((err) => console.error(err));
  }
});

app.post("/", (req, res) => {
  const { title, url } = req.body;
  pool
    .query("INSERT INTO videos (title, url) VALUES ($1, $2)", [title, url])
    .then(() =>
      pool
        .query("SELECT * FROM videos")
        .then((result) => res.send(result))
        .catch((err) => console.error(err))
    )
    .catch((err) => console.error(err));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
