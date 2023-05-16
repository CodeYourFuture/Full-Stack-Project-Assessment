const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [{
    "id": 523523,
    "title": "Never Gonna Give You Up",
    "url": "dQw4w9WgXcQ",
    "rating": 23,
    "date": "2023-05-16"
  },
  {
    "id": 523427,
    "title": "The Coding Train",
    "url": "HerCR8bw_GE",
    "rating": 230,
    "date": "2023-05-15"
  },
  {
    "id": 82653,
    "title": "Mac & Cheese | Basics with Babish",
    "url": "FUeyrEN14Rk",
    "rating": 2111,
    "date": "2023-05-14"
  },
  {
    "id": 858566,
    "title": "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    "url": "xbs7FT7dXYc",
    "rating": 11,
    "date": "2023-05-13"
  }];



// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

  // GET "/videos"
app.get("/videos", (req, res) => {
  let orderedVideos = [...videos];

  const orderParam = req.query.order;
  if (orderParam === "asc") {
    orderedVideos.sort((a, b) => a.rating - b.rating);
  } else if (orderParam === "desc") {
    orderedVideos.sort((a, b) => b.rating - a.rating);
  } // If no order parameter is provided, the default order is descending (desc)

  res.json(orderedVideos);
});

// post
app.post("/videos", (req, res) => {
  const newVideo = req.body;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Note: Month is zero-based
  const day = currentDate.getDate();
  const newCard = {
    id: generateUniqueId(),
    title: newVideo.title.trim(),
    url: newVideo.url,
    rating: 0,
    date: `${year}-${month}-${day}`,
  };
  videos.push(newCard);
  res.status(201).json(newCard);
});

function generateUniqueId() {
  // For simplicity, we'll use a random number here
  return Math.floor(Math.random() * 100000);
}

// DELETE "/videos/:id"
app.delete("/videos/:id", (req, res) => {
  const videoId = req.params.id;
  const index = videos.findIndex((video) => video.id === parseInt(videoId));
  if (index !== -1) {
    const deletedVideo = videos.splice(index, 1);
    res.json(deletedVideo);
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});

// PUT "/videos/:id/rating"
app.put("/videos/:id/rating", (req, res) => {
  const videoId = req.params.id;
  const { rating } = req.body;
  const index = videos.findIndex((video) => video.id === parseInt(videoId));
  if (index !== -1) {
    videos[index].rating = rating;
    res.json({ message: "Rating updated successfully" });
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});