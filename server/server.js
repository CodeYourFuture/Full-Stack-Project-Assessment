const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors');
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
app.use(cors())
app.use(express.json())

// const videos = require ("./data.json")
// console.log(videos);

const pool = new Pool({
  connectionString: process.env.DB_URL, // Connection URL for connecting to the PostgreSQL database
  ssl: {
    rejectUnauthorized: false, // Disabling SSL/TLS certificate verification (for development purposes only)
  },
});

// let videos = [];
// GET "/"
// app.get("/", (req, res) => {
//   const query = `SELECT * FROM videos`;
//   const result = pool.query(query);
//   const videos = result.rows;
//   res.json(videos);
// });
/*************** Create Video */
// app.post("/", (req, res) => {
  // const newVideo = {
  //   title: req.body.title,
  //   url: req.body.url,
  //   rating: 0
  // };
  // const { title, url } = req.body;
  // const rating = 0;
  // const query =
  //   "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3) RETURNING *";

  // const values = [title, url, rating];
  // const result = pool.query(query, values);
  // const newVideo = result.rows[0];
  
  // res.status(201).json(newVideo);

  // if (!newVideo.title || !newVideo.url) {
  //   res.status(404).json({ message: "Fill in all fields" })
  // } else {
  //   videos.push(newVideo);
  //   res.status(200).json({ message: "New video added", videos })
  // }
// });

app.get("/", async (req, res) => {
  try {
    const query = `SELECT * FROM videos`;
    const result = await pool.query(query);
    const videos = result.rows;
    res.json(videos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/", async (req, res) => {
  try {
    const { title, url } = req.body;
    const rating = 0;
    const query =
      "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3) RETURNING *";
    const values = [title, url, rating];
    const result = await pool.query(query, values);
    const newVideo = result.rows[0];
    res.status(201).json(newVideo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});
/******************* Get Video with Id */
// app.get("/:id", (req, res) => {
//   const newId = Number(req.params.id);
//   const foundVideo = videos.find(el => el.id === newId);
//   console.log(foundVideo);
//   res.status(200).json(foundVideo);

// });
/******************** Delete The Video */
// app.delete("/:id", (req, res) => {
//   const newId = Number(req.params.id);
//   const foundVideo = videos.findIndex(el => el.id === newId);
//   const videoToDelete = videos.find(el => el.id === newId)
//   console.log(videoToDelete);
//   videos.splice(videoToDelete, 1);
//   res.status(200).json(videos);

// });
//******************************* */

app.listen(port, () => console.log(`Listening on port ${port}`));
