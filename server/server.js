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
const port = process.env.PORT || 5000;
const data = require("../client/src/exampleresponse.json");

const cors = require("cors");
app.use(cors());

app.use(express.json());

// Store and retrieve your videos from here
let videos = [...data];

app.get("/", function (req, res) {
  res.json(videos);
});

app.post("/", function (req, res) {
  const { title, url, rating } = req.body;

  const newVideo = {
    id: videos.length,
    title,
    url,
    rating: rating ? rating : 0,
  };

  if (!newVideo.title || !newVideo.url) {
    return res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    videos.push(newVideo);
    res.json({ id: newVideo["id"] });
  }
});

app.get("/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let foundVideo = videos.filter((i) => i.id == id);

  if (foundVideo) {
    res.status(200).json(foundVideo);
  }
});

app.delete("/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let foundVideo = videos.filter((i) => i.id == id);

  if (foundVideo) {
    return res.status(200).json({});
  } else {
    return res.status(400).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
