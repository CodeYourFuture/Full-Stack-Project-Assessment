const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
// const { query } = require("express");
const app = express();
const port = process.env.PORT || 5000;
const data = require("../exampleresponse.json");

const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_videos",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.get("/", function (req, res) {
  pool
    .query("SELECT * FROM videos")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

let videos = [...data];

app.post("/", function (req, res) {
  const newVideoTitle = req.body.title;
  const newUrl = req.body.url;
  const newRating = Number(req.body.rating);
  const newId = uuidv4();
  const query =
    "INSERT INTO videos (id, title, url, rating) VALUES ($1, $2, $3, $4)";

  pool
    .query(query, [newId, newVideoTitle, newUrl, newRating])
    .then(() => res.send("Video added"))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// app.post("/", function (req, res) {
//   const { title, url, rating } = req.body;

//   const newVideo = {
//     id: uuid(),
//     title,
//     url,
//     rating: rating ? rating : 0,
//   };

//   if (!newVideo.title || !newVideo.url) {
//     return res.status(400).json({
//       result: "failure",
//       message: "Video could not be saved",
//     });
//   } else {
//     videos.push(newVideo);
//     //use pool to write a query that will insert a row into a table videos

//     res.status(200).json({ message: `Added video id: ${id}` });
//   }
// });

// app.post("/", function (req, res) {
//   const newVideoTitle = req.body.title;
//   const newUrl = req.body.url;

//   const query = "INSERT INTO videos (title, url) VALUES ($1, $2)";

//   pool
//     .query(query, [newVideoTitle, newUrl])
//     .then(() => res.send("Video added"))
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json(error);
//     });
// });

// // ADD a video
// app.post("/api", (req, res) => {
//   let videoTitle = req.body.title;
//   let videoURL = req.body.url;
//   // let videoDate = req.body.date;
//   let videoRating = Math.floor(Math.random() * 10000);
//   // let videoId = Math.floor(Math.random() * 10000);
//   console.log(req.body);
//   const isUrlValid = videoURL.match(
//     /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
//   );

//   if (!videoTitle || !videoURL || !isUrlValid) {
//     return res
//       .status(400)
//       .send({ msg: "Add a Title & URL " });
//   }

//   pool
//     .query("SELECT * FROM videos WHERE title = $1", [videoTitle])
//     .then((result) => {
//       if (result.rows.length) {
//         return res
//           .status(400)
//           .send({ msg: `A video with title:${videoTitle} already exists` });
//       } else {
//         pool
//           .query(
//             `INSERT INTO videos (title, url, rating) VALUES($1, $2, $3) RETURNING *`,
//             [videoTitle, videoURL, videoRating]
//           )
//           .then((result) => {
//             console.log(result.rows[0]);
//             // console.log(videoTitle);
//             res.json(result.rows[0]);
//           })
//           .catch((error) => {
//             console.log(error);
//             res.status(500).json(error);
//           });
//       }
//     });
// });

// app.get("/search", (req, res) => {
//   const searchTerm = req.query.term;
//   // use pool to write a query using WHERE clause to search for search term then return the results to the client
//   const filteredData = videos.filter((video) => {
//     video.title.toLowerCase().includes(searchTerm.toLowerCase());

//     if (filteredData.length === 0) {
//       res
//         .status(400)
//         .json({ message: `No videos including ${searchTerm} found` });
//     }

//     return res.json(filteredData);
//   });
// });

// app.get("/:id", function (req, res) {
//   let id = parseInt(req.params.id);
//   //use pool to write a query to filter videos by id, using WHERE clause
//   // let foundVideo = videos.filter((i) => i.id == id); //rephrase
//   //write it as then promise
//   if (foundVideo) {
//     res.status(200).json(foundVideo);
//   } else {
//     res.status(400).send({ message: `No video with id: ${id} found` });
//   }
// });

// app.delete("/:id", function (req, res) {
//   let id = parseInt(req.params.id);
//   // let foundVideo = videos.filter((i) => i.id == id); //rephrase
//   //write a query that given the id deletes the video with that id
//   if (foundVideo) {
//     return res.status(200).json({});
//   } else {
//     return res.status(400).json({
//       result: "failure",
//       message: `Video ${id} could not be deleted`,
//     });
//   }
// });

// // DELETE a Video with ID
// app.delete("/api/:id", (req, res) => {
//   const videoId = parseInt(req.params.id);
//   pool.query("SELECT * FROM videos WHERE id = $1", [videoId]).then((result) => {
//     if (result.rows.length === 0) {
//       return res
//         .status(400)
//         .send({ msg: `Video:${videoId} does not exist` })
//         .catch((error) => {
//           console.log(error);
//           res.status(500).json(error);
//         });
//     } else {
//       return pool
//         .query("DELETE FROM videos WHERE id = $1", [videoId])
//         .then(() => res.send({ msg: `Video:${videoId} Deleted!` }))
//         .catch((error) => {
//           console.log(error);
//           res.status(500).json(error);
//         });
//     }
//   });
// });
//write post request to back end to add video to the list
//change it to work for database as in the examples above

app.listen(port, () => console.log(`Listening on port ${port}`));
