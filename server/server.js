const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "project_assessment",
  password: "Kdagaal123",
  port: 5432,
});

const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  pool
    .query("SELECT * FROM videos")
    .then((data) => res.status(200).json(data.rows));
});

app.post("/addVideo", (req, res) => {
  // Delete this line after you've confirmed your server is running
  const id = +req.body.id;
  const title = req.body.title;
  const url = req.body.url;
  const rating = +req.body.rating;

  console.log({ id, title, url, rating });
  pool
    .query(
      `INSERT INTO videos (v_id, title, url, rating)
                  VALUES ('${id}','${title}','${url}','${rating}')
    `
    )
    .then((data) => res.status(200).json(data.rows));
});

//

app.get("/:id", (req, res) => {
  const videoId = +req.params.id;
});

app.delete("/delete/:id", (req, res) => {
  const videoId = +req.params.id;
  console.log(videoId);

  pool
    .query("delete from videos where v_id=$1", [videoId])
    .then((video) => res.status(200).send(video.rows))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });

  // const videoIndex = videos.findIndex((video) => +video.id === videoId);
  // // if the parameter is not exist in the array it shows -1, then i used the following condition
  // if (videoIndex !== -1) {
  //   videos.splice(videoIndex, 1);
  //   res.status(200).send(videos);
  // } else {
  //   res.status(500).send({
  //     result: "failure",
  //     message: "Video could not be deleted",
  //   });
  // }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
