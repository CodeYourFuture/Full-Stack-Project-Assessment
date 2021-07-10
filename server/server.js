const express = require("express");
const cors = require("cors");
const { Pool } = require('pg');
const uuid = require("uuid");
const app = express();

const port = process.env.PORT || 5000;

//this is for prod add for local
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// GET "/"
app.get("/", (req, res) => {
  console.log(process.env.port);
  pool.query('select * from videos;', (error, result) => {
    console.log(result)
    res.json(result.rows);
  })
});

app.post("/", (req, res) => {
  let newVid = {
    id: uuid.v4(),
    title: req.body.title,
    url: req.body.url,
    rating: 0
  }

  const foundVideo = videos.filter(vid => {
    vid.url === newVid.url
  } );

  //last endpoint will work correctly when database added
  if (!newVid.title) {
    return res.status(400).json(`Please enter a title`);
  } else if (!newVid.url) {
    return res.status(400).json(`Please enter a url`);
  } else if (foundVideo.length === 0) {
    videos.push(newVid)
    return res.json(videos);
  }
  res.status(400).json(`Video already added`)
});

app.get("/:videoId", (req, res) => {

  const requestedVid = videos.filter(vid => {
  vid.id = vid.id.toString();
  return vid.id === req.params.videoId}); 
  res.json(requestedVid);
})

app.delete("/:videoId", (req, res) => {
  const found = videos.some(
    vid => vid.id.toString() === req.params.videoId
  );;

  if (found) {
   res.json(videos.filter(vid => vid.id.toString() !== req.params.videoId)); 
  } else {
    res.status(400).send(`There's no video with the id ${req.params.messageId}`);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

