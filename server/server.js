const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", (req, res) => {
  res.json(videos); // Return all videos as JSON response
});

//GET "/{id}"
app.get("/:id", (req, res) => {
  const id = req.params.id;
  const video = videos.find((video) => video.id === parseInt(id));
  if (!video) {
    return res
      .status(404)
      .json({ result: "failure", message: "Video not found" });
  }

  res.json(video);
});

// Post "/"
app.post("/", (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res
      .status(400)
      .json({ result: "failure", message: "Video could not be saved" });
  }

  const id = generateUniqueId();
  videos.push({ id, title, url });
  res.json({ id });
});

 //DELETE "/{id}"
 app.delete("/:id", (req, res) => {
   const id = req.params.id;
   const index = videos.findIndex((video) => video.id === parseInt(id));

   if (index === -1) {
     return res
       .status(404)
       .json({ result: "failure", message: "Video not found" });
   }
   videos.splice(index, 1);
   res.json({});
 });

 // id

function generateUniqueId() {
  return Math.floor(Math.random() * Date.now());
}
