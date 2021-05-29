// const fs = require('fs');
const express = require("express");
const app = express();


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./videos.json");

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

  next();
});


// GET "/"
app.get("/videos", (req, res) => {
  res.status(200).json({
    status: 'success',
    results: videos.length,
    data: {
      videos
    }
  });
});

// ADDING VIDEOS 
app.post("/videos", (req, res) => {
  let newVideo = req.body;

  if (
    // !newVideo.id ||
    !newVideo.title ||
    !newVideo.url

  ) {
    res.status(400);
    res.send("Please fill in all fields");
  } else if (videos.find((video) => video.id === newVideo.id)) {
    res.status(400);
    res.send("Video already exists");
  } else {
    newVideo.id = Math.floor(Math.random() * 100);
    newVideo.rating = 0;
    videos.push(newVideo);
    res.status(201);
    console.log(newVideo);
    res.send(newVideo);
  }

});



//Delete a video by an id
app.delete("/videos/:id", (req, res) => {
  const index = videos.findIndex((video) => video.id === parseInt(req.params.id)
  );
  console.log(req.params.id)
  if (index >= 0) {
    videos.splice(index, 1);
    return res.json(videos)
  } else {
    res.status(404).send('The video requested to be deleted does not exist');
  }
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
