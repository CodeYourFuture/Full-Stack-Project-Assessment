const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const secrets = require("./secrets.json");

const pool = new Pool({
  ...secrets,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

const basicQuery = "SELECT name, url, date_added, rating FROM videos";

// GET "/" : serve all videos
app.get("/", async (req, res) => {
  const { rows } = await pool.query(basicQuery);

  return res.json(rows);

  res.json({ videos: videos });
});

// GET "/{id}" : serve one video based on id
app.get("/:id", async (req, res) => {
  const query = `${basicQuery} WHERE id = $1;`;
  const id = req.params.id;

  const { rows } = await pool.query(query, [id]);

  rows.length === 0
    ? res.status(400).json({
        result: "failure",
        message: `Video width id '${id}' could not be found`,
      })
    : res.json(rows);
});

// POST "/" : add a video
app.post("/", async (req, res) => {
  const query = `INSERT INTO videos (name, url, date_added) 
  VALUES ($1, $2, $3)
  RETURNING *;`;
  const { title, url } = req.body; // deconstruct the body so we only get the keys we want

  const linkValid = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/gim
  );

  const result = await pool.query(
    "SELECT EXISTS (SELECT 1 FROM videos WHERE url = $1);",
    [url]
  );

  if (linkValid === null || !title.trim() || !result.rows[0].exists)
    return res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1; // January is 0 without the + 1?
  const year = date.getFullYear();

  const { rows } = await pool.query(query, [
    title,
    url.split("=")[1],
    `${year}-${month}-${day}`,
  ]);

  res.json(rows);
});

// DELETE "/{id}" : remove a video from the array based on an ID
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM videos WHERE id = $1 RETURNING *;";

  const { rows } = await pool.query(query, [id]);

  rows.length === 0
    ? res
        .status(400)
        .json({
          success: false,
          message: `No video with id of ${id} could be found`,
        })
    : res.json(rows);
});
