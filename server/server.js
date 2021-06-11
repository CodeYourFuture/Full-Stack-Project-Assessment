const express = require("express");
const app = express();
const { Pool } = require("pg");
/* require("dotenv").config();
const {
  Pool,
} = require("pg"); */
/* 
const password = process.env.PASSWORD;
const host = process.env.HOST;
const prt = process.env.DB_PORT;
const user = process.env.USER;
const database = process.env.DATABASE;
const uri = process.env.URI; */

//const uri = process.env.URI;

const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  /* host,
  prt,
  user,
  password,
  database,
  uri, */
};
/* 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
}); */
const port = process.env.PORT || 5000;
const cors = require("cors");
const { query } = require("express");
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const pool = new Pool(dbConfig);
//let videos = `select  * from videos`;
/* pool.connect((err, client, release) => {
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
}); */
// GET "/"

app.get("/", (req, res) => {
  const order = req.query.order;
  if (order) {
    pool
      .query(`select * from videos order by rating ${order}`)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((error) => res.status(500).send(error));
  } else {
    pool
      .query(`select * from videos order by rating desc `)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => res.status(500).send(error));
  }
});

// get video by id

app.get("/:search", async function (req, res) {
  const search = req.params.search;
  console.log(search);
  pool
    .query(`select * from videos where lower (title) like '%${search}%'`, [
      search,
    ])
    .then((result) => {
      res.json(result.rows);
      console.log(result.rows);
    })
    .catch((err) => err);
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

// put end point

app.put("/:id", (req, res) => {
  const videoId = req.params.id;
  const newRating = req.body.rating;

  pool
    .query(`update videos set rating=$1 where id=$2`, [newRating, videoId])
    .then(res.json({ rating: newRating }))
    .catch((error) => res.send(error));
});
// delete  by id end point

app.delete("/:id", async function (req, res) {
  const videoId = req.params.id;
  await pool
    .query("delete from videos where id=$1 ", [videoId])
    .then(() => res.json({}))
    .catch((error) => res.send(error));
});
app.listen(port, () => console.log(`Listening on port ${port}`));
