const express = require("express");
const cors = require("cors");
const {Pool}= require("pg");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 9999;

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {rejectUnauthorized: false}
})

app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));


// GET "/"
app.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM videos";
    const result = await pool.query(query);
    const videos = result.rows;
    res.status(200).send(videos)
  } catch (error) {
    console.log("error")
  }
});


app.post("/", async (request, response) => {
  try {
    const {title, url} = request.body;
    const rating = 0;
    const query = "INSERT INTO videos (title, url, rating) VALUES ($1,$2,$3) RETURNING *";
    const values = [title, url, rating]
    const result = await pool.query(query, values);
    const newvideo = result.rows[0];
    res.status(201).send(newvideo);
  } catch (error) {
    console.log("error");
  }
});


app.get("/:id", async (request, response) => {
  try {
    const videoId = request.params.id;
    const query = "SELECT * FROM videos WHERE id = $1";
    const values = [videoId];
    const result = await pool.query(query, values);
    const video = result.rows[0];
    if (video) {
      response.send(video);
    } else {
      response.status(404).send("Video not found");
    }
  } catch (error) {
    console.log(error);
    response.status(500).send("Internal Server Error");
  }
});


app.delete("/:id", async (request, response) => {
  try {
    const videoId = request.params.id;
    const query = "DELETE FROM videos WHERE id = $1";
    const values = [videoId];
    await pool.query(query, values);
    response.status(204).send({ message: "Video deleted successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).send("Internal Server Error");
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const query = "UPDATE videos SET rating = $1 WHERE id = $2";
    const values = [rating, id];

    await pool.query(query, values);

    res.json({ message: "Rating updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update rating" });
  }
});
