const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

//const data = fs.readFileSync("exampleresponse.json");
//const videoData = JSON.parse(data);

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

//client.connect();

// user: "postgres",
//   host: "localhost",
//   database: "videos",
//   password: "",
//   port: 5432,

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

//export DATABASE_URL=postgres://postgres:@localhost:5432/cyf_ecommerce?sslmode=disable
//export port=9999

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "cyf_ecommerce",
//   password: "",
//   port: 5432,
// });
//from here
//\i ~/Downloads/cyf_ecommerce.sql

// from terminal
// heroku pg:psql -a cyf-ecommerce -f ~/Downloads/cyf_ecommerce.sql
//get product

//psql -h ec2-18-204-142-254.compute-1.amazonaws.com -p 5432 -U vzkfqqxnqszqez -W dfhftjpc14voga

//psql -h ec2-176-34-215-248.eu-west-1.compute.amazonaws.com -p 5432 -U ogspsozpkqzssl -W d838mflm23l9di
// provide password when prompted
router.get("/test", (req, res) => {
  res.send("Hello");
});

router.get("/", (req, res) => {
  const videoId = req.query.id;
  const videoOrder = req.query.order;
  let query;

  videoId
    ? (query = `SELECT * FROM videos WHERE id=${videoId}`)
    : (query = `SELECT * FROM videos ORDER BY rating ${
        videoOrder ? videoOrder : "desc"
      }`);

  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/", (req, res) => {
  const { title, url, rating } = req.body;

  if (!title || !url) {
    res.status(404).json({ error: "please enter all field" });
  }

  const query = `INSERT INTO videos (title,url,rating) VALUES ($1,$2,$3)`;
  pool
    .query(query, [title, url, rating ? rating : 0])
    .then(() => {
      res.send("new video has been added");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.delete("/:id", (req, res) => {
  const videoId = req.params.id;
  const query = "DELETE FROM videos WHERE id=$1";

  pool
    .query(query, [videoId])
    .then(() => {
      res.send(`video with the id of ${videoId} has been deleted`);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
module.exports = router;
