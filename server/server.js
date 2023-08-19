const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

let cors = require("cors");
app.use(cors());
app.use(express.json());
app.listen(port, () => console.log(`Listening on port ${port}`));

let videos = require("./exampleresponse.json");

// get
app.get("/", (req, res) => {
  res.json(videos);
});

// get-id
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const video = videos.find((v) => v.id === id);
  if (!video) {
    res.status(404).json({ result: "failure", message: "Video not found" });
  }
  res.json(video);
});

//delete-id
app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = videos.findIndex((v) => v.id === id);
  if (index === -1) {
    res
      .status(404)
      .json({ result: "failure", message: "Video could not be deleted" });
  }
  videos.splice(index, 1);
  res.json({});
});

// post
app.post("/", (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    res
      .status(400)
      .json({ result: "failure", message: "Video could not be saved" });
  }
  const id = Math.floor(Math.random() * 1000000);
  videos.push({ id, title, url });
  res.json({ id });
});
