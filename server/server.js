const { urlencoded } = require("express");
const express = require("express");
const videosData = require("./exampleresponse.json");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');


const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
// Adding some middleware,You DO NOT NEED express.json() and express.urlencoded() for GET Requests or DELETE Requests.
// You NEED express.json() and express.urlencoded() for POST and PUT requests, because in both these requests you are sending data 
// (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body.
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json());
app.use(urlencoded({ extended: true }));


app.listen(port, () => console.log(`Listening on port ${port}`));


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = videosData;

// GET "/"
app.get("/", (req, res) => {
  res.send(`API server loading .....`);
});

app.get("/videos", (req, res) => {
  if (videos) {
    res.json(videos);
  } else {
    res
      .status(500)
      .send("No video is available");
  };
});

app.post("/addVideo", (req, res) => {
  // Both fields - title and url - must be included and be valid for this to succeed.
  let maxId = Math.max(...videos.map(video => video.id));
  if (req.body.title && req.body.url) {
    let newVideo = {
      id: ++maxId,
      title: req.body.title,
      url: req.body.url,
      postedAt: new Date(),
    };

    videos.push(newVideo);
    res.send(newVideo);
  } else {
    res
      .status(400)
      .send({ result: "failure", message: "Video could not be saved" });
  }
});

app.get("/videos/:id", (req, res) => {
  let targetedId = parseInt(req.params.id);
  let targetedVideo = videos.find(video => video.id === targetedId);
  if (targetedVideo) {
    res.send(targetedVideo);
  } else {
    res.status(400).send({
      result: "failure",
      message: "No matching result",
    });
  }
});

app.delete('/videos/:id', (req, res) => {
  const targetedId = parseInt(req.params.id);
  const targetedVideoIndex = videos.findIndex((video) => video.id === targetedId);

  if (targetedVideoIndex >= 0) {
    videos.splice(targetedVideoIndex, 1);
    res.status(200).json(videos);
  } else {
    res.status(400).send({
      "result": "failure",
      "message": "Video could not be deleted"
    });
  }
})