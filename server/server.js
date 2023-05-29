const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3005;

const app = express();

const videoData = require("./DBConfig");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET
app.get("/", (req, res) => {
  res.send("You are on Andriana's video server");
});

// GET ALL VIDEOS
app.get("/videos", (req, res) => {
  const order = req.query.order || null;

  let query = "SELECT * FROM videos";

  if (order) {
    query += ` ORDER BY rating ${order.toUpperCase()}`;
  }

  videoData
    .query(query)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(400).json({ error: "No videos available" });
      } else {
        return res.status(200).json(result.rows);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// POST VIDEO
app.post("/video", async (req, res) => {
  try {
    const newTitle = req.body.title;
    const newURL = req.body.url;

    const postQuery = `INSERT INTO videos(id, title, url, rating, date) VALUES ($1, $2, $3, $4, $5)`;
    const getQuery = `SELECT 1 FROM videos WHERE url = $1`;

    const randomID = Math.floor(100000 + Math.random() * 900000);
    const randomRating = Math.floor(100 + Math.random() * 900);
    const postDate = new Date().toLocaleString();
    const word = "youtube";

    const result = await videoData.query(getQuery, [newURL]);
    if (result.rowCount > 0) {
      throw { error: "Video already exists" };
    } else if (!newTitle || !newURL) {
      throw { error: "Please fill all fields" };
    } else if (!newURL.includes(word)) {
      throw { error: "Enter valid YouTube address" };
    } else if (newURL.length > 43) {
      throw { error: "YouTube address exceeds permitted limit" };
    }

    await videoData.query(postQuery, [
      randomID,
      newTitle,
      newURL,
      randomRating,
      postDate,
    ]);

    res.status(200).json({ message: "New Video added" });
  } catch (error) {
    res.json(error);
  }
});

// GET BY ID
app.get("/video/:id", (req, res) => {
  const videoID = parseInt(req.params.id);

  const idQuery = "SELECT * FROM videos WHERE id = $1";

  videoData
    .query(idQuery, [videoID])
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(400).json({ message: `Video ${videoID} not found` });
      } else {
        res.status(200).json(result.rows);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// UPDATE BY ID
app.put("/video/:id", (req, res) => {
  const videoID = parseInt(req.params.id);
  const newRating = req.body.rating;
  const newDate = req.body.date;

  const updateQuery = "UPDATE videos SET rating = $2, date = $3 WHERE id = $1";

  videoData
    .query(updateQuery, [videoID, newRating, newDate])
    .then(() => res.status(200).send("Video updated"))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// DELETE BY ID
app.delete("/video/:id", (req, res) => {
  const videoID = parseInt(req.params.id);

  const deleteQuery = "DELETE FROM videos WHERE id=$1";

  videoData
    .query(deleteQuery, [videoID])
    .then(() => res.status(200).json({ message: `Video ${videoID} deleted` }))
    .catch((error) => console.log(error));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
