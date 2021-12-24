const express = require("express");
const cors = require("cors");
const { Pool } = require('pg');
const app = express();
const videos = require("../client/src/data/exampleresponse.json")

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(cors());
app.use(express.json()); // before our routes definition

// helper functions
const generator = require("./util/generator");
const validateYoutube = require("./util/validateYoutube");




const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'video_app',
    password: '',
    port: 5432
});

// GET "/"
// app.get("/", function(req, res) {
//     pool.query('SELECT * FROM videos', (error, result) => {
//       console.log(result.rows)
//         res.send(videos);
//     });
// });
app.get('/', function(req, res) {
  pool
  .query('SELECT * FROM videos')
  .then((result) => {
    result.rows.length <= 0
      ? res.status(400).json({
          result: "failure",
          message: "Unable to retrieve video list",
       })
      : res.status(200).json(result.rows);
  }).catch((e) => res.status(400).send(e))
});


// POST
app.post("/", (req, res) => {
  // console.log(req.body);
  let newTitle = req.body.title;
  let newUrl = req.body.url;
  // console.log(newUrl)
  // console.log(validateYoutube(newUrl))

  if (!newTitle || !validateYoutube(newUrl)) {
    res.status(400).json({
      "result": "failure",
      "message": "Video could not be saved"
    })
  } else {
    const youtubeID = validateYoutube(newUrl)
    let seqID = generator.generate();
    let newVideo = {
      id: Number(seqID),
      title: newTitle,
      url: `https://www.youtube.com/embed/${youtubeID}`,
      rating: 0
    };
    // console.log(newVideo)
    videos.push(newVideo);
    // res.status(200).json({ id: newVideo.id })
    res.status(200).json(newVideo)
  }
})

app.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const video = videos.find((video) => video.id === id);
  if (video) {
    res.send(video);
  } else {
    res.status(400).json({ msg: "Video Not Found" })
  }

});

/*
// Delete one message by id before frontend 
app.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const video = videos.find((video) => video.id === id);
  if (video){
    res.json({
      video: "Video Deleted",
      videos: videos.filter(video => video.id !== id)
    })
  }else {
    res.status(400).json({
      "result": "failure",
      "message": "Video could not be deleted"
    })
  }
  //  videos.splice(id, 1);
});
*/

// Delete one message by id
app.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const foundVideo = videos.find((video) => video.id === id);
  // console.log(id, foundVideo.id)
  if (foundVideo) {

    // get index of object with id
    const removeIndex = videos.findIndex( item => item.id === id );
    videos.splice( removeIndex, 1 )
    // console.log(videos)
    res.json({
      video: "Video Deleted",
      newVideos: videos
    })
  } else {
    res.status(400).json({
      "result": "failure",
      "message": "Video could not be deleted"
    })
  }
  //  videos.splice(id, 1);
});