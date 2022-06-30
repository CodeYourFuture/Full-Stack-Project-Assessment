const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const app = express();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", (req, res) => {
  const { order } = req.query;
  let query = "SELECT * FROM videos";

  if (order === "DESC") {
    query += " ORDER BY rating DESC";
  } else {
    query += " ORDER BY rating ASC";
  }
  client
    .query(query)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.post("/", (req, res) => {
  const title = req.body.title;
  const url = req.body.url;
  const validYoutubeUrlPattern = new RegExp(
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/
  );
  if (title === "" || !url.match(validYoutubeUrlPattern)) {
    return res.status(400).json({
      msg: `${title === "" ? "Please add the video title" : url === "" ? "Please enter a Youtube Url" : "Please enter a valid YouTube Url"}`,
    });
  } /* else if () {

  } */ else {
    client
      .query("INSERT INTO videos (title, url, rating) VALUES ($1, $2, 0)", [title, url])
      .then((result) => {
        res.json({ videos: result.rows, msg: "Your video has been added" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
});

app.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id || id < 600000) {
    return res.status(400).json({ msg: `${id === "" ? "Id cannot be empty" : "Please add a valid id"}` });
  } else
    client
      .query("SELECT * FROM videos WHERE id = $1", [id])
      .then((result) => {
        if (result.rows.length === 0) {
          return res.json({ msg: "The requested video cannot be found" });
        } else {
          res.json({ videos: result.rows });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error });
      });
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  client
    .query("DELETE FROM videos WHERE id = $1", [id])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
