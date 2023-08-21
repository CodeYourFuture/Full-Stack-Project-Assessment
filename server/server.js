const express = require("express");
require("dotenv").config();
const app = express();

let cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const expressPort = process.env.PORT || 5000;

app.listen(expressPort, () => console.log(`Listening on expressPort ${expressPort}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

const { Client } = require("pg");
const client = new Client({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  port: process.env.DBPORT,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
  ssl: true,
});

client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

let videos = require("./exampleresponse.json");

// GET "/"

app.get("/", (req, res) => {
  client.query(`SELECT * FROM videos ORDER BY title`, (error, response) => {
    if (!error) {
      res.json(response.rows);
    } else {
      console.log(error.message);
    }
    client.end;
  });
});

app.get("/info", (req, res) => {
  res.json(videos);
});

app.get("/:id", function (req, res) {
  let searchId = Number(req.params.id);

  client
    .query("SELECT * FROM videos WHERE id = $1", [searchId])
    .then((result) => {
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404).json({
          result: "failure",
          message: "Video could not be found",
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(404).json({
        result: "failure",
        message: "Video could not be found",
      });

      client.end;
    });
});

app.delete("/:id", function (req, res) {
  let searchId = Number(req.params.id);

  client
    .query("DELETE FROM videos WHERE id = $1", [searchId])
    .then((result) => {
      res.status(200).json({});
    })
    .catch((error) => {
      console.log(error.message);
      res.status(404).json({
        result: "failure",
        message: "Video could not be deleted",
      });

      client.end;
    });
});

app.put("/:id", function (req, res) {
  let searchId = Number(req.params.id);
  let inputRating = Number(req.body.rating);

  client
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

      client.end;
    });
});

app.post("/", (req, res) => {
  if (!req.body.title || !req.body.url) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }

  client
    .query("SELECT MAX(id) FROM videos")
    .then((result) => {
      let newId = result.rows[0].max + 1;
      let newTitle = req.body.title;
      let newUrl = req.body.url;
      let newRating = 0;

      client
        .query("INSERT INTO videos (id, title, url, rating) VALUES ($1, $2, $3, $4)", [newId, newTitle, newUrl, newRating])
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
      // res.status(200).json({});
    })
    .catch((error) => {
      console.log(error.message);
      res.status(404).json({
        result: "failure",
        message: "Video could not be inserted",
      });

      client.end;
    });
});
