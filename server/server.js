const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const initialData = require("./exampleresponse.json");
app.use(express.json());
app.use(
  cors({
    origin: "*"
  })
);

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = initialData;

// GET "/"
app.get("/videos", (request, response) => {
  response.send(videos);
});

app.get("/videos/:id", function (request, response) {
  const videosId = request.params.id;
  const eachVideo = videos.find(
    (eachVideo) => eachVideo.id === parseInt(videosId)
  );
  eachVideo
    ? response.json(eachVideo)
    : response.json({message: "There're no videos matching your request" });
});

app.delete("/videos/:id", function (request, response) {
  const videosId = request.params.id;
  const eachVideo = videos.find(
    (eachVideo) => eachVideo.id === parseInt(videosId)
  );

  if (eachVideo) {
    videos = videos.filter(
      (eachVideo) => eachVideo.id !== parseInt(videosId)
    );
    response.json({ message: "Video Succesfully deleted" });
  } else {
    response.json({ message: "Unable to find or delete video" });
  }
});

app.post("/videos/addnew", function (request, response) {
  const addNewVideo = {
    id: videos.length + 1,
    title: request.body.title,
    url: request.body.url,
    rating: 0
  };

  if (
    !addNewVideo.title ||
     !addNewVideo.url
  ) {
    return response
      .status(400)
      .json({ message: "Please fill out the required areas" });
  }
 

  videos.push(addNewVideo);
  response.json(videos);
});


app.listen(port, () => console.log(`Listening on port ${port}`));
