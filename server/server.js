const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const { Client } = require("pg");

const cors = require("cors");
//use cors without installing it
app.use(cors());
//use body parser without installing
app.use(express.json());
let id = 1;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

// const pool = new Pool({
//   user: "rahwaghebremichael",
//   host: "localhost",
//   database: "videos",
//   password: "",
//   port: 5432,
// });
app.listen(port, () => console.log(`Listening on port ${port}`));

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
  client
    .query("SELECT * FROM videos")
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//post new videos
app.post("/", (req, res) => {
  const { title, url, rating } = req.body;
  if (title && matchYoutubeUrl(url)) {
    client
      .query("INSERT INTO videos(title,url,rating) values($1,$2, $3)", [
        title,
        url,
        rating
      ])
      .then(() => {
        res.sendStatus(201);
      })
      .catch(() => {
        res.sendStatus(500);
      });
    // data.push({ title, url, id: id++ });
  }
});
//get video using id
app.get("/:id", (req, res) => {
  const id = req.params.id;
  // const item = videos.find((v) => v.id === Number(id));

  client
    .query("SELECT * FROM videos WHERE  id=$1", [id])
    .then((result) => {
      if (result.rows.length === 0) res.status(404).send("Id not found");
      else res.status(200).json(result.rows);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// delete videos using id
app.delete("/:id", (req, res) => {
  const id = req.params.id;

  client
    .query("SELECT * FROM videos WHERE id= $1", [id])
    .then((result) => {
      if (result.row === 0) res.status(404).send("Video doesn't exist");
      else {
        client
          .query("DELETE FROM videos WHERE id= $1", [id])
          .then((result) => {
            res.status(200).send("video deleted");
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
