const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
//connecting to render server
const pool = new Pool({
  user:process.env.PG_USER,
  host:process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: 5432,
});

const port = process.env.PORT || 5001;
const videosjson = require("./exampleresponse.json");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));//to connect our client with server 

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = videosjson;

const REGEXP =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtube\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

const isValidYoutubeUrl = (link) => {
  return link.trim().match(REGEXP) !== null;
};

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});
app.get("/videos", (req, res) => {
  let sortBy = req.query.order || "ASC";
  const query = "SELECT * FROM videos Order By rating " + sortBy;
  pool
    .query(query)
    .then((result) => res.status(200).json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/videos/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let filterVideo = videos.filter((video) => video.id === id);

  if (filterVideo.length === 0) {
    return res.status(404).json("Video not found");
  }
  res.send(filterVideo);
});

// Add a new video
app.post("/videos", (req, res) => {
  let title = req.body.title;
  let videourl = req.body.videourl;
  let rating = 0;

  const query =
    "INSERT INTO videos (title, videourl, rating) VALUES ($1, $2, $3)";

  // validation
  if (!title && !videourl) {
    return res.status(400).json("Please include a title and url");
  } else if (!isValidYoutubeUrl(videourl)) {
    return res.status(400).json("Please include a valid YouTube url");
  } else {
    pool
      .query(query, [title, videourl, rating])
      .then(() => res.status(200).json("Video created!"))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
});
//update rating
app.put("/videos/vote/:id", function (req, res) {
  let id = req.params.id;
  let rating = req.body.rating;
  if (rating < 0) {
    rating = 0;
  }
  pool
    .query("UPDATE videos SET rating=$1 WHERE id=$2", [rating, id])
    .then(() => res.status(200).json(`Videos ${id} rating updated!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
//Delete video
app.delete("/videos/:id", function (req, res) {
  let id = parseInt(req.params.id); // int = integer
  pool
    .query("DELETE FROM videos WHERE id=$1", [id])
    .then(() => res.status(200).json(`video ${id} deleted!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
