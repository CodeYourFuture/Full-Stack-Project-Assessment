const { response } = require("express");
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const Data = require("./Data.json");
app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", (req, res) => {
  // const searchedValue = req.query
res.json(Data);
});

// POST "/newvideo"
app.use(express.json());
let videoVoteCount = 1;
let rating = 0;
app.post("/", (req, res) => {
  const addedVideo = req.body;
  const newVideoKeys = ["title", "url"];
  const urlValidation = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/;
  newVideoKeys.filter((newVideoKey) => {
    if((addedVideo.hasOwnProperty(newVideoKey)) && (!(addedVideo[newVideoKey].toString().trim() === "")) && addedVideo["url"].match(urlValidation)){
      const newVideoToAdd = {
        "id": videoVoteCount++,
        "title": addedVideo["title"],
        "url": addedVideo["url"],
        "rating": rating
      }
      Data.push(newVideoToAdd)
      res.json({
        "id": newVideoToAdd["id"]
      })
    } else {
        res.status(400)
        res.json({
          "result": "failure",
          "message": "Video could not be saved"
        })
      }
  })
    
  });

  app.get("/:ID", (req, res) => {
    const videoID = req.params.ID;
    const oneVideo = Data.find((obj) => {
      return obj["id"] === parseInt(videoID)
    })
    res.json(oneVideo)
    });

    app.delete("/:ID", (req, res) => {
      const videoToDelete = req.params.ID;
      const videoIndex = Data.findIndex((obj) => {
        return(obj["id"] === parseInt(videoToDelete))
      })      
      if(videoIndex === -1){
        res.status(400).send("Error");
      }else{
        Data.splice(videoIndex, 1)
        res.send("DELETED");
      }
    });

      
        
  


  app.listen(port, () => console.log(`Listening on port ${port}`));

