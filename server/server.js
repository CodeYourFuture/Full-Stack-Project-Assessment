const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { v4: uuidv4 } = require("uuid");

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());

let videos = require("../exampleresponse.json");
// let allVideos = [videos];

// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
});

//POST '/'
app.post("/", (request, response) => {
  const id = uuidv4();
  let { title, url } = request.body;
  let newVideo = { id, title, url };

  if (
    newVideo.title &&
    newVideo.url &&
    newVideo.title.length > 0 &&
    newVideo.url.length > 0
  ) {
    videos.push(newVideo);
    response.status(201).send(videos);
  } else {
    response.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});
