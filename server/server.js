const { response, request } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

// to generate unique id (npm i uuid) source express crash course traversy media
const uuid = require("uuid");
// body parser middleware
// body parser middleware. The urlencoded method within body-parser tells body-parser to extract data from the <form> </form> element and add them to the body property in the request object.
app.use(express.json());
app.use(cors());
//node js

// Using body-parser allows you to access req.body from within routes and use that data.
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const videos = require("../client/src/data/exampleresponse.json");

// GET "/" method
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.status(200).json( videos );
});




// task-POST mehtod
// This endpoint is used to add a video to the API.

// Both fields - title and url - must be included and be valid for this to succeed.

// **Note:** When a video is added, you must attach a unique ID to so that it can later be deleted
app.post("/", function (request, response) {
  const newVideoObject = {
    id: uuid.v4(),
    title: request.body.title,
    url: request.body.url,
  };
  const failureObject = {
    result: `failure`,
    messgae: `Video could not be saved`,
  };

  if (!newVideoObject.title || !newVideoObject.url) {
    return response.status(404).json({ failureObject });
  }
  videos.push(newVideoObject);
  response.json(videos);
});

// Task -search by id
// Returns the video with the ID contained within the `{id}` parameter

app.get("/:id", function (request, response) {
  const foundVideo = videos.some(
    (eachVideo) => eachVideo.id === parseInt(request.params.id)
  );

  if (foundVideo) {
    response.json(
      videos.filter((eachVideo) => eachVideo.id === parseInt(request.params.id))
    );
  } else {
    response
      .status(404)
      .json({ message: `No video with the id of ${request.params.id}` });
  }
});
// task -DELETE  method
// Deletes the video with the ID container within the `{id}` parameter

app.delete("/:id", function (request, response) {
  const failureObject = {
    result: `failure`,
    messgae: `Video could not be deleted`,
  };

  const foundVideo = videos.some(
    (eachVideo) => eachVideo.id === parseInt(request.params.id)
  );
  if (foundVideo) {
    response.json({
      deletedVideo: videos.filter(
        (eachVideo) => eachVideo.id === parseInt(request.params.id)
      ),
      message: `Deleted video with the id of ${request.params.id}`,
      newVideoList: videos.filter(
        (eachVideo) => eachVideo.id !== parseInt(request.params.id))
    });
  } else {
    response.status(404).json({ failureObject });
  }
});
