const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config();

let cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.listen(port, () => console.log(`Listening on port ${port}`));
const pool = require("./DBConfig");

// const { Pool } = require("pg");
// const pool = new Pool({
//   user: process.env.DBUSER,
//   host: process.env.DBHOST,
//   database: process.env.DBDATABASE,
//   password: process.env.DBPASSWORD,
//   port: 5432,
//   ssl: true,
// });
// pool.connect(function (err) {
//   if (err) throw err;
//   console.log("connected to database!");
// });

app.get("/", function (req, res) {
  pool.query("SELECT * FROM videos", (error, result) => {
    if (!error) {
      res.json(result.rows);
    } else {
      console.log(error.message);
    }
    pool.end;
  });
});
app.get("/:id", function (req, res) {
  const videoId = req.params.id;
  pool.query(
    "SELECT * FROM videos WHERE id = $1",
    [videoId],
    (error, result) => {
      if (!error) {
        if (result.rows.length === 0) {
          res.status(404).json({ error: "Video not found" });
        } else {
          res.json(result.rows[0]);
        }
      } else {
        console.log(error.message);
        res.status(500).json({ error: "Internal server error" });
      }
      pool.end;
    }
  );
});

app.delete("/:id", function (req, res) {
  const videoId = req.params.id;
  pool.query("DELETE FROM videos WHERE id = $1", [videoId], (error, result) => {
    if (!error) {
      if (result.rowCount === 0) {
        res.status(404).json({ error: "Video not found" });
      } else {
        res.json({ message: "Video deleted successfully" });
      }
    } else {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
    pool.end;
  });
});

app.post("/", function (req, res) {
  const { title, url, rating } = req.body;

  pool.query(
    "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3) RETURNING id",
    [title, url, rating],
    (error, result) => {
      if (!error) {
        const newVideoId = result.rows[0].id;
        res.json({ message: "Video added successfully", id: newVideoId });
      } else {
        console.log(error.message);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );
});
