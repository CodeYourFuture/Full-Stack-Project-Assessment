require("dotenv").config();

const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const path = require("path");
const port = process.env.DATABASE_URL || 5000;

const app = express();

app.use(express.json());
app.use(cors());

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  database: process.env.database,
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

// if (process.env.NODE_ENV === "production") {
//   // app.use(express.static(path.join(__dirname, "client/build")));
// }

app.use(bodyParser.urlencoded({ extended: false }));

// DELETE "/{id}"
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!parseInt(id) || parseInt(id) < 0 || isNaN(id)) {
    return res
      .status(400)
      .send({ success: false, message: "please provide a valid Id" });
  }

  pool
    .query("SELECT id FROM videos WHERE id = $1", [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(400).send({
          success: false,
          message:
            "The video you are trying to delete doesn't exist in the database,make sure you have an existing id",
        });
      } else {
        pool
          .query("DELETE FROM videos WHERE id = $1", [id])
          .then(() => res.send("video successfully deleted..."));
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  const { id } = req.params;

  if (!parseInt(id) || parseInt(id) < 0 || isNaN(id)) {
    return res
      .status(400)
      .send({ success: false, message: "please provide a valid Id" });
  }

  pool
    .query("SELECT id FROM videos WHERE id = $1", [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(400).send({
          success: false,
          message:
            "The video you are trying to view doesn't exist in the database,make sure you have an existing id",
        });
      } else {
        return res.status(200).send({
          success: true,
          result: result.rows,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

//  POST
app.post("/", (req, res) => {
  const { videoTitle, videoUrl } = req.body;

  if (!videoTitle || !videoUrl) {
    return res.status(404).json({
      success: false,
      message: "Please provide video title and url...",
    });
  }

  pool
    .query("INSERT INTO videos (title,url) VALUES ($1,$2)", [
      videoTitle,
      videoUrl,
    ])
    .then(() => res.status(200).send({ message: "video added successfully" }))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// GET "/"
app.get("/", (req, res) => {
  pool
    .query("SELECT * FROM videos")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
