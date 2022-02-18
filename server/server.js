const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { Pool } = require('pg');

const pool = new Pool({
  user: 'cvzfmgkjyqnhgb',
  host: 'ec2-34-255-21-191.eu-west-1.compute.amazonaws.com',
  database: 'df9q5i3jod9a7a',
  password: 'e948018709006b206c5041198abceb6e6d0887819331ce7b6b31c4c5bf7ebfbd',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  }

})

app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({
//   extended: true,
// }));


app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = require("./exampleresponse.json");
//const { query, json } = require("express");

// GET "/"
app.get("/", (req, res) => {
  // res.json(videos);
  pool
  .query("SELECT * FROM videos")
  .then((result) => res.json(result.rows))
  .catch((error) => {
    console.error(error);
    res.status(500).json(error);
  })
  
});

//POST
app.post("/", (req, res) => {
  const newTitle = req.body.title;
  const newUrl = req.body.url;
  const newRating = +req.body.rating;

  if (!Number.isInteger(newRating)) {
    res.status(400).send("Rating value must be an integer!")
  }
  pool
  .query("SELECT * FROM videos WHERE url=$1 OR title=$2", [newUrl, newTitle])
  .then((result) => {
    if (result.rows.length > 0) {
      res.status(400).send("Video or title already exist on page!")
    } else {
      const query = "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)";
      
     pool
      .query(query, [newTitle, newUrl, newRating])
      .then(() => res.send("Video added successfully!"))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
    }
  });
});
/* -- Below are week2's codes --
  const videoId = Math.floor(Math.random() * 10000);
  const newVideo = {
    id: videoId,
    title: req.body.title,
    url: req.body.url
  };
  if (videos.find(video => {
    if (video.title === newVideo.title || video.url === newVideo.url) {
      return true;
    }
  })) 
  {
    res.status(409).send({msg: "Video title or video already exist!"})
  }
  else if (newVideo.title && newVideo.url.includes("https://www.youtube.com/watch?v=")) {
    videos.push(newVideo);
    res.status(201).json({
      msg: "Video added successfully!",
      id: newVideo.id
    })
  } else {
    res.status(400).json({
      result: "Failure",
      msg: "Video title blank or url incorrect!"
    })
  }

*/

//GET "/{id}" To retrieve a video by its id

app.get("/:id", (req, res) => {
  const videoId = +req.params.id;

  pool
  .query("SELECT id FROM videos WHERE id=$1", [videoId])
  .then((result) => {
    if (result.rows.length > 0) {
      pool
      .query("SELECT * FROM videos WHERE id=$1", [videoId])
      .then((response) => res.json(response.rows))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
    } else {
      res.status(400).send("Video id does not exist!")
    }
  });

  /* -- Week2's codes --
  if (videos.some(video => video.id === videoId)) {
    const targetVideo = videos.find(video => video.id === videoId);
    res.status(200).json({targetVideo});
  } else {
    res.status(400).json({msg: "Video with this id NOT found!"})
  }
  */
})

//DELETE "/{id}"

app.delete("/:id", (req, res) => {
  const videoId = +req.params.id;
  
  pool
  .query("SELECT id FROM videos WHERE id=$1", [videoId])
  .then((result) => {
    if (result.rows.length > 0) {
      pool
      .query("DELETE FROM videos WHERE id=$1", [videoId])
      .then(() => res.status(200).send("Video deleted successfully!"))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      })
    } else {
      res.status(400).send("Video id did not match!")
    }
  });

  /* -- Week2 codes --
  if (videos.some(video => video.id === videoId)) {
    const indexOfVideo = videos.findIndex((video => video.id = videoId));
    videos.splice(indexOfVideo, 1);
    res.status(200).json({msg: "Video removed successfully!"});
  } else {
    res.status(400).json({
      result: "Failure",
      message: "Video could not be deleted!"
    })
  }
  */
})