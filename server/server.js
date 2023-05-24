const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.listen(port, () => console.log(`Listening on port ${port}`));

let videos = [
  {
    id: 523523,
    title: "Never Gonna Give You Up",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: 23,
  },
  {
    id: 523427,
    title: "The Coding Train",
    url: "https://www.youtube.com/embed/HerCR8bw_GE",
    rating: 230,
  },
  {
    id: 82653,
    title: "Mac & Cheese | Basics with Babish",
    url: "https://www.youtube.com/embed/FUeyrEN14Rk",
    rating: 2111,
  },
  {
    id: 858566,
    title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    url: "https://www.youtube.com/embed/xbs7FT7dXYc",
    rating: 11,
  },
  {
    id: 453538,
    title:
      "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
    url: "https://www.youtube.com/embed/4As0e4de-rI",
    rating: 3211,
  },
  {
    id: 283634,
    title: "Learn Unity - Beginner's Game Development Course",
    url: "https://www.youtube.com/embed/gB1F9G0JXOo",
    rating: 211,
  },
  {
    id: 562824,
    title: "Cracking Enigma in 2021 - Computerphile",
    url: "https://www.youtube.com/embed/RzWB5jL5RX0",
    rating: 111,
  },
  {
    id: 442452,
    title: "Coding Adventure: Chess AI",
    url: "https://www.youtube.com/embed/U4ogK0MIzqk",
    rating: 671,
  },
  {
    id: 536363,
    title: "Coding Adventure: Ant and Slime Simulations",
    url: "https://www.youtube.com/embed/X-iSQQgOd1A",
    rating: 76,
  },
  {
    id: 323445,
    title: "Why the Tour de France is so brutal",
    url: "https://www.youtube.com/embed/ZacOS8NBK6U",
    rating: 73,
  },
];

// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
});

//POST "/"
app.post("/", function (req, res) {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    const newVideoId = videos.length + 1;
    const newVideo = {
      id: newVideoId,
      title,
      url,
      rating: 0,
    };
    // Adding the new video to the videos array
    videos.push(newVideo);
    res
      .status(201)
      .send(`The new video with the id ${newVideo.id} has been added`);
  }
});

// GET "/{id}"
app.get("/:id", function (req, res) {
  const videoId = Number(req.params.id);
  const searchedVideo = videos.find((video) => video.id === videoId);

  if (searchedVideo) {
    res.send(searchedVideo);
  } else {
    res.status(404).json({
      result: "failure",
      message: `Video with ID ${videoId} not found`,
    });
  }
});

// DELETE "/:id"
app.delete("/:id", function (req, res) {
  const videoId = Number(req.params.id);
  const initialVideosLength = videos.length;
  videos = videos.filter((video) => video.id !== videoId);

  if (videos.length < initialVideosLength) {
    res.send(`Video with ID ${videoId} deleted successfully.`);
  } else {
    const failureMessage = {
      result: "failure",
      message: "Video could not be deleted",
    };
    res.status(404).json(failureMessage);
  }
});
