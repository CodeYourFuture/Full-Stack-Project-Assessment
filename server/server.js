
const express = require("express");
const app = express();
const pool = require("./db.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 5000;


app.use(express.static(path.resolve(__dirname, "../client/build")))
app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());




// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// const movies = require("../exampleresponse.json");
// const { query } = require("express");

  
// get

app.get("/videos", (req, res) => {
  const orderBy = req.query.order;
  const query =
    orderBy === "desc"
      ? `SELECT * FROM videos ORDER BY rating desc`
      : `SELECT * FROM videos ORDER BY rating`;
  pool.query(query).then((result) => res.status(200).json(result.rows));
});

//post movies
function validateYouTubeUrl(url) {
  let regExp =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  return url.match(regExp);
}


app.post("/videos", function (req, res) {
  const newId = req.body.id;
  const newtTitle = req.body.title;
  const newUrl = req.body.url;
  const newRating = 0;
  const query = "INSERT INTO videos (id, title, url, rating) VALUES ($1, $2, $3, $4)";
  if (!req.body.title || !validateYouTubeUrl(req.body.url)) {
    res
      .status(400)
      .json({ msg: "Please make sure to include  title and valid url" });
    return;
  }
  pool
    .query(query, [newId, newtTitle, newUrl, newRating])
    .then(() => res.send("Video added!"))
    .catch((error) => {
      console.error(error);
    });
});


// getting videos by id
app.get("/videos/:id", (req, res) => {
  const id = req.params.id;

  pool
    .query("SELECT * FROM videos WHERE  id=$1", [id])
    .then((result) => {
      if (result.rows.length === 0) res.status(404).send("Id not found");
      else res.status(200).json(result.rows);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// SEARCH //
app.get("/videos/title", (req, res) => {
  const title = req.params.title;
  pool
  .query("SELECT * FROM videos WHERE id=$1", [title])
  .then((result) => res.json(result.rows))
  .catch((error)=>{console.log(error)
  res.status(500).json(error)})
  
});



// DELETE //
app.delete("/videos/:id", (req, res) => {
  const moviesId = req.params.id;
  
  if (isNaN(moviesId)) {
    res.status(400).send({
      result: "failure",
      message: "movies not deleted",
    });
    return;
  }

  pool
  .query("DELETE FROM videos WHERE id=$1",[moviesId])
    .then(() => res.send(`delete${moviesId}`))
    .catch((error)=> {console.log(error)
    res.status(500).json(error)})
});

app.listen(port, () => console.log(`Listening on port ${port}`));