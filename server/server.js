const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

const { Client } = require("pg");
const client = new Client({
  host: "dpg-cjpi438jbais739i9cu0-a.frankfurt-postgres.render.com",
  user: "yesna",
  port: 5432,
  password: "bQKZH3lJNeXjDQ3gTORoUbEv4rUZGsaL",
  database: "videosdb_qitc",
  ssl: true,
});

client.connect(function (error) {
  if (error) {
    throw error;
  }
  console.log("connected to database");
});

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

// GET "/"
app.get("/", (req, res) => {
  client.query("select * from videos", (error, result) => {
    if (!error) {
      res.json(result.rows);
    } else {
      console.log(error.message);
    }
  });
  client.end;
});

// post"/"
app.post("/", (req, res) => {
  const { title, url } = req.body;
  client.query(
  "INSERT INTO videos (title, url, rating) VALUES ($1, $2, 0)",
  [title, url],
  (error, result) => {
    if (!error) {
      res.status(201).send("success");
    } else {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
}
)
});

app.get("/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  const video = videos.find((video) => video.id === videoId);
  res.status(200).send({ video });
});


app.delete("/:id", (req, res) => {
  const idFromInput = parseInt(req.params.id);
    client.query(
      "DELETE FROM videos WHERE id=($1)",[idFromInput],
      (error, result) => {
        if (!error) {
          res.status(201).send("success");
        } else {
          console.log(error.message);
          res.status(500).send("Internal Server Error");
        }
      }
    );
});

app.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const videoIndex = videos.findIndex((video) => video.id === id);

  if (videoIndex === -1) {
    return res
      .status(402)
      .json({ result: "failure", message: "Video could not be found" });
  }
  let myRating = Number(req.body.video.rating);

  console.log(`this is my req.body`, req.body);

  if (typeof myRating === "number") {
    videos[videoIndex].rating = myRating;
    console.log(`fix it`, videos[videoIndex].rating);
    console.log(`All videos`, videos);
    res.json({ video: videos[videoIndex] });
  } else {
    return res.status(401).json({ error: "Invalid rating count" });
  }
});
