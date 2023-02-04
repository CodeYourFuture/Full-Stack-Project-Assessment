const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;
//const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.json());

const { Pool } = require("pg");

app.use(express.static(path.resolve(__dirname, "../client/build")));
// const cors = require("cors");
// app.use(cors);

//DATABASE connection
// const isProduction = process.env.NODE_ENV === "production";
// const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 6000,
  ssl: {
    rejectUnauthorized: false,
  },
});

//let videos = JSON.parse(fs.readFileSync("videos.json", "utf-8"));
// let videos = require("./videos.json");

// const save = () => {
//   fs.writeFileSync("videos.json", JSON.stringify(videos, null, 2));
// };

function matchYoutubeUrl(url) {
  var p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return url.match(p)[1];
  }
  return false;
}

// GET "/"

app.get("/", (req, res) => {
  res.send("Server is listening");
  //res.json(videos);
});

app.get("/videos", async (req, res) => {
  const query = "select * from videos";
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/videos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }
  //const findVideo = videos.find((a) => a.id === id);

  // if (!findVideo) {
  //   res.sendStatus(404);
  //   return;
  // }
  // res.send(findVideo);
  const query = `select * from videos where id = ${id}`;
  try {
    const result = await pool.query(query);
    if (!result.rowCount) {
      res.sendStatus(404);
      return;
    }
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST

app.post("/videos", (req, res) => {
  const compulsoryFields = ["title", "url", "rating"];
  if (!compulsoryFields.every((cf) => req.body.hasOwnProperty(cf))) {
    res.status(401).send("not all compulsory fields supplied");
  }

  // let newVideo = {
  //   id: req.body.id,
  //   title: req.body.title,
  //   url: req.body.url,
  //   rating: req.body.rating,
  // };
  let title = req.body.title;
  let url = req.body.url;
  let rating = req.body.rating;

  if (!req.body.title) {
    res.status(400).send("Please enter a valid title");
    return;
  }

  if (matchYoutubeUrl(req.body.url) === false) {
    res.status(400).send("Please enter a full valid YouTube url");
    return;
  }

  if (isNaN(req.body.rating) || !req.body.rating) {
    res.status(400).send("Please enter a valid number as rating");
    return;
  }

  const insertQuery =
    "INSERT INTO videos(title, url, rating) VALUES($1, $2, $3)";
  // you can use async try catch or below code
  pool
    .query(insertQuery, [title, url, rating])
    .then(() => {
      res.status(201).json({
        message: "Your video is successfully uploaded",
      });
    })
    .catch((error) => console.error(error));
});

// Delete

app.delete("/videos/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  if (isNaN(videoId)) {
    res.sendStatus(400);
    return;
  }

  const deleteQuery = `DELETE FROM videos WHERE id=$1`;
  const findVideo = `SELECT * FROM videos WHERE id=$1`;
  pool.query(findVideo, [videoId]).then((result) => {
    if (!result.rowCount) {
      res.sendStatus(404);
      return;
    }
    pool
      .query(deleteQuery, [videoId])
      .then((result) => {
        console.log(result);
        res.json({ message: `Video by ID ${videoId} has been deleted` });
      })
      .catch((error) => console.error(error));
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
