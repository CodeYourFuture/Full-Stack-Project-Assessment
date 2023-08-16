const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // needed to parse JSON data

// Store and retrieve your videos from here
// If you want, you can copy "exampleResponse.json" into here to have some data to work with
let videos = require("./exampleResponse.json");
let videoIdCounter = 6;

// GET "/"
// This endpoint is used to return all of the videos
app.get("/", function (request, response) {
  response.json(videos);
});

// POST "/"
// This endpoint is used to add a video to the API.

//

// GET "/{id}"
// Returns the video with the ID contained within the { id } parameter
app.get("/:id", function (request, response) {
  let selectedVideo = videos.filter(
    (video) => video.id === Number(request.params.id)
  );
  response.status(404).json(selectedVideo);
});

// DELETE "/{id}"
// Deletes the video with the ID container within the {id} parameter
app.delete("/:id", function (request, response) {
  let videoIdDelete = Number(request.params.id);
  const videoIndex = videos.findIndex(({ id }) => id === videoIdDelete);
  if (videoIndex >= 0) {
    videos.splice(videoIndex, 1);
    response.json(videos);
  } else {
    response.status(404).json({ message: "Video not found." });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
