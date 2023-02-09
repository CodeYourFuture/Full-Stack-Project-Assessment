const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config()

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));
const port = process.env.PORT || 5000;






const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
connectionTimeoutMillis: 10000,
ssl: true,
});

app.get("/videos", function (req, res) {
  pool
    .query("SELECT * FROM videos")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.post("/videos", function (req, res) {
  console.log(req.body);
  let title = req.body.title;
  let url = req.body.url;
  let rating;
  if(!req.body.rating)rating = 0;
  else rating = req.body.rating;
  let postQuery = "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)";
  pool.query(postQuery, [title, url, rating])
  .then(()=> res.status(201).json({msg: "Your video has been successfully posted"}))
  .catch((error)=> console.log(error))
})

app.delete("/videos/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let deleteQuery = `DELETE FROM videos WHERE id = ${id}`;
  pool.query(deleteQuery)
  .then(()=> res.json({msg: `Video by id:${id} has been successfully deleted`}))
  .catch((error)=> console.log(error))

})

app.listen(port, () => console.log(`Server is listening on port ${port}`));