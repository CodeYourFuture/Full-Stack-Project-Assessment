const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
//const db = require('./db'); // Database connection module
const bodyParser = require("body-parser");

//db()
dotenv.config();
app.use(bodyParser.json())
app.use(cors());
app.use(express.json());

console.log(process.env)

const { Pool } = require("pg");

const database = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
});

let videos = require("../exampleresponse.json");
// Generate a unique ID for each new video
let nextVideoId = 1;

// GET "/"
app.get("/", async (req, res) => {
  try {
    const video = await database.query("SELECT * FROM videos");
    res.status(200).send(video.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await database.query("SELECT * FROM videos WHERE id = $1", [parseInt(id)]);
    res.status(201).send(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await database.query("DELETE FROM videos WHERE id = $1", [parseInt(id)]);
    if (result.rowCount === 1) {
      res.status(201).json({ result: "success", message: "Video deleted successfully" });
    } else {
      res.status(404).json({ result: "failure", message: "Video could not be deleted" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

  app.post("/", async (request, response) => {
  
    try {
      const {title, url} = request.body;
      const rating = 0;
      const query = "INSERT INTO videos (title, url, rating) VALUES ($1,$2,$3) RETURNING * ";
      const values = [title, url, rating]
      const result = await database.query(query, values);
      const newvideo = result.rows[0];
      res.status(201).send(newvideo);
    } catch (error) {
      console.log("error");
    }
  });

app.listen(port, () => console.log(`Listening on port ${port}`));
