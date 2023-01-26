const express = require("express");
let cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const { Pool } = require("pg");

const pool = new Pool({
  user: "test_user",
  host: "dpg-cf84nkun6mplr412k9q0-a.oregon-postgres.render.com",
  database: "finalprojectassessmentvideo",
  password: "TbQmOV6PMJIvufL43RpIjz5ad4ZHHrlK",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

//middleware
app.use(cors());
app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./../client/src/exampleresponse.json");

function createTable() {
  let query =
    "CREATE TABLE videos( id SERIAL PRIMARY KEY,title  VARCHAR(60) NOT NULL, url VARCHAR(90) NOT NULL, rating INT)";
  return query;
}

app.post("/videos", function (req, res) {
  pool
    .query(
      "INSERT INTO videos (id, title, url, rating) VALUES (523523, Never Gonna Give You Up, https://www.youtube.com/watch?v=dQw4w9WgXcQ, 23)"
    )
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.post("/videosdata", function (req, res) {
  let query = "";
  videos.forEach((item) => {
    const newVideoId = item.id;
    const newVideoTitle = item.title;
    const newVideoUrl = item.url;
    const newVideoRating = item.rating;
    query += `INSERT INTO videos (id, title, url, rating) VALUES (${newVideoId}, ${newVideoTitle}, ${newVideoUrl},  ${newVideoRating}) `;
  });
  pool
    .query(query)
    .then(() => res.send("Videos created!"))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

//uncertain which of my tries caused adding data to database to work, as I tested several different answers until refreshed dbeaver and saw data added and possibly that was why post command failing

//get all example videos
// GET "/"
// app.get("/", (req, res) => {
//   res.send(videos);
//   console.log("Sending videos to client", videos);
//   //res.send({ express: "Your Backend Service is Running" });
// });

app.get("/", function (req, res) {
  pool
    .query("SELECT * FROM videos")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

//GET "/{id}"
app.get("/:id", function (req, res) {
  const vidId = req.params.id;
  pool
    .query("SELECT * FROM videos WHERE id = $1", [vidId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

//post new video

app.post("/", function (req, res) {
  const newVideoTitle = req.body.title;
  const newVideoUrl = req.body.url;
 
  pool
    .query("SELECT * FROM videos WHERE name=$1", [newVideoTitle])
    .then((result) => {
      if (result.rows.length > 0) {
        return res.status(400);
        res.status(400).json({
          result: "failure",
          message: "Video could not be saved",
        });
      } else {
        const query = "INSERT INTO videos (title, url) VALUES ($1, $2)";
        pool
          .query(query, [newVideoTitle, newVideoUrl])
          .then(() =>
            res.status(200).json({
              id: newVideo.id,
            })
          )
          .catch((error) => {
            console.error(error);
            res.status(500).json(error);
          });
      }
    });
});

// {
//   "id": 523523
// }

//DELETE "/{id}"

app.delete("/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let result = videos.filter((el) => el.id !== id);
  videos = result;
  if (result) {
    console.log(result);
    res.send(result);
  } else {
    res.status(404).send("Incorrect ID, please enter again");
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
