const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(cors());
app.use(bodyParser.json());

app
  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Server error:", err);
  });

// GET "/"
app.get("/", async (req, res) => {
  const { order } = req.query;
  let orderBy = "rating DESC";

  if (order === "asc") {
    orderBy = "rating ASC";
  }

  try {
    const result = await pool.query(`SELECT * FROM videos ORDER BY ${orderBy}`);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET "/{id}"
app.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({
      result: "failure",
      message: "Invalid video ID",
    });
    return;
  }

  try {
    const result = await pool.query("SELECT * FROM videos WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        result: "failure",
        message: "Video not found",
      });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error fetching video by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST "/"
app.post("/", async (req, res) => {
  const { title, url } = req.body;

  if (
    !title ||
    !url ||
    !url.match(/^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+(&\S+)?$/)
  ) {
    res.send({
      result: "failure",
      message: "Video could not be saved",
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3) RETURNING id",
      [title, url, 0]
    );
    const newId = result.rows[0].id;

    res.status(201).json({ id: newId });
  } catch (error) {
    console.error("Error inserting new video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE "/{id}"
app.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`Received DELETE request for video with ID: ${id}`);

  try {
    const result = await pool.query(
      "DELETE FROM videos WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      console.log(`Video with ID ${id} not found`);
      res.status(404).json({
        result: "failure",
        message: "Video not found",
      });
    } else {
      console.log(`Video with ID ${id} deleted successfully`);
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error deleting video by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
