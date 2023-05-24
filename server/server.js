const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const onInitialLoad = require('./exampleresponse.json');
app.use(express.json());
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = onInitialLoad;

// GET "/"
app.get("/videos", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send(videos);
});

app.get("/videos/:id", (req,res) => {
  const videosId = request.params.id;
  const eachVideo=videos.find((eachVideo) =>eachVideo.id ===parseInt(videosId));
  eachVideo? res.json(eachVideo) : res.json({message: 'No video matching that Id number. Please check the Id again'});
});

app.delete('/videos/:id', function (request, response) {
  const videosId = request.params.id;
  const eachVideo = videos.find((eachVideo) =>eachVideo.id ===parseInt(videosId));
  if (eachVideo) {
    videos = videos.filter((eachVideo)=> eachVideo.id !== parseInt(videosId));
    response.json({message:'This video is now deleted!'});
  } else {response.json({message:'Unable to locate that id to delete. Please check video id!'})}
})

app.post('/videos/addnew', function(request, response) {
  const addVideo = {
    id: videos.length +1,
    title: request.body.title,
    URL: request.body.url
  };
   if(!addVideo.title || !addVideo.URL) {
    return response.status(400).json({message:'All fields need to be filled'});
   }
   videos.push(addVideo);
   response.json(videos);
});
