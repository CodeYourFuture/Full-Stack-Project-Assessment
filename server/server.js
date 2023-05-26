const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { v4: uuidv4 } = require("uuid");

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(cors());
app.use(express.json());

let videos = require("../exampleresponse.json");
// let allVideos = [videos];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.removeHeader("Permissions-Policy");
  next();
});

// GET "/"
app.get("/", (req, res) => {
  const orderedVideos = [...videos];
  if (req.query.order) {
    let orderParams = req.query.order;
    if (orderParams === "asc")
      orderedVideos.sort((a, b) => a.rating - b.rating);
    else if (orderParams === "desc")
      orderedVideos.sort((a, b) => b.rating - a.rating);
  }
  res.send(orderedVideos);
});

//POST '/'
app.post("/", (request, response) => {
  const id = videos.length;
  const rating = Math.floor(Math.random() * 10000);
  let { title, url } = request.body;

  let newVideo = { id, title, url, rating };

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

app.get("/:id", (request, response) => {
  const id = request.params.id;
  const findEl = videos.find((el) => Number(el.id) === Number(id));
  response.send(findEl);
});

app.delete("/:id", (request, response) => {
  const id = request.params.id;
  const findEl = videos.find((el) => Number(el.id) === Number(id));
  if (findEl) {
    videos = videos.filter((el) => Number(el.id) !== Number(id));
    response.send(videos);
  } else {
    response.status(400).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});
