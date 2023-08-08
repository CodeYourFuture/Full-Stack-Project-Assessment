const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

const pool = new Pool({ 
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },
// ];

// GET root
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

  // GET 
app.get("/videos", async (req, res) => {
  try {
    const query = `SELECT * FROM videos`;
    const result = await pool.query(query);
    const videos = result.rows;
    res.json(videos);
  } catch (error) {
    res.status(500).json({err: "fetching error"})
  }
  
});

// POST 
app.post("/videos", async(req, res) => {
  try {
    const { title, url } = req.body;
    const rating = 0;
    const query ="INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3) RETURNING *";
    const values = [title, url, rating]; 
    const result = await pool.query(query, values); 
    const newVideo = result.rows[0]; 

    res.status(201).json(newVideo); 
  } catch (error) {
    console.error("Error creating video:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the video" }); 
  
  }
  
});

// DELETE 
app.delete("/videos/:id", async (req, res) => {
  try {
    const videoId = req.params.id; 

    const query = "DELETE FROM videos WHERE id = $1 RETURNING *"; 
    const values = [videoId]; 
    const result = await pool.query(query, values); 
    const removedVideo = result.rows[0]; 

    if (removedVideo) {
      res.json(removedVideo); 
    } else {
      res.status(404).json({ message: "Video not found" }); 
    }
  } catch (error) {
    console.error("Error deleting video:", error);
    res
      .status(500)
      .json({ error: "deleting error" }); 
  }
});

app.put("/videos/:id/rating", async (req, res) => {
  try {
    const videoId = req.params.id; 
    const { rating } = req.body; 

    const query = "UPDATE videos SET rating = $1 WHERE id = $2"; 
    const values = [rating, videoId]; 
    await pool.query(query, values); 

    res.json({ message: "Rating Updated" }); 
  } catch (error) {
    console.error("Error updating rating:", error);
    res
      .status(500)
      .json({ error: "Updating err" }); 
  }
});