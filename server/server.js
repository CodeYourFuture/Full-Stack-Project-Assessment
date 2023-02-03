
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const dotenv = require("dotenv")
dotenv.config();
const path = require("path");
const port = process.env.PORT || 5000;


app.use(express.static(path.resolve(__dirname, "../client/build")))
app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL || 'postgresql://postgres:<your admin password>@localhost:5432/<your db name>',
//   ssl: process.env.DATABASE_URL ? true : false
// })

const pool = new Pool({
  user: "seble",
  host: "localhost",
  database: "videodatabase",
  password: process.env.PASSWORD,
  port: 5432,
});
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// const movies = require("../exampleresponse.json");
// const { query } = require("express");

  
// get

app.get("/movies", (req, res) => {
  const orderBy = req.query.order;
  const query =
    orderBy === "desc"
      ? `SELECT * FROM movies ORDER BY rating desc`
      : `SELECT * FROM movies ORDER BY rating`;
  pool.query(query).then((result) => res.status(200).json(result.rows));
});

//post movies
function validateYouTubeUrl(url) {
  let regExp =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  return url.match(regExp);
}


app.post("/movies", function (req, res) {
  const newtTitle = req.body.titel;
  const newUrl = req.body.url;
  const newRating = 0;
  const query = "INSERT INTO movies (titel, url, rating) VALUES ($1, $2, $3)";
  if (!req.body.titel || !validateYouTubeUrl(req.body.url)) {
    res
      .status(400)
      .json({ msg: "Please make sure to include  title and valid url" });
    return;
  }
  pool
    .query(query, [newtTitle, newUrl, newRating])
    .then(() => res.send("Video added!"))
    .catch((error) => {
      console.error(error);
    });
});


// getting videos by id
app.get("/movies/:id", (req, res) => {
  const id = req.params.id;

  pool
    .query("SELECT * FROM movies WHERE  id=$1", [id])
    .then((result) => {
      if (result.rows.length === 0) res.status(404).send("Id not found");
      else res.status(200).json(result.rows);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// SEARCH //
app.get("/movies/titel", (req, res) => {
  const titel = req.params.titel;
  pool
  .query("SELECT * FROM movies WHERE id=$1", [titel])
  .then((result) => res.json(result.rows))
  .catch((error)=>{console.log(error)
  res.status(500).json(error)})
  
});



// DELETE //
app.delete("/movies/:id", (req, res) => {
  const moviesId = req.params.id;
  
  if (isNaN(moviesId)) {
    res.status(400).send({
      result: "failure",
      message: "movies not deleted",
    });
    return;
  }

  Pool
  .query("DELETE FROM movies WHERE id=$1",[moviesId])
    .then(() => res.send(`delete${moviesId}`))
    .catch((error)=> {console.log(error)
    res.status(500).json(error)})
});

app.listen(port, () => console.log(`Listening on port ${port}`));