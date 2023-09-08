const express = require("express");
// const fs = require("fs");
const cors = require("cors");
const app = express();
const db = require("./config/db");
const port = process.env.PORT || 4000;

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3005", 
};

app.use(cors(corsOptions));

let videos;

app.get("/", async (req, res) => {
  const { order } = req.query;

  try {
    let orderBy = 'DESC'; 

    if (order === 'asc') {
      orderBy = 'ASC';
    }

    const queryText = `SELECT * FROM ytvideos ORDER BY ratings ${orderBy}`;
    const queryResult = await db.query(queryText);
    const videos = queryResult.rows;

    console.log("Fetched videos from the database:", videos);

    res.json(videos);
  } catch (error) {
    console.error("Error fetching data from the database", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/", async (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Both title and url must be provided",
    });
  }

  try {
    // Insert the new video data into your PostgreSQL database
    const queryText = "INSERT INTO ytvideos (title, url, ratings) VALUES ($1, $2, $3) RETURNING id";
    const queryValues = [title, url, 7]; 
    const result = await db.query(queryText, queryValues);

    const id = result.rows[0].id;

    // Return the ID of the newly added video
    res.status(201).json({ id });
  } catch (error) {
    console.error("Error adding video to the database", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const video = videos.find((video) => video.id === id);
  if (!video) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }
  res.json(video);
});

app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = videos.findIndex((video) => video.id === id);
  if (index === -1) {
    return res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
  }
  videos.splice(index, 1);
  res.json({});
});


app.listen(port, () => console.log(`Listening on port ${port}`));