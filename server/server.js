require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const port = process.env.PORT || 5000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

app.get("/", function (req, res) {
  pool
    .query("SELECT * FROM videos ORDER BY title")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

//adds a video
app.post("//", function (req, res) {
  const addTitle = req.body.title;
  const addUrl = req.body.url;
  const addRating = req.body.rating;
  const lookUpString = "https://www.youtube.com/watch?";

  const pool = "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)";
  console.log(client);

  if (
    (!addUrl.includes(lookUpString) && addTitle === undefined) ||
    addTitle === 0 ||
    addUrl === undefined ||
    addUrl === 0 ||
    addRating === undefined ||
    addRating === 0
  ) {
    return res.status(400).send("please fill in correct url");
  }

  pool
    .query(query, [addTitle, addUrl, addRating])
    .then(() => res.send("Video created!"))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

//gets id of each video
app.get("/:id", function (req, res) {
  const eachVideoId = req.params.eachVideoId;
  // const result = videos.find((video) => video.id === id);
  // if (result) {
  //   res.send(result);
  // } else {
  //   res.status(404).send(`id ${id} not found`);
  // }
  pool
    .query("SELECT * FROM videos WHERE id=$1", [eachVideoId])
    .then((result) => res.json(result))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

//deletes a video
app.delete("/:id", function (req, res) {
  const videoId = req.params.videoId;
  // const removeVideo = videos.findIndex((index) => index.id === id);
  pool
    .query("DELETE FROM videos WHERE id=$1", [videoId])
    .then(() => res.send(`Video ${videoId} deleted!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
