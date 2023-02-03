const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
// const pool = require("./database");

app.use(cors());
app.use(express.json());
app.listen(port, () => console.log(`Listening on port ${port}`));

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://dewayne:QWLHeEPQ2fCSL58qpqVL6o2JmV8ROx2Z@dpg-cfdos482i3mmlo3gli7g-a.frankfurt-postgres.render.com/videos_nwpu',
  ssl: { rejectUnauthorized: false },
  user: 'dewayne',
  host: 'postgres://dewayne:QWLHeEPQ2fCSL58qpqVL6o2JmV8ROx2Z@dpg-cfdos482i3mmlo3gli7g-a.frankfurt-postgres.render.com/videos_nwpu',
  database: 'videos_nwpu',
  password: 'QWLHeEPQ2fCSL58qpqVL6o2JmV8ROx2Z',
  port: 5432
});

app.get("/video", function(req, res) {
    pool.query('SELECT * FROM videos')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});




/* 
let maxID = Math.max(...videos.map((video) => video.id));

app.get("/video", (req, res) => {
  const order = req.query.order;
  let sortedVideos;
  if (order === "asc") {
    sortedVideos = videos.sort((a, b) => a.rating - b.rating);
  } else if (order === "desc") {
    sortedVideos = videos.sort((a, b) => b.rating - a.rating);
  } else {
    sortedVideos = videos.sort((a, b) => b.rating - a.rating);
  }
  res.json(sortedVideos);
});


app.get("/video/:id", (req, res) => {
  const vidId = parseInt(req.params.id);

  const video = videos.find((v) => v.id === vidId);
  if (!video) {
    res.status(404).send("Not Found");
  }
  res.send(video);
});

//POST "/videos"

app.post("/video", (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ result: "error", message: "Missing Title" });
      } else if (!req.body.url) {
        res.status(400).send({ result: "error", message: "Missing URL" });
    return;
  }
 
  const newVideo = {
    id: ++maxID,
    title: req.body.title,
    url: req.body.url,
    rating: req.body.rating,
    };
  videos.push(newVideo);
  res.status(201).send({ id: newVideo.id, message: "data found" });
});

app.delete("/video/:id", (req, res) => {
  const vidId = parseInt(req.params.id);
  const vidIndex = videos.findIndex((v) => v.id === vidId);
  if (vidIndex < 0) {
    res.status(404).send("Video not found");
  }
  videos.splice(vidIndex, 1);
  res.send({ id: vidId, message: "Video deleted" });
});

 */