const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
app.listen(port, () => console.log(`Listening on port ${port}`));

const videosList = require("../exampleresponse.json");

app.use(express.json());
app.use(cors())
app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [...videosList];

// GET "/"
app.get("/", (req, res) => {

  res.send({ express: "Your Backend Service is Running" });
});
app.get("/videos", (req, res) => {
  res.json(videosList);
});

app.post("/videos", (req, res) => {
  //console.log(req.body);
  if (!req.body.title || !req.body.url) {

    return res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }

  const addVideo = {
    id:videosList.length > 0 ? videosList[videosList.length - 1].id + 1 : 1,
    ...req.body
  };

  videosList.push(addVideo);
  res.status(200).json({
    id: addVideo.id,
  });
  console.log(addVideo)
});


app.get("/videos/:id", (req, res) => {
  const vidId = req.params.id * 1;
  const video = videosList.find((el) => el.id === vidId);
  if (video) {
    res.status(200).json(video);
  } else {
    res.status(400).json({
      status: "fail",
      message: "Not found video with this Id",
    });
  }
});

app.delete("/videos/:id", (req, res) => {
  const vidId = req.params.id * 1;
  const video = videosList.find((el) => el.id === vidId);
  console.log(video);
  if (video >= 0) {
    videosList.splice(video, 1);
    res.status(200).status({
      status: "success",
    });
    console.log(video);
  } else {
    res.status(400).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});
