const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
require('dotenv').config();

const parseDbUrl = require("parse-database-url");
const dbConfig = parseDbUrl(process.env.DATABASE_URL);

const corsOptions = {
  origin: "https://videosfront.onrender.com",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());  

const { Pool } = require("pg");

const db = new Pool(dbConfig);

// const db = new Pool({
//   user: process.env.USERNAME,
//   host: process.env.HOSTNAME,
//   database: process.env.DATABASE_NAME,
//   password: process.env.PASSWORD,
//   port: 5432,
// });

// let videos = [
//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   }
// ];

// GET "/:{id}"
app.get("/:id", (req, res) => {
  let idRequested = Number(req.params.id);
  db.query('select * from urls where id = $1', [idRequested])
  .then(result = res.status(200).json(result.rows))
  .catch(err => res.send(err));
  // let videoRequested = videos.find(video => video.id === idRequested);
  // videoRequested
  // ? res.status(200).json(videoRequested)
  // : res.status(400).send("Not found")
});

app.post("/update_rating", (req, res) => {
  const {id, rating} = req.body;
  db.query('update urls set rating = $1 where id = $2', [rating, id])
  .then(()=> res.sendStatus(204))
  .catch(err => res.send(err));
  // const updatedVideo = req.body;
  // const videoIndex = videos.findIndex(
  //   (video) => video.id === updatedVideo.id
  // );
  // videos[videoIndex].id = updatedVideo.id;
  // videos[videoIndex].rating = updatedVideo.rating;
  // res.sendStatus(200);
});


// GET "/"
app.get("/", (req, res) => {
  db.query('select * from urls')
  .then(result => res.json(result.rows))
  .catch(err => res.send(err));
});

//POST "/"
app.post("/", (req, res) => {
  const { title, url, dateTime } = req.body;
  db.query(
    "insert into urls (title, url, rating, timeAdded) values ($1, $2, 0, $3) returning id", [title, url, dateTime]
  )
  .then(result => res.status(200).json(result.rows[0]))
  .catch(err => res.send(err));
  // try {
  //   const { title, url, dateTime } = req.body;
  // let id;
  // videos.length == 0 
  // ? id = 1
  // : id = videos[videos.length-1].id + 1;
  // let newVideo = { id, title, url, rating: 0, dateTime };
  // videos.push(newVideo);
  // res.status(200).json({"id": newVideo.id})
  // } catch (error) {
  //   res.status(500).json({"result": "failure",
  //                          "message": "Video could not be saved"})
  // }
})

app.delete("/:id", (req, res) => {
  let idToDelete = Number(req.params.id);
  db.query("delete from urls where id = $1", [idToDelete]).then(() =>
    res.status(200).json({})
  )
  .catch(err => res.send(err));
  // let indexToDElete = videos.findIndex(video => video.id === idToDelete);
  // if (indexToDElete === -1) {
  //   res.status(400).json({
  //     result: "failure",
  //     message: "Video could not be deleted",
  //   });
  // } else {
  //   videos.splice(indexToDElete,1);
  //   res.status(200).json({})
  // }
})


app.listen(port, () => console.log(`Listening on port ${port}`));