const express = require("express");
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;
// const AllVideos = require("")
const cors = require("cors");
// const short = require('short-uuid');
// const translator = short("12345")
app.use(express.json());
app.use(cors());

const { Pool } = require("pg");
const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  // ssl: true
});

// db.connect(function (err) {
//   if (err) {
//     return console.error('error: ' + err.message);
//   }
//   console.log('Connected to the postgresSQL server.');
// });



const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = AllVideos;

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});



app.put("/videos/:id", async (req, res) => {
  const videoId = req.params.id;
  const { rating } = req.body;

  try {
    const updateQuery = "UPDATE videos SET rating = $1 WHERE id = $2";
    const updateValues = [rating, videoId];
    await db.query(updateQuery, updateValues);

    res.status(200).send("sent");
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// app.put("/videos/:id", async (req, res) => {
//   const videoID = req.params.id;
//   try {
//     const video = await db.query("UPDATE videos SET rating = rating + 1 WHERE id=$1", [videoID]);
//     if (!video) {
//       res.status(404).send("Video not found");
//       console.log("There is no video with this ID!");
//     } else {
//       res.status(200).send("Video updated");
//     }
//   } catch (error) {
//     console.error("Error updating video:", error);
//     res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// });


app.post("/videos", (req, res) => {
  let newVideoTitle = req.body.title
  let newVideoURL = req.body.url
  let newVideoRating = 0

  if (!newVideoTitle) {
    res.status(400).send("Title field is missing");
  } else if (!newVideoURL) {
    res.status(400).send("URL field is missing");
  } else if (!newVideoTitle && !newVideoURL) {
    res.status(400).send("Both title and URL fields are missing");
  } else {
    const query =
      `INSERT INTO videos (title, url, rating)
    VALUES ($1, $2, $3)`;
    db.query(query, [newVideoTitle, newVideoURL, newVideoRating])
      .then(() => {
        res.status(201).send("new video created");
      })
      .catch(err => {
        console.log(err);
      })
    // newVideo.id = (translator.generate()).slice(4, 10)
    // videos.push(newVideo)
    // res.send(videos)
  }
});




app.delete("/videos/:id", (req, res) => {
  let videoId = parseInt(req.params.id);
  db.query("DELETE FROM videos WHERE id=$1", [videoId])
    .then(() => {
      db.query("SELECT * FROM videos")
        .then((result) => res.json(result.rows))
        .catch((err) => {
          console.error("Error fetching videos:", err);
          res.status(500).json({ error: "Internal server error" });
        });
    })
    .catch((err) => {
      console.error("Error deleting video:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});


app.get("/videos", (req, res) => {
  db.query("SELECT * FROM videos")
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.status(500)
    });
})

app.get("/videos/:id", (req, res) => {
  let videoId = parseInt(req.params.id)
  db.query("SELECT * FROM videos WHERE id = $1", [videoId])
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows)
    })
    .catch((error) => {
      console.log(error);
    });
})

// const deleteVideoByID = (videos, id) => {
//   let videoI = videos.findIndex((video) => video.id == id);
//   if (videoI > -1) {
//     videos.splice(videoI, 1)
//   }
//   return videos

// }
