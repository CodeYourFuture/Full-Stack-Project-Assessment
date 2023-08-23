const { response } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

let cors = require("cors");
app.use(cors());
app.use(express.json()); // before our routes definition

app.listen(port, () => console.log(`Listening on port ${port}`));

let videos = require("./videosData");

// GET "/"
app.get("/", (req, res) => {
  console.log("Get <----Getting all videos");
  res.status(200).json({videos});
  });

// Post "/:id"
// app.post("/:id", (req, res) => {
//   console.log("POST <---- add a new video route", req.body);
//   const {title, url} = req.body;
//   if(!title || !url){
//   return res.status(404).json({
//   result: "failure",
//   message: "Video could not be saved"
//   })
//   }
//   const id = Date.now();
//   const video = {id, title, url, rating: 0 };
//   videos.push(video);
//   res.status(201).json({id});
//   })

// post/:id
app.post("/:id", (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    res
      .status(400)
      .json({ result: "failure", message: "Video could not be saved" });
  }
  const id = Math.floor(Math.random() * 1000000);
  videos.push({ id, title, url });
  res.json({ id });
});


// GET "/:id"
app.get("/:id", (req, res) => {
  console.log("GET /:id", req.params.id)
  const videoId = Number(req.params.id); 
  const video = videos.find(video => video.id === videoId);
  
  if (!video) {
    return res.status(404).json({ 
      message: "Failed to find the video." 
    });
  }
  res.status(200).json({ video });
});


// Delete the video
// app.delete("/:id", (req, res) => {
//   console.log("Delete /:id", req.params.id);
//   const id = Number(req.params.id);
//   const index = videos.findIndex((video) => video.id === id);
//   if (index === -1) {
//     res.status(404).json({ 
//   result: "failure", 
//   message: "Video could not be deleted" });
//   }
//   videos.splice(index, 1);
//   res.json({});
// })

// Delete the video
app.delete("/:id", (req, res) => {
  console.log("Delete /:id", req.params.id);
  const idToDelete = Number(req.params.id);

  const initialLength = videos.length;

  videos = videos.filter((video) => video.id !== idToDelete);

  if (videos.length === initialLength) {
    res.status(404).json({ 
      result: "failure", 
      message: "Video could not be deleted"
    });
  } else {
    res.json({});
  }
});


