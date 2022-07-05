const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

// user: "postgres",
//   host: "localhost",
//   database: "videos",
//   password: "",
//   port: 5432,

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
//for setting up the environment variable
//export PORT=9999
//for setting up the DatabaseUrl in the connectionString
//export DATABASE_URL=postgres://postgres:@localhost:5432/videos?sslmode=disable

//from here
//\i ~/Downloads/cyf_ecommerce.sql

// from terminal
// heroku pg:psql -a cyf-ecommerce -f ~/Downloads/cyf_ecommerce.sql
//get product

//psql -h ec2-176-34-215-248.eu-west-1.compute.amazonaws.com -p 5432 -U ogspsozpkqzssl -W d838mflm23l9di
// provide password when prompted

router.get("/", (req, res) => {
  const videoId = req.query.id;
  const videoOrder = req.query.order;
  const searchText = req.query.searchText;
  let query;

  videoId
    ? (query = `SELECT * FROM videos WHERE id=${videoId}`)
    : searchText
    ? (query = `SELECT * FROM videos WHERE LOWER(title) LIKE '%${searchText}%' ORDER BY rating ${
        videoOrder ? videoOrder : "desc"
      }`)
    : (query = `SELECT * FROM videos ORDER BY rating ${
        videoOrder ? videoOrder : "desc"
      }`);
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/search", (req, res) => {
  const videoId = req.query.id;
  const videoOrder = req.query.order;
  let query;

  videoId
    ? (query = `SELECT * FROM videos WHERE id=${videoId}`)
    : (query = `SELECT * FROM videos ORDER BY rating ${
        videoOrder ? videoOrder : "desc"
      }`);

  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/", (req, res) => {
  const { title, url, rating } = req.body;

  if (!title || !url) {
    res.status(404).json({ error: "please enter all field" });
  }

  const query = `INSERT INTO videos (title,url,rating) VALUES ($1,$2,$3)`;
  pool
    .query(query, [title, url, rating ? rating : 0])
    .then(() => {
      res.send("new video has been added");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.put("/", (req, res) => {
  const { id, rating } = req.body;

  const query = `UPDATE videos SET rating=$1 WHERE id=${id}`;
  pool
    .query(query, [rating])
    .then(() => {
      res.send("rating has been updated");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.delete("/:id", (req, res) => {
  const videoId = req.params.id;
  const query = "DELETE FROM videos WHERE id=$1";

  pool
    .query(query, [videoId])
    .then(() => {
      res.send(`video with the id of ${videoId} has been deleted`);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
module.exports = router;
