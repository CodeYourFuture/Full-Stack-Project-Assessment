const express = require("express");
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;
const bodyparser = require('body-parser')
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sql-fullstack",
  password: "Styles3100",
  port: 5432,
});

app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require('./exampleresponse.json');

// GET "/"
app.get("/", (req, res) => {
  pool
    .query('SELECT * FROM videos')
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e))
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  let id = parseInt(req.params.id)

  // let foundVid = videos.find(el => el.id == id)

  // if (foundVid) res.json(foundVid)
  // else res.status(400).json({
  //   "result": "failure",
  //   "message": "Video could not be found"
  // })

  pool
    .query('SELECT id FROM videos')
    .then((result) => {
      if (!result.rows.some(el => el.id == id)) {
        res.status(400).json({
          "result": "failure",
          "message": "Video could not be found"
        })
      } else {
        pool
          .query('SELECT * FROM videos WHERE id = $1', [id])
          .then((result) => res.json(result.rows))
          .catch((e) => console.error(e))
      }
    })
});

// Post "/"
app.post("/", (req, res) => {
  let { title, url } = req.body

  if (!title || !url || url.replace("https://www.youtube.com/watch?v=","").length !== 11) {
    return res.status(400).json({
      "msg": "Video could not be saved"
    })
  } 
  else {
    const query = 'INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)'

    pool
      .query(query, [title, url, 0])
      .then(() => res.status(200).json({ msg: "Video added successfully" }))
      .catch((e) => console.error(e))
  }
})

// Post "/rating/:id"
app.post("/rating/:id", (req, res) => {
  let id = parseInt(req.params.id)
  let { input } = req.body
  console.log(input)

  pool
    .query('SELECT rating FROM videos WHERE id = $1', [id])
    .then((result) => {
      let rating = result.rows[0].rating

      if (input === "up") rating++
      if (input === "down" && rating !== 0) rating--

      pool
        .query('UPDATE videos SET rating = $1 WHERE id = $2', [rating, id])
        .then(() => res.status(200).json({ msg: "Video added successfully", updated: true }))
        .catch((e) => console.error(e))
    })
})

// Delete "/{id}"
app.delete("/:id", (req, res) => {
  let id = parseInt(req.params.id)

  pool
    .query('SELECT id FROM videos')
    .then((result) => {
      if (!result.rows.some(el => el.id == id)) {
        res.status(400).json({
          "result": "failure",
          "message": "Video could not be found"
        })
      } else {
        pool
          .query('DELETE FROM videos WHERE id = $1', [id])
          .then(() => res.send("Video deleted successfully"))
          .catch((e) => console.error(e))
      }
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));