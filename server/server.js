const express = require("express");
let cors = require("cors");
const app = express();
const videosData = require("./../client/src/components/exampleresponse.json");

//middleware
app.use(cors());
app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [videosData];

// GET "/"
// app.get("/", (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   res.send({ express: "Your Backend Service is Running" });
// });

app.get("/", (req, res) => {
  res.send(videosData);
});

app.get("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);

  res.send(videosData[videoId]);
});

app.post("/videos", (req, res) => {
  const addNewVideo = req.body;

  addNewVideo.id = Math.floor(Math.random() * 100000);
  if (!addNewVideo.title || !addNewVideo.url) {
    res.status(400).send({ msg: "Please add a Title & URL from Youtube !" });
  } else {
    videos.push(addNewVideo);
    res.status(200).send({ msg: `Video:${addNewVideo.title} has been added.` });
  }
});

app.get("/videos/:id", (req, res) => {
  const videoId = parseInt(req.params.id);

  const filterVideo = videosData.filter((video) => video.id === videoId);

  if (filterVideo.length === 0) {
    res.status(400).send({ msg: `Video with:${videoId} not found!` });
  } else {
    res.status(200).send(filterVideo);
  }
});

app.delete("/videos/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  indexVideo = videos.findIndex((video) => video.id == videoId);

  if (indexVideo >= 0) {
    videos.splice(indexVideo, 1);
    res
      .status(200)
      .send({ msg: `Video with id:${videoId} has been deleted. ` });
  } else {
    res.status(400).send({ msg: `Video with id:${videoId} not found! ` });
  }
});
