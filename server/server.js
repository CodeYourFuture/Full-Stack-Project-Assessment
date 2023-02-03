const express = require("express");
const { Pool } = require("pg");
require("dotenv").config()
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
//const dataVideos = require("./example.json")


const cors = require("cors");
app.use(cors());

// let videos = [
//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//   },
//      {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
       
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   },

//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//   },

//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//   },

//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//   },

//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },

//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },

// ];



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

//videos.push(dataVideos);
// GET "/"
app.get("/videos", (req, res) => {
  
  //res.send(videos).json;
  pool.query("SELECT * FROM videos")
  .then((result) => res.json(result.rows))
  .catch((error) => {
    //console.error(error);
    res.status(500).json(error);
  });

});

app.post("/videos", (req, res) => {
    const {title,url,rating} = req.body;
    const query = 'INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)';
    const values = [title, url, rating];
    pool.query
    (query, values)
        .then(result => {
            res.status(201).json({message: 'Video created'});
        })
        .catch(error => {
            throw error;

        }
    );
})
//`GET` "/videos/:id"
app.get("/videos/:id", (req, res) => {
  let videoId = req.params.id;
  pool.query('SELECT * FROM videos WHERE id=$1', [videoId])
  .then((result) => res.json(result.rows))
  .catch((error) => {
    res.status(500).json(error);
  });
});
app.delete("/videos/:id", (req, res) => {
  // 
  let vidId = parseInt(req.params.id);
  pool.query("DELETE from videos WHERE id=$1", [vidId]).then(() => res.send(`Video ${vidId} deleted`)).catch((error) => {
    console.error(error);
  });

})
app.listen(port, () => console.log(`Listening on port ${port}`));
