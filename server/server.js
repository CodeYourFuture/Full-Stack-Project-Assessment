/*
  notes for help:
  -Only the first endpoint has been written for live data
  -I believe my issue is very much related to how I'm using my pool and
  .env, I've tried a fe different ones and now this way is making my local
  server use the heroku port.
*/

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const postgres = require("pg");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

const pool = new postgres.Pool({
  user: process.env.User,
  host: process.env.Host,
  database: process.env.Database,
  password: process.env.Password,
  port: process.env.Port,
});

// retrieve a video matching the provided ID
app.get("/:videoId", (req, res) => {
  pool.connect().then((client) => {
    const id = parseInt(req.params.videoId);
    return client
      .query(
        `SELECT * FROM videos WHERE ID=$1`,
        [id]
      )
      .then((result) => {
        client.release();
        res.send(result.rows);
      })
      .catch((error) => {
        console.error(error);
        res.status(error.status).send(error)
      })
  })
  
})

// retrieve all videos
app.get("/", (req, res) => {
  res.send(videos);
});

// add a video providing a title and URL
app.post("/", (req, res) => {
  const body = req.body;
  const bKeys = Object.keys(body);
  if(bKeys.includes("title") && bKeys.includes("url")){
    //template video
    const thisVid = { id:0, title:"", url:"" };
    let id = videos.length;
    const checkId = () => {
      //if id exists
      if (
        videos.find((video) => {
          video.id = id;
        }) !== undefined
      ) {
        id++;
        //check again
        checkId();
      }
    };
    //create the video and push to data bank
    thisVid.id = id;
    thisVid.title = body.title;
    thisVid.url = body.url;
    videos.push(thisVid);
    res.send(`Successfully added your video with ID: ${id}`);
  }
  else{
    res.status(400).send("Unsuccessful request");
  }
})

app.delete("/:videoId", (req, res) => {
  const id = parseInt(req.params.videoId);
  const video = videos.find((vid) => vid.id === id);
  const index = videos.findIndex((vid) => vid.id === id);
  console.log(`\
              id: ${id}
              video: ${video}
              index: ${index}`
            );
  if (video) {
    videos.splice(index,1);
    res.send(`Deleted video with ID: ${id}, title: ${video.title}`);
  } else {
    res.status(400).send("ID not found.");
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`));
