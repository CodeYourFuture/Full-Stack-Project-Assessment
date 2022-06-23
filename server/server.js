const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");

app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "full_stack_project",
  password: "",
  port: 5432,
});

app.get("/api/", async (req, res) => {
  let { order } = req.query;
  let sortedVideos = [];
  try {
    const videos = await pool.query("SELECT * FROM videos");
    if (order === "desc")
      sortedVideos = videos.rows.sort((a, b) => b.rating - a.rating);
    if (order === "asc")
      sortedVideos = videos.rows.sort((a, b) => a.rating - b.rating);
    return res.json(sortedVideos);
  } catch (e) {
    console.log(e);
    res.status(400).json("Something went wrong");
  }
});

app.delete("/api/:id", async (req, res) => {
  const requestedID = req.params.id;
  const deletedVideo = await pool.query("DELETE FROM videos WHERE id = $1", [
    requestedID,
  ]);
  if (deletedVideo.rowCount !== 0) {
    return res.json({
      msg: `Video with title: ${requestedID} has been deleted`,
    });
  } else {
    return res
      .status(404)
      .json({ msg: `Video with id ${requestedID} not found.` });
  }
});

app.post("/api/", async (req, res) => {
  const { title, url, rating } = req.body;
  const newVideo = {
    title: title.charAt(0).toUpperCase() + title.slice(1),
    url,
    rating: Number(rating),
  };
  try {
    const urlAlreadyExist = await pool.query(
      "SELECT * FROM videos WHERE url = $1",
      [url]
    );
    if (urlAlreadyExist.rowCount)
      return res.status(400).json("This video is already in your list");
    else {
      const isEmptyKey = Object.values(newVideo).some(
        (x) => x === null || x === ""
      );
      const ratingValidator = Number.isInteger(newVideo.rating);
      const errorMessage = {};
      if (isEmptyKey) {
        errorMessage.msgMissingKey = "Some information is missing";
      }
      if (!ratingValidator) {
        errorMessage.wrongInput = "Rating input is incorrect";
      }
      if (Object.keys(errorMessage).length) {
        return res.status(400).json(errorMessage);
      }
      try {
        const addedVideo = await pool.query(
          `INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3) RETURNING id`,
          [newVideo.title, newVideo.url, newVideo.rating]
        );
        return res.json({
          msg: `You have submitted new video with title: ${newVideo.title}.`,
        });
      } catch (e) {
        res.status(400).json("Something went wrong");
      }
    }
  } catch (e) {
    res.status(400).json("Something went wrong");
  }
});

app.put("/api/:id", async (req, res) => {
  const requestedID = req.params.id;
  try {
    const foundVideo = await pool.query(
      "SELECT title FROM videos WHERE id = $1",
      [requestedID]
    );
    if (foundVideo.rowCount) {
      const { rating } = req.body;
      try {
        const updatedVideo = await pool.query(
          "UPDATE videos SET rating = $1 WHERE id = $2",
          [rating, requestedID]
        );
        return res
          .status(200)
          .json({
            msg:
              `Video rating with title ` +
              foundVideo.rows[0].title +
              ` has been updated`,
          });
      } catch (e) {
        return res.status(400).json({ msg: "couldn't update rating" });
      }
    } else {
      res
        .status(400)
        .json({ msg: `Member with id of ${req.params.id} not found` });
    }
  } catch (e) {
    res.status(400).json({ msg: "selection failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
