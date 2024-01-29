const express = require("express");
const app = express();
const port = process.env.DB_PORT || 4000;
const cors = require("cors");

app.use(express.json());
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

console.log("DB Connection String:", pool);

pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", (req, res) => {
  res.send({ express: "Your Backend Service is Running" });
});



app.put("/videos/:id", async (req, res) => {
  const videoId = req.params.id;
  const { rating } = req.body;

  try {
    const updateQuery = "UPDATE videos SET rating = $1 WHERE id = $2";
    const updateValues = [rating, videoId];
    await pool.query(updateQuery, updateValues);

    res.status(200).send("sent");
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


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
    pool.query(query, [newVideoTitle, newVideoURL, newVideoRating])
      .then(() => {
        res.status(201).send("new video created");
      })
      .catch(err => {
        console.log(err);
      })

  }
});




app.delete("/videos/:id", (req, res) => {
  let videoId = parseInt(req.params.id);
  pool.query("DELETE FROM videos WHERE id=$1", [videoId])
    .then(() => {
      pool.query("SELECT * FROM videos")
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
  pool.query("SELECT * FROM videos")
    .then((result) => {
      res.status(200).json(result.rows);
      console.log(result.rows)
    })
    .catch((error) => {
      console.log(error);
      res.status(500)
    });
})

app.get("/videos/:id", (req, res) => {
  let videoId = parseInt(req.params.id)
  pool.query("SELECT * FROM videos WHERE id = $1", [videoId])
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
