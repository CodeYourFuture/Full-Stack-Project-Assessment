const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(cors());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const { Client } = require("pg");
const client = new Client({
  
  
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  port: process.env.DBPORT,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
  ssl: true,
});
client.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database");
});
let videos = [
  {
    "id": 523523,
    "title": "Never Gonna Give You Up",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "rating": 23
  },
  {
    "id": 523427,
    "title": "The Coding Train",
    "url": "https://www.youtube.com/watch?v=HerCR8bw_GE",
    "rating": 230
  },
  {
    "id": 82653,
    "title": "Mac & Cheese | Basics with Babish",
    "url": "https://www.youtube.com/watch?v=FUeyrEN14Rk",
    "rating": 2111
  },
  {
    "id": 858566,
    "title": "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    "url": "https://www.youtube.com/watch?v=xbs7FT7dXYc",
    "rating": 11
  },
  {
    "id": 453538,
    "title": "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
    "url": "https://www.youtube.com/watch?v=4As0e4de-rI",
    "rating": 3211
  },
  {
    "id": 283634,
    "title": "Learn Unity - Beginner's Game Development Course",
    "url": "https://www.youtube.com/watch?v=gB1F9G0JXOo",
    "rating": 211
  },
  {
    "id": 562824,
    "title": "Cracking Enigma in 2021 - Computerphile",
    "url": "https://www.youtube.com/watch?v=RzWB5jL5RX0",
    "rating": 111
  },
  {
    "id": 442452,
    "title": "Coding Adventure: Chess AI",
    "url": "https://www.youtube.com/watch?v=U4ogK0MIzqk",
    "rating": 671
  },
  {
    "id": 536363,
    "title": "Coding Adventure: Ant and Slime Simulations",
    "url": "https://www.youtube.com/watch?v=X-iSQQgOd1A",
    "rating": 76
  },
  {
    "id": 323445,
    "title": "Why the Tour de France is so brutal",
    "url": "https://www.youtube.com/watch?v=ZacOS8NBK6U",
    "rating": 73
  }
]
;
app.use(express.json());
// GET "/"
app.get("/", (req, res) => {
  client.query(`SELECT * FROM videos ORDER BY title`, (error, response) => {
    if (!error) {
      res.json(response.rows);
    } else {
      console.log(error.message);
    }
    client.end;
  });
  
  // res.send(videos);
});
// app.post("/", (req, res) => {
//   if (!req.body.field1 || !req.body.field2) {
//     res.status(400).json({
//       result: "failure",
//       message: "Video could not be saved",
//     });
//   }


app.post("/", (req, res) => {
  console.log(req.body);
  const postedTitle = req.body.title;
  console.log(postedTitle);
  const postedUrl = req.body.url;
  console.log(postedUrl);

  client.query("INSERT INTO videos (title, url, rating) VALUES ($1, $2, 0)", [postedTitle, postedUrl])
  .then((result) => {
    res.status(201).json({
      result: "success",
    });
  });
});


app.put("/:videoTitle", (req, res) => {
  const videoTitle = req.params.videoTitle;
  const newRating = req.body.rating;

  if (newRating === null) {
    return res.status(400).json({ message: "Rating cannot be null" });
  }

  client.query("UPDATE videos SET rating = $1 WHERE title = $2", [newRating, videoTitle])
    .then((result) => {
      res.status(200).json({ message: "Rating updated successfully" });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.delete("/:videoTitle", (req, res) => {
  const videoTitle = req.params.videoTitle;

  // Remove the video from your database or data source
  client.query("DELETE FROM videos WHERE title = $1", [videoTitle])
    .then((result) => {
      if (result.rowCount === 0) {
        // If no rows were affected, the video was not found
        res.status(404).json({ message: "Video not found" });
      } else {
        res.status(204).json(); // Return a 204 status for successful deletion
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Internal server error" });
    });
});
