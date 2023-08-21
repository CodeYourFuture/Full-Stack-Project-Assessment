const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// cors
let cors = require("cors");
app.use(cors());

// to parse incoming requests with JSON payloads
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const videos = require("./exampleresponse.json");

// GET "/"
// Returns all the videos
app.get("/", (request, response) => {
  response.json(videos);
});

// Returns video with specific id
app.get("/videos/:id", (request, response) => {
  let id = Number(request.params.id);
  response.json(videos.filter((video) => video.id === id));
});

// POST
// This endpoint is used to add a video to the API.
// Both fields - title and url - must be included and be valid for this to succeed.
// **Note:** When a video is added, you must attach a unique ID to so that it can later be deleted
app.post("/", (request, response) => {
  const { title, url } = request.body;

  if (!title || !url) {
    return response.status(400).json({
      result: "failure",
      message: "Video could not be saved, add a title or url",
    });
  } else {
    const calculateNewID = () => {
      let newID = Math.max(...videos.map((video) => video.id)) + 1;
      return newID;
    };

    const newVideo = {
      id: calculateNewID(),
      title: title,
      url: url,
      rating: 0,
    };
    videos.push(newVideo);
    response.status(201).json({
      id: newVideo.id,
      message: "Video was saved",
    });
  }
});

// DELETE
// Deletes the video with the ID container within the `{id}` parameter
app.delete("/videos/:id", (request, response) => {
  const id = Number(request.params.id);

  const videoToDelete = videos.find((video) => video.id === id);

  if (videoToDelete === undefined) {
    response.status(401).json({
      result: "failure",
      message: "Video could not be found",
    });
  } else {
    // get the index of the video object that we want to delete
    const index = videos.indexOf(videoToDelete);

    // use splice to delete -- video array will be mutated
    videos.splice(index, 1);

    response.status(201).json({
      message: "Video was deleted",
    });
  }
});
