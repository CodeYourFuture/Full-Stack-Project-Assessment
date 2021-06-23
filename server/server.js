const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const exampleData = require("../client/src/exampleresponse.json")
console.log(exampleData)

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const { Pool } = require('pg');

// for password YUNUS
const dotenv = require('dotenv');
// for password YUNUS
dotenv.config();
// for password YUNUS
// CONNECTIONSTRING = 'postgresql://username:password@localhost:5432/cyf_hotels'

const pool = new Pool({

  connectionString: process.env.CONNECTIONSTRING,

});


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

// 1. list of all videos
app.get("/videos", function (req, res) {
    res.json(exampleData);
});

// // 2. get a particular hotel
// app.get("/video/:id", function (req, res) {
//   pool.query(`SELECT * FROM hotels where ${req.params.id} = hotels.id`, (error, result) => {
//     res.json(result.rows);
//   })
// })

// 3. delete a particular video
app.delete("/video/:id", function (req, res) {
  pool.query(`DELETE FROM videos where ${req.params.id} = videos.id`, (error, result) => {
    res.status(200).json(result.rows);

  })
})

// // 4. update name of a particular bookings night
// app.put("/video/:id", function (req, res) {
//   pool.query(`UPDATE bookings SET nights= 999 where ${req.params.id} = bookings.id`, (error, result) => {
//     res.status(200).json(result.rows);

//   })
// })

// 5. insert a new video
app.post("/videos", function (req, res) {
  const title = req.body.title
  const url = req.body.url
  const id = req.body.id
  const rating = req.body.rating
  console.log(title, url)
  pool.query(`INSERT INTO videos (id, title, url, rating) VALUES (${id}, ${title}, ${url}, ${rating} )`, (error, result) => {
    res.status(200).json(result.rows);

  })
})

app.listen(port, () => console.log(`Listening on port ${port}`));