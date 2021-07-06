const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { Pool } = require("pg");
const router = express.Router();
let videos = require("../exampleresponse.json");

const db = new Pool({
  host: "localhost",
  port: "5432",
  user: "postgres",
  password: "",
  database: "videos",
});

router.get("/load", function (req, res) {
  const err = [];
  videos.forEach((video) => {
    const text = `INSERT INTO video (title, created, rating, url) VALUES ($1, $2, $3,$4)`;
    const values = [
      video.title,
      "2020-01-01 04:05:06",
      video.rating,
      video.url,
    ];
    db.query(text, values, (db_err, db_res) => {
      if (db_err) {
        err.push(db_err);
      }
    });
  });

  if (err.length > 0) {
    res.send(JSON.stringify(err));
  } else {
    res.json({ message: "success" });
  }
});

router.get("/", function (req, res) {
  if (req.query.order === "asc") {
    res.json(videos.sort((a, b) => a.rating - b.rating));
  } else if (req.query.order === "desc") {
    res.json(videos.sort((a, b) => b.rating - a.rating));
  } else {
    res.json(videos.sort((a, b) => b.rating - a.rating));
  }
});

router.get("/:id", function (req, res) {
  res.json(videos.filter((item) => item.id.toString() === req.params.id));
});

router.put("/:id", function (req, res) {
  videos = videos.map((video) =>
    video.id.toString() === req.params.id
      ? { ...video, rating: req.body.rating }
      : video
  );

  if (true) {
    // succesfull
    res.json({});
  } else {
    res.json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

router.delete("/:id", function (req, res) {
  videos = videos.filter((video) => video.id.toString() !== req.params.id);
  if (true) {
    res.json({});
  } else {
    res.status(406).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});

router.post("/", (req, res) => {
  const data = {
    ...req.body,
    id: uuidv4(),
    rating: 0,
    time: new Date(),
  };
  videos.push(data);
  if (true) {
    // succesfull
    res.json({ id: data.id });
  } else {
    res.json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

module.exports = router;
