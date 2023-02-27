const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const localVideosFile = require("../exampleresponse.json");

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET "/"
app.get("/", (request, response) => {
  // Delete this line after you've confirmed your server is running
  console.log(request.body);
  response.send({ express: "Your Backend Service is Running" });
});


app.get("/:id", (request, response) => {
  // Delete this line after you've confirmed your server is running
  // console.log(request.body);
  const returnVideo = localVideosFile.filter(video => video.id == request.params.id)
  response.json(returnVideo);
});

app.post("/", (request, response) => {
  const body = request.body;

  if (body["title"] && body["url"]) {
    localVideosFile.push({
      id: Math.floor(Math.random() * 100000),
      title: body["title"],
      url: body["url"],
    });
    console.log(localVideosFile[localVideosFile.length - 1]);
    response.json(localVideosFile[localVideosFile.length - 1].id);
  } else {
    response.json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
  // response.json("body");
});


app.delete("/:id", (request, response) => {
  // Delete this line after you've confirmed your server is running
  console.log(request.body);
  let videoArrayLengthBefore = localVideosFile.length;
  const returnVideo = localVideosFile.filter((video, index) => {
    if (video.id == request.params.id) { 
      localVideosFile.splice(index,1);
    }
  }
  );
  if (videoArrayLengthBefore === localVideosFile.length) {
    response.json({
      result: "failure",
      message: "Video could not be deleted",
    });

  } else {
    console.log(localVideosFile);
    response.json("DELETED");
  }
});