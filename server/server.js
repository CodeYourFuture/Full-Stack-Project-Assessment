const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// GET "/"
app.get("/", (req, res) => {
  //Read example response from file
    const response = JSON.parse(fs.readFileSync('../exampleresponse.json', 'utf8'));
    res.json(response);
  });

  // Helper function to get a video by ID
  function getVideoById(id) {
    // Read example response from file
    const response = JSON.parse(fs.readFileSync('../exampleresponse.json', 'utf8'));
    return response.find(video => video.id === parseInt(id));
  }
  // GET "/{id}"
app.get('/:id', (req, res) => {
  const id = req.params.id;
  // Find the video with the given ID
  const response = getVideoById(id);
  if (response) {
    res.json(response);
  } else {
    res.status(404).json({ result: 'failure', message: 'Video not found' });
  }
});


// Helper function to save a video
function saveVideo(video) {
  // Load existing videos from file
  const response = JSON.parse(fs.readFileSync('../exampleresponse.json', 'utf8'));
  // Add the new video to the response
  response.push(video);
  // Save the updated response to file
  fs.writeFileSync('../exampleresponse.json', JSON.stringify(response));
  return true;
}
// POST "/"
app.post('/', (req, res) => {
  const { title, url } = req.body;
  // Check if both title and url are provided
  if (title && url) {
    // Generate a unique ID for the new video
    const id = generateUniqueId();
    // Save the video to the API or database
    if (saveVideo({ id, title, url })) {
      res.json({ id });
    } else {
      res.status(500).json({ result: 'failure', message: 'Video could not be saved' });
    }
  } else {
    res.status(400).json({ result: 'failure', message: 'Title and URL must be provided' });
  }
});

// Helper function to delete a video by ID
function deleteVideoById(id) {
  // Load existing videos from file
  const response = JSON.parse(fs.readFileSync('../exampleresponse.json', 'utf8'));
  // Find the index of the video with the given ID
  const index = response.findIndex(video => video.id === parseInt(id));
  if (index !== -1) {
    // Remove the video from the response
    response.splice(index, 1);
    // Save the updated response to file
    fs.writeFileSync('../exampleresponse.json', JSON.stringify(response));
    return true;
  }
  return false;
}

// DELETE "/{id}"
app.delete('/:id', (req, res) => {
  const id = req.params.id;
  // Delete the video with the given ID
  if (deleteVideoById(id)) {
    res.json({});
  } else {
    res.status(500).json({ result: 'failure', message: 'Video could not be deleted' });
  }
});

// Helper function to generate a unique ID
function generateUniqueId() {
  // Generate a random 6-digit ID
  return Math.floor(100000 + Math.random() * 900000);
};


app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];
// GET "/"
// app.get("/", (req, res) => {
//  res.send({ express: "Your Backend Service is Running" });
// });
