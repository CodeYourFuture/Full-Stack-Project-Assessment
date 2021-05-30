const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./data/exampleresponse.json");

// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
});

app.post("/", (req, res) => {
  const newVideo = req.body;
  console.log(newVideo);
  videos.push(newVideo);
  res.status(201);
  res.send({ id: newVideo.id });
});

app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let filteredVideo = videos.filter((video) => video.id === id);
  if (filteredVideo.length === 0) {
    res.status(404);
    res.send(`No video found for the ID: ${id}`);
  } else {
    res.status(200);
    res.send(filteredVideo);
  }
});

app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  videos = videos.filter((video) => video.id !== id);
  res.send({});
  // res.send({ result: "failure", message: "Video could not be deleted" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
