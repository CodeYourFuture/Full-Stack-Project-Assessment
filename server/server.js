const express = require("express");
const app = express();
const port = 5000 || process.env.PORT;



// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

const videosFromJson = require("../exampleresponse.json");

let videos = [videosFromJson];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});
app.get("/videos", (req, res) => {
  res.status(200).send(videos);

});
app.post("/videos", function (request, response) {
  console.log(request.body)
  const newVideo = request.body;
  videos.push(newVideo);
  response.status(201).send({ videos })
});

app.listen(port, () => console.log(`Listening on port ${port}`));