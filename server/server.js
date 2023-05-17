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

// app.post("/", (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   res.send(videos);
// });

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
