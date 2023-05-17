const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const initialData = require("./exampleresponse.json");
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = initialData;

// GET "/"
app.get("/videos", (request, response) => {
  response.send(videos);
});

app.get("/videos/:id", function (request, response) {
  const videosId = request.params.id;
  const eachAddedVideo = videos.find(
    (eachAddedVideo) => eachAddedVideo.id === parseInt(videosId)
  );
  eachAddedVideo
    ? response.json(eachAddedVideo)
    : response.json({message: "There're no videos matching your request" });
});

app.post("/videos/addnew", function (request, response) {
  const addNewVideo = {
    id: videos.length + 1,
    title: request.body.title,
    URL: request.body.url
  };

  if (
    !addNewVideo.title ||
     !addNewVideo.URL
  ) {
    return response
      .status(400)
      .json({ message: "Please fill out the required areas" });
  }
 

  videos.push(addNewVideo);
  response.json(videos);
});
