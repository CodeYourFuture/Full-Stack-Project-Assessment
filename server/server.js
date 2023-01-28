const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    connectionString: process.env.connectionString,
    ssl: true
});

pool.connect();

app.get("/videos", (req, res) => {
  // res.send({ express: "Your Backend Service is Running" });
    pool
    .query("SELECT * FROM videos")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/videos/:id", function (req, res) {
  const id = req.params.id;
  pool
    .query("SELECT * FROM videos WHERE id = $1",[id])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.post("/video",(req,res)=>{
  const title = req.body.title;
  const url = req.body.url;
  const rating = req.body.rating;
  const query =
    "INSERT INTO videos (id, title, url, rating) VALUES ( (SELECT MAX(id) FROM videos) + 1 , $1, $2, $3)";
  const params = [title,url,rating];  
    pool
    .query(query,params)
    .then(() => res.json("Video has been added"))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
})

app.listen(port, () => console.log(`Listening on port ${port}`));
