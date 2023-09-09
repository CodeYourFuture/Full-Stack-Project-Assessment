const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

const { Client } = require("pg");
const client = new Client({
  host: process.env.MYHOST,
  user: process.env.MYUSER,
  port: process.env.MYPORT,
  password: process.env.MYPASSWORD,
  database: process.env.MYDATABASE,
  ssl: true,
});

client.connect(function (error) {
  if (error) {
    throw error;
  }
  console.log("connected to database");
});

// GET "/"
app.get("/", (req, res) => {
  client.query("select * from videos ORDER BY title", (error, result) => {
    if (!error) {
      res.json(result.rows);
    } else {
      console.log(error.message);
    }
  });
  client.end;
});

// post"/"
app.post("/", (req, res) => {
  const { title, url } = req.body;
  client.query(
  "INSERT INTO videos (title, url, rating) VALUES ($1, $2, 0)",
  [title, url],
  (error, result) => {
    if (!error) {
      res.status(201).send("success");
    } else {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
}
)
});

//this is no longer used because we always bring all videos back 
app.get("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  const video = videos.find((video) => video.id === videoId);
  res.status(200).send({ video });
});


app.delete("/:id", (req, res) => {
  const idFromInput = parseInt(req.params.id);
    client.query(
      "DELETE FROM videos WHERE id=($1)",[idFromInput],
      (error, result) => {
        if (!error) {
          res.status(201).send("success");
        } else {
          console.log(error.message);
          res.status(500).send("Internal Server Error");
        }
      }
    );
});

app.put("/:id", (req, res) => {
  const idFromInput = parseInt(req.params.id);
  let myRating = Number(req.body.video.rating);
    client.query(
      "UPDATE videos SET rating = ($2) WHERE id = ($1)",
      [idFromInput, myRating],
      (error, result) => {
        if (!error) {
          res.status(201).send("success");
        } else {
          console.log(error.message);
          res.status(500).send("Internal Server Error");
        }
      }
    );
});
