const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;
const bodyparser = require("body-parser");

//when you write post endpoints don't forget body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [
  {
    id: 523523,
    title: "Get Your Blessings",
    url: "https://www.youtube.com/watch?v=n3SeaKTbrmc",
    rating: 23,
  },
  {
    id: 523427,
    title: "This Is Season To Shine",
    url: "https://www.youtube.com/watch?v=GgHvx6fwGhk",
    rating: 1270,
  },
  {
    id: 82653,
    title: "Looking For You",
    url: "https://www.youtube.com/watch?v=q1XW5ticeMw",
    rating: 2111,
  },
];

//returns all videos
app.get("/", (req, res) => {
  res.json(videos);
});

//adds a video
app.post("/", function (req, res) {
  const { title, url, rating } = req.body;

  if (
    title === undefined ||
    title === 0 ||
    url === undefined ||
    url === 0 ||
    rating === undefined ||
    rating === 0
  ) {
    return res
      .status(400)
      .send("check that you have filled the form correctly");
  } else {
    const newVideoPosted = {
      id: videos.length,
      title,
      url,
      rating,
    };
    videos.push(newVideoPosted);
    console.log(videos);
    res.send("video added");
  }
});

//gets id of each video
app.get("/:id", function (req, res) {
  const id = Number(req.params.id);
  const result = videos.find((video) => video.id === id);
  if (result) {
    res.send(result);
  } else {
    res.status(404).send(`id ${id} not found`);
  }
});

//deletes a video
app.delete("/:id", function (req, res) {
  const { id } = req.params;
  const removeVideo = videos.findIndex((index) => index.id === id);

  if (removeVideo) {
    videos.slice(removeVideo, 1);
    res.send(`${id} id has been removed`);
  } else {
    res.status(404).send("not found");
  }
});
