require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
//const videos = require("./exampleresponse.json");

const port = process.env.PORT || 5000;

const bodyparser = require("body-parser");

//when you write post endpoints don't forget body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
const { Pool, Client } = require("pg");

app.listen(port, () => console.log(`Listening on port ${port}`));

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

app.get("/", function (req, res) {
  client
    .query("SELECT * FROM videos ORDER BY title")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

//adds a video
app.post("/", function (req, res) {
  const addTitle = req.body.title;
  const addUrl = req.body.url;
  const addRating = req.body.rating;
  const lookUpString = "https://www.youtube.com/watch?";

  const client = "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)";

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

  client
    .query(query, [addTitle, addUrl, addRating])
    .then(() => res.send("Video created!"))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });

  // const { title, url, rating } = req.body;

  // if (
  //   title === undefined ||
  //   title === 0 ||
  //   url === undefined ||
  //   url === 0 ||
  //   rating === undefined ||
  //   rating === 0
  // ) {
  //   return res
  //     .status(400)
  //     .send("check that you have filled the form correctly");
  // } else {
  //   const newVideoPosted = {
  //     id: videos.length,
  //     title,
  //     url,
  //     rating,
  //   };
  //   videos.push(newVideoPosted);
  //   console.log(videos);
  //   res.send("video added");
  // }
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
  client
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
  client
    .query("DELETE FROM videos WHERE id=$1", [videoId])
    .then(() => client.query("DELETE FROM videos WHERE id=$1", [videoId]))
    .then(() => res.send(`Customer ${videoId} deleted!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
