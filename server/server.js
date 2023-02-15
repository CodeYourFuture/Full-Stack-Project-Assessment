// const express = require("express");
// const app = express();
// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Listening on port ${port}`));

// // Store and retrieve your videos from here
// // If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];

// // GET "/"
// app.get("/", (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   res.send({ express: "Your Backend Service is Running" });
// });

const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
let videos = require("./data/exampleresponse.json");

app.use(express.json());

app.get("/", (req, res) => {
  res.json(videos);
});

app.get("/:id", (req, res) => {
  const video = videos.find(video => video.id === +req.params.id);
  res.json(video);
});

app.post("/", (req, res) => {
  const video = {
    id: Math.round(Math.random() * 1000),
    title: req.body.title,
    url: req.body.url,
    rating: 0,
  };

  try {
    videos.push(video);

    res.json({ id: video.id });
  } catch (error) {
    res.json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

app.delete("/:id", (req, res) => {
  const videoId = +req.params.id;

  try {
    videos = videos.filter(video => video.id !== videoId);
    console.log(videos[0]);

    res.json({});
  } catch (error) {
    res.json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
