const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [
  {
    id: 523523,
    title: "Never Gonna Give You Up",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 23,
  },
  {
    id: 523427,
    title: "The Coding Train",
    url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
    rating: 230,
  },
  {
    id: 82653,
    title: "Mac & Cheese | Basics with Babish",
    url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
    rating: 1112,
  },
  {
    id: 858566,
    title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
    rating: 11,
  },
  {
    id: 453538,
    title:
      "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
    url: "https://www.youtube.com/watch?v=4As0e4de-rI",
    rating: 3211,
  },
  {
    id: 283634,
    title: "Learn Unity - Beginner's Game Development Course",
    url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
    rating: 211,
  },
  {
    id: 562824,
    title: "Cracking Enigma in 2021 - Computerphile",
    url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
    rating: 111,
  },
  {
    id: 442452,
    title: "Coding Adventure: Chess AI",
    url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
    rating: 671,
  },
  {
    id: 536363,
    title: "Coding Adventure: Ant and Slime Simulations",
    url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
    rating: 76,
  },
  {
    id: 323445,
    title: "Why the Tour de France is so brutal",
    url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
    rating: 73,
  },
];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you'vea confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

app.get("/videos", (req, res) => {
  res.json(videos);
});

const isValidYouTubeURL = (url) => {
  // Regular expression to match YouTube URL pattern
  const youtubeRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
  return youtubeRegex.test(url);
};

app.post("/videos", (req, res) => {
  const { title, url } = req.body;

  if (title !== "" && isValidYouTubeURL(url)) {
    const newVideo = {
      id: Date.now(),
      title,
      url,
      rating: 0,
      postedAt: new Date().toLocaleString(),
    };

    videos.push(newVideo);
    res.status(201).json(newVideo);
  } else {
    res.status(400).json({ error: "Invalid video title or URL" });
  }
});

app.delete("/videos/:id", (req, res) => {
  const videoID = Number(req.params.id);
  const deletedVideo = videos.find((video) => videoID === video.id);

  if (deletedVideo) {
    videos = videos.filter((video) => videoID !== video.id);
    res.json(videos);
  } else {
    res.status(404).json({ error: "Video not found" });
  }
});
