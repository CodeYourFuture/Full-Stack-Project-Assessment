const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const uuid = require('uuid');

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


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const videos = [
  {
    id: 523523,
    title: "Never Gonna Give You Up",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 23,
  },
  {
    id: 523427,
    title: "The Coding Train",
    url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
    rating: 230,
  },
  {
    id: 82653,
    title: "Mac & Cheese | Basics with Babish",
    url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
    rating: 2111,
  },
  {
    id: 858566,
    title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
    rating: 11,
  },
  {
    id: 453538,
    title:
      "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
    url: "https://www.youtube.com/watch?v=4As0e4de-rI",
    rating: 3211,
  },
  {
    id: 283634,
    title: "Learn Unity - Beginner's Game Development Course",
    url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
    rating: 211,
  },
  {
    id: 562824,
    title: "Cracking Enigma in 2021 - Computerphile",
    url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
    rating: 111,
  },
  {
    id: 442452,
    title: "Coding Adventure: Chess AI",
    url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
    rating: 671,
  },
  {
    id: 536363,
    title: "Coding Adventure: Ant and Slime Simulations",
    url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
    rating: 76,
  },
  {
    id: 323445,
    title: "Why the Tour de France is so brutal",
    url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
    rating: 73,
  },
];
;

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
  const video = videos.filter((vid) => vid.id == id);
  res.send(video);
})

app.delete('/:id', (req, res) => {
  const id = req.params.id;
  const videoToDeleteIndex = videos.findIndex((vid) => vid.id == id);
  if(videoToDeleteIndex === -1) {
    res.send({
      result: "failure",
      message: "Video could not be deleted",
    });
    return;
  } else {
    videos.splice(videoToDeleteIndex, 1);
    res.send({"message": `Video with the id of ${id} deleted.`});
  }
})






app.listen(port, () => console.log(`Listening on port ${port}`));