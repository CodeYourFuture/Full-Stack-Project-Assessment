const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const exampleresponse = require("./exampleresponse.json");

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = exampleresponse;

// GET "/"
app.get("/", (req, res) => {
  console.log(videos);
  res.json(videos[0]);
});

// GET "/videoId"
app.get("/videos/:Id", (req, res) => {
  const findId = videos.find((video) => video.id == req.params.Id);
  res.json(findId);
});

// POST"/"
app.post("/videos", (req, res) => {
  newVideoId = videos.length + 1;

  const addNewVideo = {
    id: newVideoId,
  };
});

// DELETE "/"
app.delete("/", (req, res) => {});
