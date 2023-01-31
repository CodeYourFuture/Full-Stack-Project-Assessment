const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = `postgresql://${process.env.user}:${process.env.PASSWORD}@${process.env.host}:${process.env.port}/${process.env.database}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  connectionTimeoutMillis: 6000,
  ssl: {
    rejectUnauthorized: false,
  }
});

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

/////

app.get("/", (req, res) => {
  res.send("Hello");
});

// Get all video
app.get("/videos", function (req, res) {
  pool
    .query("SELECT * FROM videos")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// Search a video
app.get("/videos", function (req, res) {
  const videoTitleQuery = req.query.title;
  let query = `SELECT * FROM videos`;
  let params = [];
  if (videoTitleQuery) {
    query = `SELECT * FROM videos WHERE title LIKE $1`;
    params.push(`%${videoTitleQuery}%`);
  }

  pool
    .query(query, params)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// Add a new video
// const videoId = Date.now();

function validateYouTubeUrl(url) {
  let regExp =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  return url.match(regExp);
}

app.post("/videos", function (req, res) {
  // const newVideoId = videoId
  const newtTitle = req.body.title;
  const newUrl = req.body.url;
  const newRating = 0;

  const query = "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)";

  if (!req.body.title || !validateYouTubeUrl(req.body.url)) {
    res
      .status(400)
      .json({ msg: "Please make sure to include  title and valid url" });
    return;
  }

  pool
    .query(query, [newtTitle, newUrl, newRating])
    .then(() => res.send("Video added!"))
    .catch((error) => {
      console.error(error);
    });
});

// Delete video
app.delete("/videos/:videosId", function (req, res) {
  const videosId = req.params.videosId;

  pool
    .query("DELETE FROM videos WHERE id=$1", [videosId])
    .then(() => res.send(`Customer ${videosId} deleted!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
//////

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];
// const videos = require("./exampleresponse.json");
// // const { response } = require("express");

// const videoId = Date.now();
// // let rating = Math.floor(Math.random() * 10000);

// // GET "/"
// // app.get("/", (req, res) => {
// //   // Delete this line after you've confirmed your server is running
// //   res.send({ express: "Your Backend Service is Running" });
// // });
// // Get//
// app.get("/videos", (req, res) => {
//   res.json(videos);
// });

// // SEARCH //
// app.get("/videos/search", (req, res) => {
//   const videoSearch = req.query.term;
//   const videoResult = videos.filter((video) =>
//     video.title.toLowerCase().includes(videoSearch.toLowerCase())
//   );
//   if (!videoResult.length) {
//     res.status(404).json({ msg: "Video not found!" });
//     return;
//   }
//   res.send(videoResult);
// });

// get all sorted videos
// app.get("/videos", (req, res) => {
//   if (req.query.order === "asc") {
//     videos.sort((a, b) => a.rating - b.rating);
//   } else {
//     videos.sort((a, b) => b.rating - a.rating);
//   }
//   res.send(videos);
// });

// function validateYouTubeUrl(url) {
//   let regExp =
//     /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

//   return url.match(regExp);
// }
// // POST //
// app.post("/videos", (req, res) => {
//   if (!req.body.title || !validateYouTubeUrl(req.body.url)) {
//     res.status(400).json({ msg: "Please make sure to include  title and valid url" });
//     return;
//   }

//   const newVideos = {
//     id: videoId,
//     timeAdded: new Date().toLocaleDateString(),
//     title: req.body.title,
//     url: req.body.url,
//     rating: 0
//   };
//   videos.push(newVideos);
//   res.json(videos);
// });

// app.get("/videos/:id", (req, res) => {
//   let foundVideo = videos.find((video) => video.id == req.params.id);
//   res.send(foundVideo);
// });

// // DELETE //
// app.delete("/videos/:id", (req, res) => {
//   const deleteVideoId = parseInt(req.params.id);
//   const foundVideoIndex = videos.findIndex(
//     (video) => video.id === deleteVideoId
//   );
//   if (foundVideoIndex < 0) {
//     res.sendStatus(404);
//     return;
//   }
//   videos.splice(foundVideoIndex, 1);
//   res.send(`video with the id ${deleteVideoId} Has been deleted`);
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
