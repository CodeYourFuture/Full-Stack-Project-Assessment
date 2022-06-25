const express = require("express");
const app = express();
const { Pool } = require('pg');
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pool = new Pool({
  user: "deago",
  host: "localhost",
  database: "fullstackdb",
  password: "Offbeat2022!",
  port: 5432
})

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// const videos = require('../client/src/exampleresponse.json');


// GET "/"
app.get("/", (req, res) => {
  // res.json(videos)
  pool.query('SELECT * FROM videos')
    .then((results) => res.json(results.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    })
});

app.get("/:id", (req, res) => {
  const videoId = parseInt(req.params.id)
  if (videoId) {
    pool.query(`SELECT * FROM videos WHERE id = ${videoId}`)
      .then((results) => res.json(results.rows))
    res.send()
    res.status(200).json(videoId);
  } else {
    res.status(400).json({
      "request": "Unsuccessful",
      "message": "id is not locatable - please enter valid id"
      // const videoById = videos.filter(video => video.id === id);
    })
  }
})

app.delete("/:id", (req, res) => {
  const videoId = parseInt(req.params.id)
  if (videoId) {
    pool.query(`DELETE * FROM videos WHERE id = ${videoId}`)
      .then((results) => res.json(results.rows))
    res.status(200).json(videos.filter(video => video.id !== id));
  } else {
    res.status(400).json({
      "request": "Unsuccessful",
      "message": "id is not locatable - video could not be deleted"
      // const deleteById = videos.filter(video => video.id === id);
    })
  }
})

// let idsUsed = videos.map(video => video.id);

app.post('/', (req, res) => {
  const newTitle = req.body.title;
  const newUrl = req.body.title;
  const newRating = 0;

  if (!newTitle || !newUrl) {
    res.status(400).json({
      "request": "Unsuccessful",
      "message": "Please provide valid title/url"
    })
  }
  const query =
    "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)";
  pool
    .query(query, [newTitle, newUrl, newRating])
    .then(() => res.send("Video added successfully!"))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    })

})
// let video = {
//   "id": (Math.max(...idsUsed) + 1),
//   "title": req.body.title,
//   "url": req.body.url,
//   "rating": 0
// }

// console.log(video);
// videos.push(video);
// idsUsed.push(video.id);
// res.send(video)


app.listen(port, () => console.log(`Listening on port ${port}`));
