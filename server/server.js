const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const videos = require("./exampleresponse.json");

app.listen(port, () => console.log(`Listening on port ${port}`));

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

// GET "/videos"
app.get("/videos", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send(videos);
});

// POST "/videos"
app.post("/videos", (req, res) => {
  const newVideo = req.body;
  newVideo.id = videos.length + 1;
  videos.push(newVideo);
  res.status(201).send(newVideo);
});
