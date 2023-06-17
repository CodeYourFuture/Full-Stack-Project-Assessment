const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const cors = require("cors");
const pool = require("./db");
const port = process.env.PORT || 5000;
app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
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

//GET "/"
// app.get("/", (req, res) => {
// Delete this line after you've confirmed your server is running
//   res.send(videos);
// });

// GET "/"
app.get("/videos", async (req, res) => {
  try {
    const allVideos = await pool.query("SELECT * FROM videos");
    res.json(allVideos.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// app.post("/videos", (req, res) => {
//   let data = req.body;
//   res.status(200).send(...videos, JSON.stringify(data));
// });

// POST a new Video

app.post("/videos", async (req, res) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      return res
        .status(400)
        .json({ result: "failure", message: "Title and URL are required" });
    }
    const newVideo = await pool.query(
      "INSERT INTO VIDEOS (title,url,rating) VALUES($1, $2, $3) RETURNING *",
      [title, url, 0]
    );
    res.json(newVideo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
cd 
app.get("/videos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const video = await pool.query("SELECT * FROM videos WHERE id = $1", [id]);

    if (video.rows.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    res.json(video.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// app.delete("/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = videos.findIndex((v) => v.id === id);
//   if (index === -1) {
//     return res
//       .status(404)
//       .json({ result: "failure", message: "Video not found" });
//   }
//   videos.splice(index, 1);
//   res.json({});
// });

// Delete a video by id

app.delete("/videos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query("DELETE FROM videos WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ result: "failure", message: "Video not found" });
    }
    res.json({ result: "success" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      result: "failure",
      message: "An error occurred while deleting the video",
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
