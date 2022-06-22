const express = require("express");
const app = express();
// added cors because client server fetch were showing blocking messaging and suggested cors()
const cors = require("cors"); 

const port = process.env.PORT || 5000;
app.use(express.json());


const jsonData = require("../exampleresponse.json");

app.use(cors()); // added cors

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = jsonData;

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.json(videos);
});

// GET "/post"
app.post("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  const newVideo = req.body;

  if (!newVideo.title || !newVideo.url) {
    res.send({ result: "failure", message: "Video could not be saved" });
  } else {
    newVideo.id = videos[videos.length - 1].id + 1;
    videos.push(newVideo);
    res.json({ id: newVideo.id });
  }
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filterVideo = videos.filter((vid) => vid.id === id);
  filterVideo.length === 0
    ? res.send("Video not found")
    : res.json(filterVideo[0]);
});

// DELETE "/{id}"
app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filterVideo = videos.filter((vid) => vid.id === id);
  if (filterVideo.length === 0) {
    res.json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
  const updateVidoes = videos.filter((vid) => vid.id !== id);
  videos = updateVidoes;
  res.json({});
});

// listen to port
app.listen(port, () => console.log(`Listening on port ${port}`));