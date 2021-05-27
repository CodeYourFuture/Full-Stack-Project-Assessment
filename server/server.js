const { response } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const Data = require("./Data.json");


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", (req, res) => {
res.json(Data);
});

// POST "/newvideo"
app.use(express.json());
app.post("/newvideo", (req, res) => {
  const addedVideo = req.body;
  if(!(addedVideo.hasOwnProperty('title')) || (!(addedVideo.hasOwnProperty('url')))) {
    res.status(400)
    res.send("Enter Valid title or Url")
  } else {
    Data.push(addedVideo);
  }    
  res.json(Data);
  });

  app.get("/video/:ID", (req, res) => {
    const videoID = req.params.ID;
    const oneVideo = Data.find((obj) => {
      return obj["id"] === parseInt(videoID)
    })
    res.json(oneVideo)
    });

    app.delete("/deleteVideo/:ID", (req, res) => {
      const videoToDelete = req.params.ID;
      console.log(videoToDelete);
      const videoIndex = Data.indexOf((obj) => {
        if(obj["id"] === (videoToDelete)){
          return obj
        }
      }) 
      console.log(videoIndex);
      Data.splice(videoIndex, 1)
      res.send("DELETED");
      if(!videoIndex){
        res.status(400).send("Error");
      }
    });

      
        
  


  app.listen(port, () => console.log(`Listening on port ${port}`));

