const express = require("express");
const { Pool } = require("pg");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

const db = new Pool({
  user: process.env.db_user,
  host: process.env.db_host,
  database: process.env.db_database,
  password: process.env.db_password,
  port: 5432,
  ssl: true,
});

app.get("/", function (req, res) {
  db.query("SELECT * FROM videos")
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

// GET "/"
// app.get("/", (req, res) => {
//   res.json(videos);
// });

app.post("/", (req, res) => {
  const newTitle = req.body.title;
  const newUrl = req.body.url;
  const query = `INSERT INTO videos (title, url) VALUES ($1, $2)`;
  db.query(query, [newTitle, newUrl])
    .then(() => {
      res.status(201).send();
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .send({ result: "failure", message: "Video could not be saved" });
    });
});

//     const newVideo = { ...req.body, id: videos.length + 1, rating: 0 };
//     videos.push(newVideo);
//     res.status(201).send({ id: newVideo.id });
//   } else {
//     res
//       .status(400)
//       .send({ result: "failure", message: "Video could not be saved" });
//   }
// });

app.get("/:id", (req, res) => {
  const video = videos.find((video) => video.id === Number(req.params.id));
  res.status(200).send({ video });
});

app.delete("/:id", (req, res) => {
  const video = videos.find((video) => video.id === Number(req.params.id));
  const videoIndex = videos.indexOf(video);
  if (video === undefined) {
    res.status(400).send({
      result: "failure",
      message: "Video could not be deleted",
    });
  } else {
    videos = videos
      .slice(0, videoIndex)
      .concat(videos.slice(videoIndex + 1, -1));
    res.status(200).send({});
  }
});
