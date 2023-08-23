const { response } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

let cors = require("cors");
app.use(cors());
app.use(express.json()); // before our routes definition

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [ 
{
  "id": 523523,
  "title": "Never Gonna Give You Up",
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "rating": 23
},
{
  "id": 523427,
  "title": "The Coding Train",
  "url": "https://www.youtube.com/watch?v=HerCR8bw_GE",
  "rating": 230
},
{
  "id": 82653,
  "title": "Mac & Cheese | Basics with Babish",
  "url": "https://www.youtube.com/watch?v=FUeyrEN14Rk",
  "rating": 2111
},
{
  "id": 858566,
  "title": "Videos for Cats to Watch - 8 Hour Bird Bonanza",
  "url": "https://www.youtube.com/watch?v=xbs7FT7dXYc",
  "rating": 11
}
];

// GET "/"
app.get("/", (req, res) => {
  console.log("Get <----Getting all videos");
  res.status(200).json({videos});
  });

// Post "/:id"
app.post("/:id", (req, res) => {
  console.log("POST <---- add a new video route", req.body);
  const {title, url} = req.body;
  if(!title || !url){
  return res.status(404).json({
  result: "failure",
  message: "Video could not be saved"
  })
  }
  const id = Date.now();
  const video = {id, title, url, rating: 0 };
  videos.push(video);
  res.status(201).json({id});
  })


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
