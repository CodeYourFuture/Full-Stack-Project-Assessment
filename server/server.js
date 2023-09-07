const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const randomIntFromInterval = require("./utils/randomIntFromInterval");
const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

const client = new Client({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

app.get("/", (req, res) => {
  client
    .query(`select * from videos`)
    .then((result) => {
      const videos = result.rows;
      res.json(videos);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/", (req, res) => {
  if (!req.body || !req.body.title || !req.body.url) {
    res.status(400).send("Bad Request: Missing title or url field");
    return;
  }

  client
    .query(`select max(id) from videos`)
    .then((result) => {
      const maxId = result.rows[0].max;
      const newVideo = {
        id: randomIntFromInterval(maxId + 1, maxId + 10),
        title: req.body.title,
        url: req.body.url,
        rating: 0,
      };
      client
        .query(
          `insert into videos (id, title, url, rating) values ($1, $2, $3, $4)`,
          [newVideo.id, newVideo.title, newVideo.url, newVideo.rating]
        )
        .then(() => {
          res.json(newVideo);
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  client
    .query(`select * from videos where id = $1`, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).send("Video not found");
      } else {
        const video = result.rows[0];
        res.json(video);
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Internal Server Error");
    });
});

app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  client
    .query(`delete from videos where id = $1`, [id])
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).send({
          result: "failure",
          message: "Video could not be deleted",
        });
      } else {
        res.json({ message: "Video deleted" });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Internal Server Error");
    });
});

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

process.on("SIGINT", () => {
  console.log("Shutting down server");
  server.close(() => {
    console.log("Server shut down");
    client.end();
  });
});
