const express = require("express");
const app = express();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
const port = process.env.PORT || 5000;
var cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [
//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "http://www.youtube.com/embed/dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "http://www.youtube.com/embed/HerCR8bw_GE",
//     rating: 230,
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "http://www.youtube.com/embed/FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "http://www.youtube.com/embed/xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "http://www.youtube.com/embed/4As0e4de-rI",
//     rating: 3211,
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "http://www.youtube.com/embed/gB1F9G0JXOo",
//     rating: 211,
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "http://www.youtube.com/embed/RzWB5jL5RX0",
//     rating: 111,
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "http://www.youtube.com/embed/U4ogK0MIzqk",
//     rating: 671,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "http://www.youtube.com/embed/X-iSQQgOd1A",
//     rating: 76,
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "http://www.youtube.com/embed/ZacOS8NBK6U",
//     rating: 73,
//   },
// ];
// GET "/"
app.get("/videos", async (req, res) => {
  const query = "SELECT * FROM videos";
  const result = await pool.query(query);
  res.json(result.rows);
});

app.delete("/deletedvideo/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM videos WHERE id=$1", [id]);
  const allVideos = await pool.query("SELECT * from videos");
  res.json(allVideos.rows);
});

app.post("/api/addnewvideo", async (req, res) => {
  const { title, url, rating } = req.body;
  const selectQuery = "SELECT * FROM videos where title=$1 OR url=$2";
  const insertQuery =
    "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)";

  // pool.query(selectQuery, [title, url]).then((result) => {
  //   if (result.rows.length > 0) {
  //     console.log(result.rows);
  //     return res.status(400).send("This video already exists");
  //   } else {
  //   }
  // });
  await pool.query(insertQuery, [title, url, rating]);

  const allVideos = await pool.query("SELECT * from videos");
  res.json(allVideos.rows);
});

app.get("/api/searchvideos", async (req, res) => {
  const search = req.query.search;
  const selectQuery =
    "SELECT * FROM videos WHERE title ILIKE '%' || $1 || '%' ";

  const videoSearched = await pool.query(selectQuery, [search]);
  if (videoSearched && videoSearched.rowCount > 0) {
    res.status(200).send(videoSearched.rows);
  } else {
    const all = await pool.query("SELECT * FROM videos");
    res.status(404).send(all.rows);
  }

  // const foundVideos = videos.filter((video) =>
  //   video.title.toLowerCase().includes(search.toLowerCase())
  // );
  // if (foundVideos.length !== 0)
  //   res.json(foundVideos);
  // } else {
  //   res.status(400).json({ msg: "no video found" });
  // }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
