const express = require("express");
const app = express();
const port = process.env.PORT || 3006;
const cors = require("cors");

app.use(cors());
const isUrl = require("is-url");
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});
app.use(express.json());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [
  {
    id: 523523,
    title: "Never Gonna Give You Up",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 23,
  },
  {
    id: 523427,
    title: "The Coding Train",
    url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
    rating: 230,
  },
  {
    id: 82653,
    title: "Mac & Cheese | Basics with Babish",
    url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
    rating: 2111,
  },
  {
    id: 858566,
    title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
    rating: 11,
  },
  {
    id: 453538,
    title:
      "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
    url: "https://www.youtube.com/watch?v=4As0e4de-rI",
    rating: 3211,
  },
  {
    id: 283634,
    title: "Learn Unity - Beginner's Game Development Course",
    url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
    rating: 211,
  },
  {
    id: 562824,
    title: "Cracking Enigma in 2021 - Computerphile",
    url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
    rating: 111,
  },
  {
    id: 442452,
    title: "Coding Adventure: Chess AI",
    url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
    rating: 671,
  },
  {
    id: 536363,
    title: "Coding Adventure: Ant and Slime Simulations",
    url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
    rating: 76,
  },
  {
    id: 323445,
    title: "Why the Tour de France is so brutal",
    url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
    rating: 73,
  },
];

// GET "/"
app.get("/videos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM videos ORDER BY id");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch videos" });
  }
});

app.get("/videos/:id", function (req, res) {
  let id = Number(req.params.id);
  db.query("SELECT * FROM videos WHERE id = $1", [id])
    .then((result) => {
      console.log(result.rows[0]);
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch video by ID" });
    });
});
app.put("/videos/:id", function (req, res) {
  let id = Number(req.params.id);
  let rating = req.body.rating;

  db.query("UPDATE videos SET rating = $1 WHERE id = $2", [rating, id])
    .then(() => res.send(`Video rating has been updated!`))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

app.post("/videos", function (req, res) {
  const newTitle = req.body.title;
  const newUrl = req.body.url;
  const newRating = 0;

  const query = `INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)`;
  if (req.body.title && req.body.url && isUrl(req.body.url)) {
    db.query(query, [newTitle, newUrl, newRating])
      .then(() => {
        res.status(201).json({
          result: "success",
          message: "Created a new video",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          result: "failure",
          message: "Video could not be saved",
        });
      });
  } else {
    res
      .status(400)
      .send("Please check the fields have been correctly filled in");
  }
});

app.delete("/videos/:id", function (req, res) {
  let VideoId = Number(req.params.id);
  db.query("DELETE FROM videos WHERE id=$1", [VideoId])
    .then(() => {
      return db.query("DELETE FROM videos WHERE id=$1", [VideoId]);
    })
    .then(() => res.send(`Video ${VideoId} deleted!`))
    .catch((e) => {
      console.error(e);
      res.status(500).send({
        result: "failure",
        message: "Video could not be deleted",
      });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
