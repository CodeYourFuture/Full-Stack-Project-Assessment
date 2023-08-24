const { response } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

let videos = require("./videosData.json")

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.json({ videos });
});

//GET BY ID
app.get("/:id", (req, res) => {
  console.log("res.json <----Get by ID")
  const idToFind = Number(req.params.id);
  const video = videos.find((v) => v.id === idToFind);
  res.status(200).json({ video });
})

// Delete BY ID
app.delete('/:id', (req, res) => {
  console.log(req.params.id, "Delete by ID")
  const deletedVideo = Number(req.params.id);
  const videoToDelete = videos.find((v) => v.id === deletedVideo);
  if(!videoToDelete){
    res.status(404).json({
      "result": "failure",
      "message": "Video could not be deleted"
    })
  }
  return res.status(200).json({})
 
});

// POST A VIDEO TO THE API
app.post('/:id', (req, res) => {
  console.log(req.body, " <---- Add a new video to the API");
  const {title, url} = req.body;
  if(!title || !url){
    response.status(404).json({
      "result": "failure",
      "message": "Video could not be saved"
    })
  }
 
  const id = Math.floor(Math.random() * 1000000);
  videos.push({ id, title, url, rating: 0 });
  res.json({ id });
})
