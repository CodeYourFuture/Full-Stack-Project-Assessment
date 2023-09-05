
const express = require("express");
const app = express();
const cors = require ("cors");
app.use(cors());
const videos = require("../exampleresponse.json"); 

app.use(express.json());

const { body, validationResult } = require("express-validator");

const port = process.env.PORT || 3000;



// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let welcomeVideo = {
//   id: "0",
//   title: "Never Gonna Give You Up",
//   url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
// };
// const videos = [welcomeVideo];


// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

// GET "/videos"
app.get("/videos", function (req, res) {
  if (videos.length === 0) {
    return res.status(404).json({ error: "no videos found" });
  }
  res.json(videos);
});

//adding new video
app.post(
  "/videos",
  [
    body("title", "text can't be empty").notEmpty(),
    body("url", "text can't be empty").notEmpty(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        error: errors.array(),
      });
    }
    const newVideo = {
      id: videos.length.toString(),
      title: req.body.title,
      url: req.body.url,
       rating:req.body.rating
    };
    videos.push(newVideo);
    res.status(201).json(videos);
  }
);

//search video by query for example /videos/search?title=halleluja
app.get("/videos/search", function (req, res) {
  const searchVideo = req.query.title;
  const filteredVideo = videos.filter((video) =>
    video.title.toLowerCase().includes(searchVideo.toLowerCase())
  );
  if (filteredVideo.length === 0) {
    res.status(404).json({ error: "No matching videos found" });
  }
  res.json(filteredVideo);
});

// //search video by id for example/videos/:id
// app.get("/videos/:id", function (req, res) {
//   const videoId = parseInt(req.params.id);
//   const video = videos.find((m) => m.id === videoId);
//   if (!video) {
//     return res.status(404).send({ error: "This id doesn't exist" });
//   }
//   res.status(200).send({ video });
// });
//updating video with id
app.put("/videos/:id", function (req, res) {
  const video = videos.find((m) => m.id == req.params.id);
  if (!video) {
    return res.status(404).json({
      error: "This id doesn't exist",
    });
  }
  const newVideos = videos.map((video) => {
    if (video.id == req.params.id) {
      return { ...video, ...req.body };
    }
    return video;
  });
  res.json({ data: newVideos });
});

//delete video
app.delete("/videos/:id", function (req, res) {
  const video = videos.find((m) => m.id == req.params.id);
  if (!video) {
    res.status(404).json("This id doesn't exist");
  }
  const index = videos.indexOf(video);
  videos.splice(index, 1);
  res.json(videos);
});

app.listen(port, () => console.log(`Listening on port ${port}`));