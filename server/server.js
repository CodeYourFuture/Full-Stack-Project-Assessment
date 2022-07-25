const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;
const bodyparser = require("body-parser");
const { Client } = require("pg");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

app.get("/", (req, res) => {
  client
    .query("SELECT * FROM videos")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.post("/", function (req, res) {
  const newTitle = req.body.title;
  const newUrl = req.body.url;
  const newRating = req.body.rating;

  if (
    newTitle === undefined ||
    newTitle === 0 ||
    newUrl === undefined ||
    newUrl === 0 ||
    newRating === undefined ||
    newRating === 0
  ) {
    return res
      .status(400)
      .send("check that you have filled the form correctly");
  }

  client
    .query("INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)", [
      newTitle,
      newUrl,
      newRating,
    ])
    .then(() => res.send("new video created!"))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/id", function (req, res) {
  const id = req.params.id;

  client
    .query("SELECT * FROM videos WHERE id=$1", [id])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.delete("/:id", function (req, res) {
  const id = req.params.id;

  client
    .query("DELETE FROM videos WHERE id=$1", [id])
    .then(() => res.send(`video ${id} deleted!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
