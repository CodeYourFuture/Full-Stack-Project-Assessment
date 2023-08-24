const express = require("express");
const CORS = require("cors");
const urid = require("urid");
const { Pool } = require("pg");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(CORS());
app.use(bodyParser.urlencoded({ extended: true }));

// database connection
const pool = new Pool({
  user: "coder",
  password: "glasgow321!",
  host: "localhost",
  database: "videos_storage",
  port: 5432,
});
//

// GET "/"
app.get("/", (req, res) => {
  const getVideos = async () => {
    try {
      const videos = await pool.query("SELECT * from videos");
      res.json(videos.rows);
    } catch (err) {
      console.log(err);
    } finally {
      pool.end();
    }
  };
  getVideos();
});

// POST "/"
app.post("/", (req, res) => {
  if (req.body.title === "" || req.body.url === "") {
    res.json({
      result: "failure",
      message: "Video could not be saved",
    });
  } else {
    const newVideo = {
      id: Number(urid(6, "num")),
      title: req.body.title,
      url: req.body.url,
      rating: 0,
      date_added: new Date(),
    };
    const postVideos = async (vid) => {
      try {
        await pool.query("INSERT INTO videos VALUES($1, $2, $3, $4, $5)", [
          vid.id,
          vid.title,
          vid.url,
          vid.rating,
          vid.date_added,
        ]);
        const videos = await pool.query("SELECT * from videos");

        res.json(videos.rows);
      } catch (err) {
        console.log(err);
      }
    };
    postVideos(newVideo);
  }
});

//GET by id
app.get("/:id", (req, res) => {
  if (Number.isInteger(Number(req.params.id))) {
    const getVideoById = async (id) => {
      try {
        const videos = await pool.query("SELECT * from videos WHERE id = $1", [
          id,
        ]);
        if (videos.rows.length === 0) {
          res.json({
            result: "failure",
            message: "Video does not exist",
          });
        } else {
          res.json(videos.rows);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getVideoById(Number(req.params.id));
  } else {
    res.json({
      result: "failure",
      message: "ID is not valid",
    });
  }
});

//DELETE by id
app.delete("/:id", (req, res) => {
  if (Number.isInteger(Number(req.params.id))) {
    const newVideo = videos.filter((vid) => vid.id !== Number(req.params.id));
    res.json(newVideo);
  } else {
    res.json({
      result: "failure",
      message: "Video could not be deleted.",
    });
  }
});
