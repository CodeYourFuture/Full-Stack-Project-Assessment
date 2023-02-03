const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");
const port = process.env.PORT || 8000;
const videos = require("./exampleresponse.json");
const path = require("path");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "videos_db",
  password: "Rabiealashmali-5",
  port: 5895,
});

const REGEXP =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtube\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
const isValidYoutubeUrl = (link) => {
  return link.trim().match(REGEXP) !== null;
};
app.use(express.json());
app.use(cors({ origin: "*" }));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/videos", (req, res) => {
  const query = "SELECT * FROM videos";
  pool
    .query(query)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((error) => {
      throw error;
    });
});

app.post("/videos", (req, res) => {
  let title = req.body.title;
  let url = req.body.url;

  const query = "INSERT INTO videos (title, url) VALUES ($1, $2)";
  pool
    .query(query, [title, url])
    .then(() => res.send("New video added successfully"))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

app.delete("/videos/:id", (req, res) => {
  let id = req.params.id;
  const query = "DELETE FROM videos WHERE id = $1";
  const values = [id];
  pool
    .query(query, values)
    .then((result) => {
      res.status(201).json({ message: "Video deleted" });
    })
    .catch((error) => {
      throw error;
    });
});
