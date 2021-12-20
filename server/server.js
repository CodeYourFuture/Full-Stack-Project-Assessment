const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");

const port = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://localhost:3000",
};
// The API will be accessible from http://localhost:3000 in our case and blocked for other domains.
app.use(express.urlencoded({ extended: true })); // sending data for POST and PUT requests
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false })); // sending data for POST and PUT requests

app.listen(port, () => console.log(`Listening on port ${port}`));

const pool = new Pool({
  user: "mubtqstrwsokgu",
  host: "ec2-52-0-234-93.compute-1.amazonaws.com",
  database: "dbi5ahnturoma9",
  password: "9383af1fcf526a4141720ffa866545ba1d755c213c94edace8d031cd4a6d1b2f",
  post: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Store and retrieve your videos from here
// let videos = require("../client/src/exampleresponse.json");

// GET "/"

app.get("/", (req, res) => {
  const orderBy = req.query.order; // !!! "?order" comes from app.js/useEffect fetch

  const query =
    orderBy === "desc"
      ? `SELECT * FROM example ORDER BY rating desc`
      : `SELECT * FROM example ORDER BY rating`;

  pool.query(query).then((result) => res.status(200).json(result.rows));
});

// 200-1- This endpoint is used to return all of the videos
app.get("/videos", (req, res) => {
  const orderBy = req.query.order;

  const query = `SELECT * FROM example`;

  pool.query(query).then((result) => res.status(200).json(result.rows));
});

// //200-3- Returns the video with the ID contained within the {id} parameter

app.get("/videos/:id", (req, res) => {
  const requestedId = req.params.id;

  requestedId
    ? pool
        .query(`SELECT * FROM example WHERE id=$1`, [requestedId])
        .then((result) => res.status(200).json(result.rows))
        .catch((error) => console.log(error))
    : res.status(400).json({ message: `No video with this id:${requestedId}` });
});

//200-2 POST
app.post("/", (req, res) => {
  const newId = Math.floor(Math.random() * 1000000);
  const newRating = Math.floor(Math.random() * 10000);
  const { title, url } = req.body;
  req.body.title && req.body.url
    ? pool
        .query(
          "INSERT INTO example(id, title, url, rating) VALUES($1,$2,$3,$4)",
          [newId, title, url, newRating]
        )
        .then((result) => res.status(200).json(result.rows))
    : res.status(400).json({
        result: "failure",
        message:
          "As it does not have title or/and url Video could not be saved",
      });
});

//DELETE "/{id}" Deletes the video with the ID container within the {id} parameter

app.delete("/videos/:id", (req, res) => {
  const requestedId = +req.params.id;
  requestedId
    ? pool.query("DELETE FROM example WHERE id=$1", [requestedId]).then(() =>
        res.status(200).json({
          result: "successful",
          message: "Video has been deleted",
        })
      )
    : res.status(400).json({
        result: "failure",
        message: "Video could not be deleted",
      });
});

app.put("/videos/:id", (req, res) => {
  const updateId = req.params.id;
  const newRating = req.body.rating;
  pool
    .query("UPDATE example SET rating=$1 WHERE id=$2", [updateId, newRating])
    .then(() => res.status(200).send("Rating has been updated"))
    .catch((error) => console.log(error));
});
