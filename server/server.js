const express = require("express");
const CORS = require("cors");
// const urid = require("urid");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./development.env" });
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(CORS());
app.use(bodyParser.urlencoded({ extended: true }));

// database connection
const pool = new Pool();
//

// GET "/"
app.get("/", (req, res) => {
  const getVideos = async () => {
    try {
      const videos = await pool.query("SELECT * from videos");
      res.json(videos.rows);
    } catch (err) {
      console.log(err);
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
      id: Math.round((Math.random() + 1) * 100000),
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
    const deleteVideoById = async (id) => {
      try {
        const videos = await pool.query("DELETE FROM videos WHERE id = $1", [
          id,
        ]);
        if (videos.rowCount === 1) {
          res.json({
            result: "success",
            message: "Video successfully deleted",
          });
        } else {
          res.json({
            result: "failure",
            message: "ID does not match any video",
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    deleteVideoById(Number(req.params.id));
  } else {
    res.json({
      result: "failure",
      message: "Video could not be deleted.",
    });
  }
});
