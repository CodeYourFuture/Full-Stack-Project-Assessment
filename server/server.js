const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
// This endpoint is used to return all of the videos
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

// POST "/"
// This endpoint is used to add a video to the API.

// GET "/{id}"
// Returns the video with the ID contained within the { id } parameter

// DELETE "/{id}"
// Deletes the video with the ID container within the {id} parameter
