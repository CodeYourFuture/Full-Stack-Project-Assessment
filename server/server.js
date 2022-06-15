const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const exampleresponse = require("./exampleresponse.json");
const bodyParser = require("body-parser");

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = exampleresponse;

// GET "/"
app.get("/", (req, res) => {
  console.log(videos);
  res.json(videos[0]);
});

// GET "/videoId"

// POST"/"
app.post("/videos", (req, res) => {
  newVideoId = videos.length + 1;

  const addNewVideo = {
    id: newVideoId,
    title: req.body.title,
    url: req.body.url,
    rating: 0,
  };

  videos.push(addNewVideo);
  res.send(videos);
});

app.get("/videos/:Id", (req, res) => {
  const findId = videos.find((video) => video.id == req.params.Id);
  res.json(findId);
});

// DELETE "/"
app.delete("/videos/:Id", (req, res) => {
  const findId = videos.find((video) => video.id == req.params.Id);
  const findWhereId = videos.findIndex((video) => video.id == req.params.Id);
  videos.splice(findWhereId, 1);

  if (findId) {
    res.send(`Message with id:${findId.id} has been deleted`);
  } else {
    res.json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});
