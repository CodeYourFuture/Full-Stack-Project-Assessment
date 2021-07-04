const express = require("express");
const cors = require('cors');
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

const pool = new Pool({
  user: "sgigrkxfdedklm",
  host: "ec2-54-74-35-87.eu-west-1.compute.amazonaws.com",
  database: "d8ipr96el7ck55",
  password: "72123144b0518f6d367c61e678b366d28a4982b6176550d4d9ef4348ce0e06c0",
  ssl: {
    rejectUnauthorized: false,
  },
  port: 5432,
});

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];
let videos = require("./data/exampleresponse.json");


// GET "/" This endpoint is used to return all of the videos.
//  app.get("/", (req, res) => {
//    res.send({videos});
//  });


app.get("/", function (req, res) {
  pool.query("SELECT * FROM videos ORDER BY rating desc", (db_err, db_res) => {
    if (db_err) {
      res.send(JSON.stringify(db_err));
    } else {
      res.json(db_res.rows);
    }
  });
});

// POST with pool
app.post("/", (req, res) => {
  const newVideoTitle = req.body.title;
  const newVideoUrl = req.body.url;  
  const newVideoRating = 0;

  const matchYoutubeUrl = (url) => {
    const p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return url.match(p)[1];
    }
    return false;
  };
  const errorMessage = {
    result: "failure",
    message: "Video could not be saved",
  };

  if (!newVideoTitle || !newVideoUrl) {
    return res.status(400).send("Please fill all the fields!!");
  } else if(!matchYoutubeUrl(newVideoUrl)) {
    res.status(400).send(errorMessage);
  }

  pool
    .query("SELECT * FROM videos WHERE title=$1", [newVideoTitle])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("A video with the same title already exists!");
      } else {
        const videoQuery =
          "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)";
        pool
          .query(videoQuery, [newVideoTitle, newVideoUrl, newVideoRating])
          .then(() => res.send("Video added!"))
          .catch((e) => res.send(JSON.stringify(e)));
      }
    })
    .catch((e) => res.send(JSON.stringify(`catch error ${e}`)));
});





// GET "/{id}" Returns the video with the ID contained within the {id} parameter
app.get("/:id", (req, res) => {
  const videoId= parseInt(req.params.id);
  const requestedVideo = videos.find(video => video.id === videoId);
  if(!requestedVideo){
    res.status(404).send(`Video with the Id: ${videoId} not found`)
  } 
    res.status(201).send(requestedVideo);
});

// DELETE "/{id}" Deletes the video with the ID container within the {id} parameter
app.delete("/:id", (req, res) => {
  const videoId= parseInt(req.params.id);
  const errorMessage = {
    "result": "failure",
    "message": "Video could not be deleted"
  };
  const deletedVideo = videos.findIndex(video => video.id === videoId);
  if(deletedVideo >= 0 ) {
    videos.splice(deletedVideo, 1);
    res.status(200).send(`Video with the id: ${videoId} has been deleted`);
  } 
    res.status(404).send(errorMessage);
});

// POST "/" This endpoint is used to add a video to the API. 
// Both fields - title and url - must be included and be valid for this to succeed.
// app.post("/", (req, res) => {
//   const newVideo = req.body;
//   newVideo.id = Math.floor(Math.random()*1000000);
//   newVideo.rating = 0;

//   const matchYoutubeUrl = ((url) => {
//     const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
//     if (url.match(p)) {
//         return url.match(p)[1];
//         } return false;
//   })
//   const errorMessage = {
//     "result": "failure",
//     "message": "Video could not be saved"
//   };

//   if(!newVideo.title || !matchYoutubeUrl(newVideo.url)){
//     res.status(400).send(errorMessage);
//   }  else {
//     videos.push(newVideo);    
//     res.status(201).send(videos); 
//   };  
        
// });