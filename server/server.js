const { urlencoded } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { Pool } = require('pg');
require("dotenv").config();


const pool = new Pool({
  user: process.env.user,
 connectionString: process.env.connection,
  ssl:true
});


const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
// Adding some middleware,You DO NOT NEED express.json() and express.urlencoded() for GET Requests or DELETE Requests.
// You NEED express.json() and express.urlencoded() for POST and PUT requests, because in both these requests you are sending data 
// (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body.
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json());
app.use(urlencoded({ extended: true }));


app.listen(port, () => console.log(`Listening on port ${port}`));


// GET "/"
app.get("/", (req, res) => {
  res.send(`API server loading .....`);
});

app.get("/videos", (req, res) => {
  const order = req.query.order || "DESC";
  
  pool.query('SELECT * FROM videos ORDER BY video_rating')
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});



app.post("/addVideo", (req, res) => {
  // Both fields - title and url - must be included and be valid for this to succeed.
  let maxId = Math.max(...videos.map(video => video.id));
  let newRate = Math.floor(Math.random() * 9000);
  let date = new Date().toJSON();

  if (req.body.title && req.body.url) {
    let newVideo = {
      id: ++maxId,
      video_title: req.body.title,
      video_url: req.body.url,
      video_rating: newRate,
      submissionDate: date,
    };
    const query =
      "INSERT INTO videos (id, video_title, video_url, video_rating, submissionDate) VALUES ($1, $2, $3, $4, $5)";

    pool.query(query, [
      newVideo.id,
      newVideo.video_title,
      newVideo.video_url,
      newVideo.video_rating,
      newVideo.submissionDate,
    ]);
    res.json({ success: "New video added" }).send(newVideo);
  } else {
    res
      .status(400)
      .send({ result: "failure", message: "Video could not be saved URL or Title is missing" });
  }
});

app.get("/videos/:videoId", function (req, res) {
  const videoId = req.params.videoId;

  pool
    .query("SELECT * FROM videos WHERE id=$1", [videoId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// updating a video url
app.put("/videos/:videoId", function (req, res) {
  const videoId = req.params.videoId;
  const newVideoUrl = req.body.newVideoUrl;

  pool
    .query("UPDATE videos SET email=$1 WHERE id=$2", [newVideoUrl, videoId])
    .then(() => res.send(`video ${videoId} updated!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.delete("/videos/:videoId",(req, res)=>{
  let videoId = parseInt(req.params.videoId);

  pool
    .query("DELETE FROM videos WHERE id=$1", [videoId])
    .then(() => res.send(`video ${videoId} deleted successfully!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
// app.delete("/videos/:id", (req, res) => {
//   const targetedId = req.params.id;
//   const targetedVideoIndex = videos.findIndex((video) => video.id === targetedId);

//   if (targetedVideoIndex >= 0) {
//     videos.splice(targetedVideoIndex, 1);
//     res.status(200).json(videos);
//   } else {
//     res.status(400).send({
//       "result": "failure",
//       "message": "Video could not be deleted"
//     });
//   };
// });