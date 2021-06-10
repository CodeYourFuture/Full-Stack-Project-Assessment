const express = require("express");
const app = express();
require("dotenv").config();
const { Pool } = require("pg");

const password = process.env.PASSWORD;
const host = process.env.HOST;
const prt = process.env.DB_PORT;
const user = process.env.USER;
const database = process.env.DATABASE;
//const uri = process.env.URI;

const dbConfig = {
  host,
  prt,
  user,
  password,
  database,
};
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const pool = new Pool(dbConfig);
let videos = `select  * from videos order by rating desc`;
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log(result.rows);
  });
});
// GET "/"

app.get("/", (req, res) => {
  pool
    .query(videos)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => res.status(500).send(error));
});

// get video by id

app.get("/:id", async function (req, res) {
  const videoId = req.params.id;
  try {
    const video = await pool.query("select  * from videos where id=$1", [
      videoId,
    ]);
    if (video.rows.length > 0) {
      res.status(200).json(video.rows[0]);
    } else {
      res.status(404).json({ msg: `video with id= ${videoId} doesn't exist` });
    }
  } catch (error) {
    res.send(error.message);
  }
});

//post request add a video with title and url

app.post("/", async function (req, res) {
  const newVideoTitle = req.body.title;
  const newVideoUrl = req.body.url;

  if (newVideoTitle && newVideoUrl) {
    await pool
      .query("insert into videos (title, url) values ($1,$2)", [
        newVideoTitle,
        newVideoUrl,
      ])
      .catch((error) => res.send(error));
    const newVideoCreated = await pool.query(
      "select id from videos where title = $1 and url=$2 ",
      [newVideoTitle, newVideoUrl]
    );

    console.log(newVideoCreated.rows);

    if (newVideoCreated.rows.length > 0) {
      res.json({ id: newVideoCreated.rows[0].id });
    } else {
      res.status(400);
    }
  } else {
    res.status(400);
  }
});

// delete  by id end point

app.delete("/:id", async function (req, res) {
  const videoId = req.params.id;
  await pool
    .query("delete from videos where id=$1 ", [videoId])
    .then(() => res.json({ msg: "gfhhfhhf" }))
    .catch((error) => res.send(error));
});
app.listen(port, () => console.log(`Listening on port ${port}`));
