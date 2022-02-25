var express = require("express");
var cors = require("cors");
var app = express();
const dotenv = require("dotenv").config();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

const port =5000;
// const User = process.env.DB_USER;
// const Host = process.env.HOST;
// const Password =process.env.DB_PASSWORD;
// const Database = process.env.DATABASE;


const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: false },
});


// Get the videos from the Heroku database

app.get("/", function (req, res) {
  const ascendingQuery = "SELECT * FROM videos ORDER BY rating ASC";

  if (req.query.order === "desc" || Object.keys(req.query).length === 0) {
    pool
      .query("SELECT * FROM videos ORDER BY rating DESC")
      .then((result) => res.json(result.rows))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
  if (req.query.order === "asc" ) {
    pool
      .query(ascendingQuery)
      .then((result) => res.json(result.rows))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
});

//post
app.post("/", function (req, res) {
  const id = req.body.id;
  const title = req.body.title;
  const url = req.body.url;
  const rating = req.body.rating;
  const Query = "INSERT INTO videos (id, title, url,rating) VALUES ($1, $2, $3,$4)";


  if (!title || !url) {
    return res.status(400).json({
      msg: "Please include a title, and a url",
    });
  } else {
    pool
      .query(Query, [id, title, url,rating])
      .then(() => res.send("A new video added"))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
});

// `GET` "/{id}"
app.get("/:id", (req, res) => {
  const id = req.params.id;
  Query = "SELECT * FROM videos WHERE id =$1"
 pool
   .query(Query, [id])
   .then((result) => res.json(result.rows))
   .catch((error) => {
     console.error(error);
     res.status(500).json(error);
   });
});

// delete
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  Query = "DELETE FROM videos WHERE id =$1";
  pool
    .query(Query, [id])
    .then(() => res.send("Video deleted"))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.put("/:id", function (req, res) {
  const ID = req.params.id;
  const rating = req.body.rating;

  pool
    .query("UPDATE videos SET rating=$1 WHERE id=$2", [rating, ID])
    .then(() => res.send(`Video ${ID} updated!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(port,() => console.log(`Listening on port ${port}`));
