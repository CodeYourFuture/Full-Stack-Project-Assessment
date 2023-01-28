const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// Midlwares
app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Configing the database
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    connectionString: process.env.connectionString,
    ssl: true
});

// Connecting to the pool using connection string
pool.connect();

// Reading all videos
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

// Reading a video based on ID
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

// Creating a video
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

// Updating the title of video
app.put("/video/title",(req,res)=>{
  const id = Number(req.body.id);
  const title = req.body.title;
  pool
    .query("UPDATE videos SET title=$1 WHERE id=$2", [title, id])
    .then(() => res.send(`Video ${id} updated!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
})

// Updating the url of video
app.put("/video/url",(req,res)=>{
  const id = Number(req.body.id);
  const url = req.body.url;
  pool
    .query("UPDATE videos SET url=$1 WHERE id=$2", [url, id])
    .then(() => res.send(`Video ${id} updated!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
})

// Deleting a video
app.delete("/video/:id",(req,res)=>{
  const id = Number(req.params.id);
  pool
    .query("DELETE FROM videos WHERE id = $1",[id])
    .then(() => res.json(`Video ${id} deleted!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
   });
})

app.listen(port, () => console.log(`Listening on port ${port}`));
