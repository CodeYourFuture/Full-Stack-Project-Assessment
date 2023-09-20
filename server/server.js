

const express = require("express");
const cors = require("cors");
const bodyParser = require ("body-parser");
// const { response } = require("express");
const app = express();
const videosData = require('./exampleresponse.json');






app.use(cors());
app.use(bodyParser.json());


// Function to generate unique ID
function generateUniqueId() {
const timestamp = new Date().getTime();
const randomNumber = Math.floor(Math.random() * 1000);
return `${timestamp}_${randomNumber}`;
}


// Define a route handler for the root URL
app.get("/", (request, response) => {
response.send("Welcome to the Video API!");
});




// 3.### `GET` "/{id}"


// Returns the video with the ID contained within the `{id}` parameter


app.get("/videos/:id", (request, response) => {
const videoId = request.params.id;
const foundVideo = videosData.find(video => video.id === parseInt(videoId));


if (!foundVideo) {
return response.status(404).json({
result: "failure",
message: "video not found",
});
}


response.json(foundVideo);
});




// 1.// Define a Get endpoint to return all videos
app.get("/videos", (request, response) => {
const order = request.query.order || "desc";


let sortedVideos = [...videosData];


if (order === "asc") {
sortedVideos.sort((a, b) => a.rating - b.rating);
} else {
sortedVideos.sort((a, b) => b.rating - a.rating);
}


response.json(sortedVideos);
});




// 4.DELETE` "/{id}"


// // Deletes the video with the ID container within the `{id}` parameter


// // #### Example Response


// // If successful:


// // ```json
// {}
// ```


// if not successful:


// ```json
// {
// "result": "failure",
// "message": "Video could not be deleted"
// }


app.delete("/videos/:id", (request, response) => {
const id = parseInt(request.params.id);
const index = videosData.findIndex(video => video.id === id);


if(index === -1) {
return response.status(404).json({


result: "failure",
message: "Video could not be deleted.",


});
}


videosData.splice(index, 1);
response.json({});
});








// 2.`POST` "/"


// This endpoint is used to add a video to the API.


// Both fields - title and url - must be included and be valid for this to succeed.


// **Note:** When a video is added, you must attach a unique ID to so that it can later be deleted


app.post("/videos", (request, response) => {
const { title, url } = request.body;
// check if both title and url are provided
if(!title || !url) {
return response.status(400).json({
result: "failure",
message: "Both title and url are required"
});
}


// Generate a unique ID
const newId = generateUniqueId();
// Create a new video object
const newVideo = {
id: newId,
title: title,
url: url,
rating: 0
}


videosData.push(newVideo);


response.json({ id: newId });
});
















// app.listen(port, () => console.log(`Listening on port ${port}`));




// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with






// start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
})






//


// app.listen(port, () => console.log(`Listening on port ${port}`));

const express = require("express");
const cors = require("cors");
const bodyParser = require ("body-parser");
const { response } = require("express");
const app = express();
const port = process.env.PORT || 8000;


app.use(cors());
app.use(bodyParser.json());

// app.listen(port, () => console.log(`Listening on port ${port}`));


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./exampleresponse.json");

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

app.get("/videos", (request, response) => {
  const order = request.query.order;


  // Retrieve videos from data source

  let videosData = [...videos];


  // Sort the videos based on 'order' parameter
  if (order === 'asc') {
    videosData.sort((a, b) => a.rating - b.rating);
  } else {
    videosData.sort((a, b) => b.rating - a.rating);
  }

  response.json(videosData);
})

// 1.// `GET` "/"

// This endpoint is used to return all of the videos
// app.get("/videos", (request, response) => {
//   // send a response containing a list of videos
//     response.json(videos);
// });

// 2.`POST` "/"

// This endpoint is used to add a video to the API.

// Both fields - title and url - must be included and be valid for this to succeed.

// **Note:** When a video is added, you must attach a unique ID to so that it can later be deleted

app.post("/videos", (request, response) => {
  const { title, url } = request.body;
// check if both title and url are provided
  if(!title || !url) {
    return response.status(400).json({
      result: "failure",
      message: "Video could not be saved.",
    });
  }

  const id = 1;
  const video = { id, title, url, rating: 0 };
  videos.push(video);

  response.status(201).json({ id });
});

// 3.### `GET` "/{id}"

// Returns the video with the ID contained within the `{id}` parameter

app.get("/videos/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const video = videos.find((video) => video.id === id);

  if (!video) {
    return response.status(404).json({
      result: "failure",
      message: "video could not be saved.",
    });
  }

  response.json(video);
});

// 4.DELETE` "/{id}"

// Deletes the video with the ID container within the `{id}` parameter

// #### Example Response

// If successful:

// ```json
// {}
// ```

// if not successful:

// ```json
// {
//   "result": "failure",
//   "message": "Video could not be deleted"
// }
// ```
app.delete("/videos/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const index = videos.findIndex(video => video.id === id);

  if(index === -1) {
    return response.status(404).json({

      result: "failure",
      message: "Video could not be deleted.",

    })
  }

  videos.splice(index, 1);
  response.json({});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
