const { Pool } = require("pg");
const dotenv = require("dotenv");
// const data = require("./exampleresponse.json");
const cors = require("cors");

dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5009;

app.use(express.json());
// app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.listen(port, () => console.log(`Listening on port ${port}`));

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false, // Set this to true if you have a valid SSL/TLS certificate
  },
});

// Use the pool to query the database
app.get("/videos/", (req, res) => {
  const { ordering } = req.query;
  sqlQuery = "SELECT * FROM videos";

  pool
    .query(sqlQuery)
    .then((result) => {
      console.log("Connected to PostgreSQL database");
      let videos = result.rows;
      if (ordering === "asc") {
        videos.sort((a, b) => a.rating - b.rating);
      } else {
        videos.sort((a, b) => b.rating - a.rating);
      }
      res.status(200).json(videos);
    })
    .catch((err) => {
      console.error("Error executing query", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching videos" });
    });
});

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET "/"
app.get("/", (req, res) => {
  res.json({ express: "Your Backend Service is Running" });
});

// get all information from example by writing this get

app.post("/video", (req, res) => {
  const { title, url } = req.body;
  const rating = 0;

  const q = "insert into videos (title, url,rating) values ($1, $2, $3) ";
  const info = [title, url, rating];
  pool
    .query(q, info)
    .then(() => res.send("data inserted"))
    .catch((err) => console.error(err));
  // console.log(res.rows);
});

app.delete("/video/:id", (req, res) => {
  const id = req.params.id;

  const q = "delete from videos where id = $1";
  const info = [id];
  pool.query(q, info, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      res.send("data deleted");
      // console.log(res.rows);
    }
  });
});

app.get("/search", (req, res) => {
  const title = req.query.title;
  const q =
    "SELECT * FROM videos WHERE lower(title) LIKE '%' ||lower($1) || '%'";
  const info = [title];
  pool.query(q, info, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result.rows);
    }
  });
});

app.put("/video/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newRate = parseInt(req.body.newRate);
  const q = "UPDATE videos SET rating = $1 WHERE id = $2";
  const info = [newRate, id];
  pool.query(q, info, (err, response) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the video" });
    } else {
      console.log("Video updated");
      res.status(200).json({ message: "Video updated successfully" });
    }
  });
});



