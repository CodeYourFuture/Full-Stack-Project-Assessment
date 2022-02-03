const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5050;
let videos = require("../exampleresponse.json");

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET "/"
app.get("/", (req, res) => {
  res.json(videos);
});
//post
app.post("/videos", function (req, res) {
  const video = {
    id: 0,
    title: req.body.title,
    url: req.body.url,
  };

  console.log(req.body);

  if (!video.title || !video.url) {
    return res.status(400).json({
      msg: "Please include a title, and a url",
    });
  } else {
    videos.push(video);
    video.id = videos.indexOf(video) + 1;
    return res.json(videos);
  }
});

// `GET` "/{id}"
app.get("/:id", (req, res) => {
  const idFilter = (req) => (video) => video.id === parseInt(req.params.id);

  const found = videos.some(idFilter(req));

  if (found) {
    res.json(videos.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No video with the id of ${req.params.id}` });
  }
});

// delete
app.delete("/:id", (req, res) => {
  const idFilter = (req) => (video) => video.id === parseInt(req.params.id);
  const found = videos.some(idFilter(req));

  if (found) {
    res.json({});
  } else {
    res.json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});
