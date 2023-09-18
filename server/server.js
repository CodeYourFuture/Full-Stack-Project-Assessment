const bodyParser = require("body-parser");
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));

const db = new Pool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DBDATABASE_NAME,
  server_url: process.env.SERVER_URL,
  ssl: true
});

db.connect(function (err){
  if (err) throw err;
  console.log("Connected to the database");
});

app.get("/", (req, res) => {
  db.query("SELECT * FROM videos")
    .then((result) => {
      res.status(200).json({ videos: result.rows });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/:id", async(req, res) => {
  try {
    const query = Number(req.params.id);  
    const videoId = await db.query(`SELECT * FROM videos WHERE id=$1`, [query])
    res.status(200).json(videoId.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

 // POST a request
app.post("/", async (req, res) => {
  try {
    console.log("hello"); 
    const {id, title, url, rating } = req.body;
      if (!id || !title || !url || rating === undefined){
        return res.status(400).json({ result: "failure", message: "Invalid request data" });
      } 
      const newVideo = await db.query("INSERT INTO videos (id, title, url, rating) RETURNING row", [id, title, url, rating]);
      res.status(201).json(newVideo.rows[0].id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: "failure", message: "Video could not be saved" });
  }

  // PUT update video
  app.put("/update_rating", async (req, res) => {
    try {
      const {id, rating} = req.body;
      const updateVideo = await db.query('UPDATE videos set rating = $1 WHERE id = $2', [rating, id]);
      res.status(204).json()
    } catch (error) {
          console.error(error);
    return res.status(500).json({ error: "Internal server error" });
    }
});

});

// GET endpoint to fetch all videos
app.get('/', async(req, res) => {
  try {
    const videos = result.rows;
    const videoByDate = db
    .query('SELECT * FROM videos ORDER BY date DESC', [videos])
      res.status(200).json({ result: 'success', videoByDate });  
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: 'failure', message: 'Failed to fetch videos' });
  }
});

app.delete("/:id", async(req, res) => {
  try {
    console.log("hi")
    const idToDelete = Number(req.params.id);
    const videoDeleted = db.query(`DELETE FROM videos WHERE id=$1`, [idToDelete])
   
      res.status(200).json({result: {}, videoDeleted}) 
  } catch (error) {
    console.log(error);
    res.status(500).json({result: 'failure', message: 'Failed to delete video'})
  }

}) 



