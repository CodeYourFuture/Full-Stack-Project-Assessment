const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [
  {
    id: 523523,
    title: "Never Gonna Give You Up",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: 23,
  },
  {
    id: 523427,
    title: "The Coding Train",
    url: "https://www.youtube.com/embed/HerCR8bw_GE",
    rating: 230,
  },
  {
    id: 82653,
    title: "Mac & Cheese | Basics with Babish",
    url: "https://www.youtube.com/embed/FUeyrEN14Rk",
    rating: 2111,
  },
  {
    id: 858566,
    title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    url: "https://www.youtube.com/embed/xbs7FT7dXYc",
    rating: 11,
  },
  {
    id: 453538,
    title:
      "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
    url: "https://www.youtube.com/embed/4As0e4de-rI",
    rating: 3211,
  },
  {
    id: 283634,
    title: "Learn Unity - Beginner's Game Development Course",
    url: "https://www.youtube.com/embed/gB1F9G0JXOo",
    rating: 211,
  },
  {
    id: 562824,
    title: "Cracking Enigma in 2021 - Computerphile",
    url: "https://www.youtube.com/embed/RzWB5jL5RX0",
    rating: 111,
  },
  {
    id: 442452,
    title: "Coding Adventure: Chess AI",
    url: "https://www.youtube.com/embed/U4ogK0MIzqk",
    rating: 671,
  },
  {
    id: 536363,
    title: "Coding Adventure: Ant and Slime Simulations",
    url: "https://www.youtube.com/embed/X-iSQQgOd1A",
    rating: 76,
  },
  {
    id: 323445,
    title: "Why the Tour de France is so brutal",
    url: "https://www.youtube.com/embed/ZacOS8NBK6U",
    rating: 73,
  },
];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

app.get("/videos", async (req, res) => {
  try {
    const query = "SELECT * FROM videos";
    const result = await pool.query(query); //seconde query can be anything
    const orderedVideos = result.rows;
    res.status(200).json(orderedVideos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "ERROR" });
  }
});

app.post("/videos", async (req, res) => {
  try {
    const { title, url } = req.body;
    const rating = 0;
    const query =
      "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3) RETURNING *";
    const values = [title, url, rating];
    const result = await pool.query(query, values);
    const addVideo = result.rows[0]; //each new video will come at the top of the table
    res.status(201).json(addVideo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "ERROR" });
  }
});

app.delete("/video/:id", async (req, res) => {
  try {
    const videoId = Number(req.params.id);
    const query = "DELETE FROM videos WHERE id = $1 RETURNING *";
    const values = [videoId];
    const result = await pool.query(query, values);
    const deleteVideo = result.rows[0];

    if (deleteVideo) {
      res.status(200).json(deleteVideo);
    } else {
      res.status(404).json({ message: "video not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "ERROR" });
  }
});

app.put("/videos/:id/rating", async (req, res) => {
   try {
     const videoId = Number(req.params.id);
     const { rating } = req.body;
     const query = "UPDATE videos SET rating = $1 WHERE id = $2"
     const values = [rating, videoId]
     await pool.query(query, values)
     res.status(200).json({ message: "update successful" })
   }
   catch (error) {
    console.log(error);
    res.status(500).json({ error: "ERROR" });
   }
 }) 