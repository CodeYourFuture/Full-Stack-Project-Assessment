const express = require("express");
const app = express();
const videos = require("./exampleresponse.json");

const port = 5000;
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));
//  level200-start
app.get("/videos", (req, res) => {
  res.json(videos);
});

// for convert string to number add + before request
app.get("/videos/:id", (req, res) => {
  const newId = +req.params.id;
  const oneVideo = videos.find((video) => video.id === newId);
  if (oneVideo) {
    res.json(oneVideo);
  }
});

app.post("/videos", (req, res) => {
  let data = req.body;
  // new data and get time methods are js inbuild function which are use to create a new id in this project
  data.id = new Date().getTime();
  const valid = data.url !== "" && data.title !== "";

  if (valid) {
    videos.push(data);
    res.json({ id: data.id });
  } else {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

app.delete("/videos/:id", (req, res) => {
  const newId = +req.params.id;
  const index = videos.findIndex((video) => video.id === newId);
  if (index === -1)
    return res.status(404).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  videos.splice(index, 1);
  res.json({});
});
// level 200-end