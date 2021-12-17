const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const { Pool } = require("pg");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const pool = new Pool({
  user: "acvncrtuuuvkcj",
  host: "ec2-54-171-25-232.eu-west-1.compute.amazonaws.com",
  database: "dbfdrh39r0baof",
  password: "c8cc5cbca01b3463ca0644c0359896352883024e614bf1f063d84d1cfc69f74e",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


// GET "/"
app.get("/", (req, res) => {
  const query = 'SELECT * FROM videos';
  pool.query(query, (error, result) => {
    if(error) {
      console.log(error);
      return res.send(error);
    } else {
      res.json(result.rows);
    }
  })
});

// POST "/"
app.post('/', (req, res) => {
  const { title, url} = req.body;
  const newVideo = {
    "title": title,
    "url": url,
    "rating": 0
  }
  if(!title || !url) {
    return res.status(400).send({
  "result": "failure",
  "message": "Video could not be saved"
})
  } else {
    pool.query('SELECT * FROM videos WHERE title=$1 AND url=$2', [title, url])
    .then((result) => {
      if(result.rows.length > 0) {
        return res.status(400).send(`This video with the title of ${title} and url of ${url} is already in videos.`)
      } else {
        pool.query('INSERT INTO videos (title, url, rating) VALUES ($1, $2, 0)', [title, url])
        .then(() => res.status(202).send(`The video has been added to the videos.`));
      }
    })
  }
}) 

app.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM videos WHERE id=$1';
  pool.query(query, [id])
  .then((result) => {
    if(result.rows.length === 0) {
      res.status(400).send(`There is no video with the id of ${id}`);
    } else {
      res.status(200).send(result.rows);
    }
  })
})

app.delete('/:id', (req, res) => {
  const videoId = req.params.id;
  const selectVideoQuery = 'SELECT * FROM videos WHERE id=$1';
  pool.query(selectVideoQuery, [videoId])
  .then((result) => {
    if(result.rows.length === 0) {
      res.status(400).send(`Could not delete! There is no video with the id of ${videoId}!`);
    }else {
      const deleteQuery = 'DELETE FROM videos WHERE id=$1';
      pool.query(deleteQuery, [videoId])
      .then(() => {
        res.send(`The video with the id of ${videoId} has been deleted!`);
      })
    }
  })
})



app.listen(port, () => console.log(`Listening on port ${port}`));