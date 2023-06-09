const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.listen(port, () => console.log(`Listening on port ${port}`));
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// let videos = [
//   {
//     "id": 442452,
//     "title": "Coding Adventure: Chess AI",
//     "url": "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     "rating": 671
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "HerCR8bw_GE",
//     rating: 230,
//     date: "2023-05-15",
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },
// ];
// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});
// GET "/videos"
// app.get("/videos", (req, res) => {
//   res.json(videos);
// });

app.get("/videos", (req, res) => {
  const orderParam = req.query.order;
  let orderedVideos = [...videos];

  const orderBy =
    orderParam === "asc"
      ? (a, b) => a.rating - b.rating
      : (a, b) => b.rating - a.rating;
  orderedVideos.sort(orderBy);

  res.json(orderedVideos);
});


// POST "/videos"
app.post("/videos", (req, res) => {
  const newVideo = req.body;
  videos.push(newVideo);
  res.status(201).json(newVideo);
});
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
