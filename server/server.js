const { response } = require("express");
const express = require("express");
require("dotenv").config();
const bodyParser = require('body-parser')
const app = express();

let cors = require("cors");
const port = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, () => console.log(`Listening on port ${port}`));

// let videos = require("./videosData.json");

const { Pool } = require("pg");

const db = new Pool({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
  ssl: true // Make sure this is set appropriately based on your database configuration
});

db.connect(function (err){
  if (err) throw err;
  console.log("Connect to database");
});


// Example route to fetch data and return it as JSON
app.get("/", (req, res) => {
 
  db.query(`SELECT * FROM videos`)
  .then((result)=>{
    res.json(result.rows);
  })
  .catch((err)=>{
    console.log(err);
  })

});


//GET BY ID
app.get("/:id", (req, res) => {
  const searchId = Number(req.params.id);
  db.query("SELECT * FROM videos WHERE id = $1", [searchId])
    .then((result) => {
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404).json({
          message: "Video not found",
        });
      }
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).json({
        message: "Internal server error",
      });
    });
});

// Delete BY ID
app.delete('/:id', (req, res) => {
  let searchId = Number(req.params.id);

  db.query("DELETE FROM videos WHERE id = $1", [searchId])
    .then((result) => {
      res.status(200).json({});
    })
    .catch((error) => {
      console.log(error.message);
      res.status(404).json({
        message: "Video could not be deleted",
      });
    });
 
});

app.put('/:id', (req, res) => {
  let searchId = Number(req.params.id);
  let inputRating = Number(req.body.rating);

  db
    .query("UPDATE videos SET rating = $2 WHERE id = $1", [searchId, inputRating])
    .then((result) => {
      res.status(200).json({});
    })
    .catch((error) => {
      console.log(error.message);
      res.status(404).json({
        result: "failure",
        message: "Video could not be updated",
      });
    });
})

// POST A VIDEO TO THE API
app.post('/:id', (req, res) => {
  if (!req.body.title || !req.body.url) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }

  db.query("SELECT MAX(id) FROM videos")
    .then((result) => {
      let newId = result.rows[0].max + 1;
      let newTitle = req.body.title;
      let newUrl = req.body.url;
      let newRating = 0;

      db.query("INSERT INTO videos (id, title, url, rating) VALUES ($1, $2, $3, $4)", [newId, newTitle, newUrl, newRating])
        .then((result) => {
          res.status(201).json({
            id: newId,
          });
        })
        .catch((error) => {
          console.log(error.message);
          res.status(404).json({
            result: "failure",
            message: "Video could not be inserted",
          });
        });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(404).json({
        result: "failure",
        message: "Video could not be inserted",
      });
    });
})
