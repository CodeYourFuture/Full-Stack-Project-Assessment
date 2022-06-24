// server.js when db is deployed on heroku

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { Client } = require("pg");


app.use(express.json());
app.use(cors());

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl:{
    rejectUnauthorized: false,
  },
});

client.connect();

app.use(express.json());



app.get("/", (req, res) => {
  client
    .query("Select * From videos")
    .then((result) => res.status(200).json(result.rows))
    .catch((error) => res.status(500).json(error));
});

app.post("/", function (req, res) {
  const { title, url} = req.body;
  const queryString = `Insert Into videos (title, url) values ($1, $2 , $3)`;
  client
    .query(queryString, [title, url])
    .then(() => res.status(200).send("Video added!"))
    .catch((error) => res.status(500).json(error));
});

app.put("/:videoId/rating", (req, res) => {
  const id = req.params.videoId;
  const rate = req.body.rating;



  const queryString = `Update videos Set rating = $1 Where id = $2`;
  client
    .query(queryString, [rate, id])
    .then(() => res.status(201).send("Rating has been updated!"))
    .catch((error) => res.status(500).json(error));
});


app.delete("/:videoId", (req, res) => {
  const id = req.params.videoId;
  const queryCheck = `Select * From videos where id = $1`;
  const queryString = `Delete From videos where id = $1`;
  client
    .query(queryCheck, [id])
    .then((result) => {
      if (result.rows.length == 0)
        res.status(404).send("Video does not exist!");
      else {
        client
          .query(queryString, [id])
          .then((result) => res.status(200).send("Video has been deleted!"))
          .catch((error) => res.status(500).json(error));
      }
    })
    .catch((error) => res.status(500).json(error));
});

// app.get("/videos/:videosId", function (req, res) {
//   const videosId = req.params.hotelId;

//   client
//     .query("SELECT * FROM hotels WHERE id=$1", [videosId])
//     .then((result) => res.json(result.rows))
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json(error);
//     });
// });



app.listen(port, () => console.log(`Listening on port ${port}`));
