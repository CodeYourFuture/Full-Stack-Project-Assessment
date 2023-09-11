const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
// const AllVideos = require("")
const cors = require("cors");
const short = require('short-uuid');
const translator = short("12345")

const { Pool } = require("pg");
const db = new Pool({
  user: "Mac@192", // replace with you username
  host: "localhost",
  database: "videos",
  password: "",
  port: 5432,
});

app.use(express.json());
app.use(cors());


app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = AllVideos;

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});



app.post("/videos", (req, res) => {
  let newVideo = req.body
  console.log(req.body)

  if (!newVideo.title || !newVideo.url || newVideo.title === "" || newVideo.url === "") {
    res.status(400).send("Fill in the missing fields")
  } else {
    newVideo.title = req.body.title
    newVideo.url = req.body.url
    newVideo.id = (translator.generate()).slice(4, 10)
    videos.push(newVideo)
    res.send(videos)
  }

});


app.delete("/videos/:id", (req, res) => {
  let videoId = req.params.id

  res.send(deleteVideoByID(videos, videoId))
})
//installed pg module


app.get("/videos", (req, res) => {
  db.query("SELECT * FROM videos")
    .then((result) => {
      res.send(200).json({ videos: result.rows });
    })
    .catch((error) => {
      console.log(error);
    });
})

app.get("/videos/:id", (req, res) => {
  let id = req.params.id
  res.send(findVideoByID(id))
})



const findVideoByID = (id) => {
  return videos.filter(video => {
    return video.id == id
  })
}


const deleteVideoByID = (videos, id) => {
  let videoI = videos.findIndex((video) => video.id == id);
  if (videoI > -1) {
    videos.splice(videoI, 1)
  }
  return videos

}
