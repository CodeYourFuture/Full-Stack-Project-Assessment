const express = require("express");
const app = express();
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
const { Pool } = require("pg");

const db = new Pool({
  host: "localhost",
  user: "mickeyhaile",
  port: 5432,
  password: "",
  database: "cyf_videos",
});


// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});
app.get("/videos", (request, response) => {
 db.query("SELECT * FROM videos")
   .then((result) => {
     response.status(200).json({ videos: result.rows });
   })
   .catch((err) => {
     console.log(err);
   });

 
  
});

app.get("/:id", (request, response) => {
   const videoId = parseInt(req.params.id);
   db.query('SELECT * FROM videos WHERE id = $1', [videoId])
     .then((result) => {
       response.status(200).json(result.rows);
     })
     .catch((error) => {
       console.log(error);
     });
  // const id = request.params.id;
  // const findEl = videos.find((el) => Number(el.id) === Number(id));
  // response.send(findEl);
});
app.post("/", (req, res) => {
  if (req.body.title.trim() === "" || req.body.url.trim() === "") {
    res.status(400).json({ message: "Please fill all the fields" });
    return;
  }
  const newVideos = {
    //creating id for the new booking
    id: Math.max(...Videos.map((video) => video.id), 0) + 1,
    title: req.body.title,
    url: req.body.url,
    rating: 0,
  };
  videos.push(newVideos);
  res.status(201).json(videos);
});
app.delete("/:id", (request, response) => {
  const videoTodelete = parseInt(req.params.id);
  db.query('DELETE * FROM videos WHERE id = $1', [videoTodelete])
    .then((result) => {
      response.status(200).send("Video deleted successfully");
    })
    .catch((error) => {
      console.log(error);
    });
  // const id = request.params.id;
  // const findEl = videos.find((el) => Number(el.id) === Number(id));
  // if (findEl) {
  //   videos = videos.filter((el) => Number(el.id) !== Number(id));
  //   response.send(videos);
  // } else {
  //   response.status(400).json({
  //     result: "failure",
  //     message: "Video could not be deleted",
  //   });
  // }
});
