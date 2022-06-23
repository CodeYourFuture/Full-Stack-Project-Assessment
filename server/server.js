const express = require("express");
const app = express();
const { Client } = require("pg");
const cors = require("cors");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

function matchYoutubeUrl(url) {
  const regex =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(regex)) {
    return true;
  }
  return false;
}

//get all videos
app.get("/", (req, res) => {
  return client
    .query("select * from videos")
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log("an error just occurred");
      res.status(500).send("a problem occurred");
    });
});

// to create new video
app.post("/", (req, res) => {
  const { title, url, rating } = req.body;
  if (title && matchYoutubeUrl(url))
    return client
      .query("INSERT INTO videos (title, url, rating) VALUES($1, $2, $3)", [
        title,
        url,
        rating,
      ])
      .then(() => res.send("New video added"))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
});

// select a video
app.get("/:id", (req, res) => {
  const videoId = req.params.id;

  return client
    .query("SELECT * FROM videos WHERE id = $1", [videoId])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log("an error just occurred");
      res.status(500).send("a problem occurred");
    });
});

// delete a video
app.delete("/:id", (req, res) => {
  const videoId = req.params.id;

  return client
    .query("DELETE FROM videos WHERE id=$1", [videoId])
    .then(() => res.send(`Order ${videoId} deleted`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
