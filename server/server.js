const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const exampleData = require("../client/src/exampleresponse.json")
const { v4: uuidv4 } = require('uuid');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware for cors policy
const cors = require("cors");
app.use(cors());


const { Pool } = require('pg');

// for password YUNUS
const dotenv = require('dotenv');
// for password YUNUS
dotenv.config();
// for password YUNUS
// CONNECTIONSTRING = 'postgresql://username:password@localhost:5432/cyf_hotels'

const pool = new Pool({

  connectionString: process.env.CONNECTIONSTRING,

});


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];

// GET "/"
// app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
//   res.send({ express: "Your Backend Service is Running" });
// });

// 1. list of all videos
app.get("/videos", function (req, res) {
  res.json(exampleData);
});

// ###`POST` "/"
// This endpoint is used to add a video to the API.
// Both fields - title and url - must be included and be valid for this to succeed.
// ** Note:** When a video is added, you must attach a unique ID to so that it can later be deleted
app.post("/videos", (req, res) => {
  const newVideo = {
    "id": uuidv4(),
    "title": req.body.title,
    "url": req.body.url,
    "rating": 0,
    "timePost": new Date().toLocaleString
  }
  if (!newVideo.title || !newVideo.url) {
    res.status(400).json({
      "result": "failure",
      "message": "Video could not be saved"
    })
  } else res.status(200).json(exampleData.push(newVideo))
})
console.log(exampleData)

// ###`GET` "/{id}"
// Returns the video with the ID contained within the`{id}` parameter
app.get("/videos/:id", (req, res) => {
const videoId = req.params.id
const found = exampleData.some(element => element.id === videoId)
if(found){
  const filteredData = exampleData.filter(element => element.id === videoId)
  res.status(200).json(filteredData)
} else res.status(404).json({msg: `There is no video with id : ${videoId}`})
})

// ###`DELETE` "/{id}"
// Deletes the video with the ID container within the`{id}` parameter
app.delete("/videos/:id", (req, res) => {
  const id = req.params.id
  const found = exampleData.some(video => video.id === id)
  if (found) {
    exampleData = exampleData.filter(video => {
      return video.id !== id
    })
    res.status(200).json({ msg: `video with id: ${id} is deleted` })
  } else res.status(400).json({
    "result": "failure",
    "message": "Video could not be deleted"
  })
})


app.listen(port, () => console.log(`Listening on port ${port}`));