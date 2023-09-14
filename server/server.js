const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const videos = require("../client/src/Data/exampleresponse.json");

app.use(express.json());

// <-------------------get------------------->
app.get("/", (req, res) => {
  res.json(videos);
});
// <----------------------------------------->
// <---------------get By ID----------------->

app.get("/:id", (req, res) => {
  const id = req.params.id * 1;
  const video = videos.find((ele) => ele.id === id);

  if (!video) {
    return res
      .status(404)
      .json({ result: "failure", message: "Video not found" });
  }

  res.json(video);
});
// <----------------------------------------->

// <---------------------Edit---------------->
app.post("/", (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res
      .status(400)
      .json({ result: "failure", message: "Video could not be saved" });
  }
  const id = Math.max(...videos.map((video) => video.id), 0) + 1;
  const newVideo = { id, title, url, rating: 0 };
  videos.push(newVideo);

  res.status(201).json({ id });
});
// <----------------------------------------->

// <-------------------Delete---------------->
app.delete("/:id", (req, res) => {
  const id = req.params.id * 1;

  const index = videos.findIndex((ele) => ele.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ result: "failure", message: "Video not found" });
  }

  videos.splice(index, 1);

  res.json({ message: "The item has been deleted" });
});
// <------------------> app starting ----------->

app.listen(port, () => console.log(`Listening on port ${port}`));
