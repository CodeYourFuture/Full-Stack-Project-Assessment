const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [
  {
    "id": 523523,
    "title": "Never Gonna Give You Up",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "rating": 23,
  },
  {
    "id": 523427,
    "title": "The Coding Train",
    "url": "https://www.youtube.com/watch?v=HerCR8bw_GE",
    "rating": 230,
  },
  {
    "id": 82653,
    "title": "Mac & Cheese | Basics with Babish",
    "url": "https://www.youtube.com/watch?v=FUeyrEN14Rk",
    "rating": 2111,
  },
  {
    "id": 858566,
    "title": "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    "url": "https://www.youtube.com/watch?v=xbs7FT7dXYc",
    "rating": 11,
  },
  {
    "id": 453538,
    "title": "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
    "url": "https://www.youtube.com/watch?v=4As0e4de-rI",
    "rating": 3211,
  },
  {
    "id": 283634,
    "title": "Learn Unity - Beginner's Game Development Course",
    "url": "https://www.youtube.com/watch?v=gB1F9G0JXOo",
    "rating": 211,
  }
];

// GET "/running"
app.get("/running", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

// GET "/" This endpoint is used to return all of the videos
app.get("/", (req, res) => {
  res.send({ videos: videos });
});

// `POST` This endpoint is used to add a video to the API.
app.post("/", (req, res) =>{
  const [title, url] = req.body;
  const newVideo = {
    id: 5,
    title: title,
    url: url,
    rating: 0
  }
  videos.push(newVideo);
  res.status(201).json({message: "new video has been added"});
})



