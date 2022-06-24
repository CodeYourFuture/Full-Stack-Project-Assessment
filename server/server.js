const { response } = require("express");
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const port = process.env.PORT || 5432;

//________________middleware_________
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "ljigsprwunuogz",
  host: "ec2-34-247-172-149.eu-west-1.compute.amazonaws.com",
  database: "decku20sgt3gjr",
  password: "c9ea4392622dcea74ce4212d029bb3ca415e5d2c80e90343c67b632ffd7d83b0",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ____________get all videos____________
app.get("/", (req, res) => {
  pool.query("SELECT * FROM videos", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// ____________get video by id________________
app.get("/videos/:id", function (req, res) {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM videos WHERE id = $1;", [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: "Video not found" });
    } else {
      res.status(200).json(results.rows);
    }
  });
});

//____________add new video_____________________
app.post("/videos/", function (req, res) {
  const { title, url } = req.body;
  const rating = 0;

  pool.query(
    "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)  RETURNING *",
    [title, url, rating],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    }
  );
});

//____________delete video_____________________
app.delete("/videos/:id", function (req, res) {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM videos WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
