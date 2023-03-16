const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const videos = require("./exampleresponse.json");
const { Pool } = require("pg");
const config = require("./db.js");
const pool = new Pool(config);

// Test the connection
pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));

//DATABASE CODE level 300
app.get("/videos", (req, res) => {
  pool.query("SELECT * FROM videos", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error getting videos from database");
    } else {
      res.send(result.rows);
    }
  });
});
app.post("/videos", (req, res) => {
  const { title, url, rating } = req.body;
  pool.query(
    "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3) RETURNING *",
    [title, url, rating],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error adding video to database");
      } else {
        res.status(201).send(result.rows[0]);
      }
    }
  );
});
app.put("/videos/:id", (req, res) => {
  const id = req.params.id;
  const { title, url, rating } = req.body;
  pool.query(
    "UPDATE videos SET title = $1, url = $2, rating = $3 WHERE id = $4 RETURNING *",
    [title, url, rating, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating video in database");
      } else if (result.rowCount === 0) {
        res.status(404).send("Video not found");
      } else {
        res.send(result.rows[0]);
      }
    }
  );
});

//SERVER CODE level 250
app.delete("/videos/:id", (req, res) => {
  const id = req.params.id;
  pool.query("DELETE FROM videos WHERE id = $1", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting video from database");
    } else if (result.rowCount === 0) {
      res.status(404).send("Video not found");
    } else {
      res.send("Video deleted");
    }
  });
});

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

// GET "/videos"
app.get("/videos", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send(videos);
});

// POST "/videos"
app.post("/videos", (req, res) => {
  const newVideo = req.body;
  newVideo.id = videos.length + 1;
  videos.push(newVideo);
  res.status(201).send(newVideo);
});

// GET "/videos/:id"
app.get("/videos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const video = videos.find((v) => v.id === id);

  if (!video) {
    res.status(404).send("Video not found");
  } else {
    res.send(video);
  }
});

// DELETE "/videos/:id"
app.delete("/videos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = videos.findIndex((v) => v.id === id);

  if (index === -1) {
    res.status(404).send("Video not found");
  } else {
    videos.splice(index, 1);
    res.sendStatus(204);
  }
});
