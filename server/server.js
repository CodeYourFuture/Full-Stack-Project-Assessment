// libraries
const express = require("express");
require('dotenv').config();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json({limit: '10gb'}));

const port = process.env.PORT || 5000; 

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});


// End Points
// Creating the video table
app.post('/create/videos', (req, res) => {
    pool
    .query('CREATE TABLE videos (id serial PRIMARY KEY, title VARCHAR(500) NOT NULL, url VARCHAR(1000) NOT NULL, rating INTEGER)')
    .then((result) => res.status(200).json(result.command))
    .catch((error)=> console.error(error));
})
app.post("/videos/insert", (req, res)=>{
    const {title, url, rating} = req.body
    const query = 'INSERT INTO videos (title, url, rating) VALUES($1, $2, $3)'
    pool
        .query(query, [title, url, rating])
        .then(() => res.status(200).json({ message: 'Videos loaded' }))
        .catch((error)=> res.status(500).json({ error: "Error saving videos: " + error.message }));
});

// Getting all the videos saved
app.get("/", (req, res) => {
  pool.query('SELECT id, title, url, rating FROM videos ')
      .then((result) => res.status(200).json(result.rows))
      .catch((error) => {
          console.error(error);
          res.status(500).json(error);
      });
});
// Getting a video with a particular id
app.get("/videos/:id", (req, res) => {
    const id = req.params.id
    pool.query('SELECT id, title, url, rating FROM videos WHERE id=$1', [id])
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
  });
// Adding a video
app.post("/videos/add", (req, res) => {
    const {title, url} = req.body;
    const query = `INSERT INTO videos(title, url, rating) VALUES($1, $2, 0);`
        pool
            .query(query, [title, url])
            .then(() => res.status(200).json({ message: 'Video saved' }))
            .catch((error)=> res.status(500).json({ error: "Error saving video: " + error.message }));
    }); 

// Deleting a video
app.delete("/videos/remove/:id", (req, res)=> {
    const id = req.params.id;
    pool
      .query("DELETE FROM videos WHERE id=$1", [id])
      .then(() => res.send(`Video ${id} deleted!`))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  });

// Updating the ratings
app.put("videos/:id", (req, res)=>{
    // const id = req.params.id;
    const {rating, id} = req.body;
    pool
        .query('UPDATE videos SET rating=$1 WHERE id=$2', [rating, id])
        .then(()=> res.status(200).json({message: 'Rating updated'}))
        .catch((error)=>{
            console.log(error)
            res.status(500).json(error);
        });
});
  
app.listen(port, () => console.log(`Listening on port ${port}`));

