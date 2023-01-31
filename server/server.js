const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require('path')
const getPostgresClient = require("./postgresClient");
const app = express();
const paths = path.join(__dirname, '../client/build')

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.static(paths))
app.use(express.urlencoded({ extended: true }));

let videos = [
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

function maxId() {
  let idArray = videos.map((el) => el.id);
  return Math.max(...idArray);
}

//.....connecting to postgres
let client;

client = getPostgresClient();


// GET "/"
app.get("/", (req, res) => {
  res.sendFile("index.html")
})

app.get("/videos", (req, res) => {
  client.connect();
  client.query("SELECT * FROM video", (err, result) => {
    res.json(result.rows);
  });
});

app.get("/videos/:id", (req, res) => {
  const result = videos.find((el) => el.id === +req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.send("Video not found");
  }
});

app.post("/videos", (req, res) => {
  let { title, url } = req.body;
  client.query(
    `INSERT INTO video(title, url) values ($1, $2)`,
    [title, url],
    (err, result) => {
      res.status(203).json({ ...req.body });
    }
  );
});

app.delete("/videos/:id", (req, res) => {
  const id = req.params.id;
  client.query(`DELETE FROM video WHERE id = $1`, [id], (err, result) => {
    res.status(204).send(result.rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`, paths));
