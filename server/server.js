const express = require("express");
const app = express();
const { Pool } = require("pg");
require("dotenv").config();

const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.listen(port, () => console.log(`Listening on port ${port}`));

function youtubeUrl(url) {
  const regex =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  if (url.match(regex)) {
    return true;
  }
  return false;
}
createRandomId = (arr) => {
  const randomId = Math.floor(100000 + Math.random() * 900000);
  const existingId = arr.some((video) => video.id === randomId);
  if (existingId) {
    createRandomId(arr);
  } else {
    return randomId;
  }
};

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [
//     {
//       id: 523523,
//       title: "Never Gonna Give You Up",
//       url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//       rating: 23,
//     },
//     {
//       id: 523427,
//       title: "The Coding Train",
//       url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//       rating: 230,
//     },
//     {
//       id: 82653,
//       title: "Mac & Cheese | Basics with Babish",
//       url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//       rating: 2111,
//     },
//     {
//       id: 858566,
//       title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//       url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//       rating: 11,
//     },
//     {
//       id: 453538,
//       title:
//         "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//       url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//       rating: 3211,
//     },
//     {
//       id: 283634,
//       title: "Learn Unity - Beginner's Game Development Course",
//       url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//       rating: 211,
//     },
//     {
//       id: 562824,
//       title: "Cracking Enigma in 2021 - Computerphile",
//       url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//       rating: 111,
//     },
//     {
//       id: 442452,
//       title: "Coding Adventure: Chess AI",
//       url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//       rating: 671,
//     },
//     {
//       id: 536363,
//       title: "Coding Adventure: Ant and Slime Simulations",
//       url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//       rating: 76,
//     },
//     {
//       id: 323445,
//       title: "Why the Tour de France is so brutal",
//       url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//       rating: 73,
//     },
//   ];

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_URL,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
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

app.post("/", (req, res) => {
  const { title, url } = req.body;

  if (title && youtubeUrl(url)) {
     pool
       .query("INSERT INTO videos(title, url) values ($1, $2)", [title, url])
       .then(() => {
         res.sendStatus(201);
       })
       .catch(() => {
         res.sendStatus(500);
       });
  }
});



app.get("/:id", (req, res) => {
  const videoId = req.params.id;
  pool
    .query("SELECT * FROM videos WHERE id=$1", [videoId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

//delete
app.delete("/:id", (req, res) => {
  const id = req.params.id;
pool
.query("SELECT * FROM videos WHERE id = $1", [id])
.then((result) => {
  if (result.rows.length === 0) res.status(404).send("Video not exist");
  else {
    pool
    .query("DELETE FROM videos WHERE id =$1", [id])
    .then((result) => {
      res.status(200).json( { message: "Video deleted"});
    })
    .catch((error) => {
      res.status(500).json(error);
    });
  }
})
.catch((error) => {
  res.status(500).json(error);
});
}); 

