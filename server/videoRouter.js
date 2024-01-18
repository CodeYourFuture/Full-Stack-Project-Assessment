const express = require("express");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const moment = require("moment");

dotenv.config();
const videoRouter = express.Router();

// ----------------- Connect to Database -----------------

const db = new Pool({
  connectionString: process.env.URL_DB,
  ssl: { rejectUnauthorized: false },
});

db.connect();

// -------- GET ALL VIDEOS -------- "api/?order=asc || api/?order=desc" --------

const getAllVideos = (req, res) => {
  const order = req.query.order;

  const selectQuery = "SELECT * FROM videos";

  db.query(selectQuery)
    .then((result) => {
      if (order === "asc") {
        videos = result.rows.sort((a, b) => a.rating - b.rating);
      } else {
        videos = result.rows.sort((a, b) => b.rating - a.rating);
      }
      res.status(200).json({ data: videos });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

// -------------------------- POST A VIDEO-------- "/api/" --------------------------

const postAVideo = (req, res) => {
  const { title, url } = req.body;

  const insertQuery =
    "INSERT INTO videos" +
    "(title,url,rating,time) VALUES ($1,$2,$3,$4) RETURNING id";

  const values = [title, url, 0, moment().format()];

  db.query(insertQuery, values)
    .then((result) => {
      const newId = result.rows[0].id;
      res.status(200).json({
        result: `success with id: ${newId}`,
        message: "Thanks for sending your video.",
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

// -------------------------- GET ONE VIDEO -------- "/api/?title=" --------------------------

const getAVideo = (req, res) => {
  const { title, order } = req.query;

  const selectQuery =
    "SELECT * FROM videos WHERE lower(title) LIKE '%' || lower($1) || '%'";

  db.query(selectQuery, [title])
    .then((result) => {
      if (!result)
        res.status(404).json({
          result: "failure",
          message: "Video could not be found!",
        });
      else if (order === "asc") {
        result = result.rows.sort((a, b) => a.rating - b.rating);
      } else {
        result = result.rows.sort((a, b) => b.rating - a.rating);
      }
      res.status(200).json({ data: result });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

// -------------------------- DELETE A VIDEO -------- "/api/:id" --------------------------

const deleteAVideo = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(404).json({
      result: "failure",
      message: "Video could not be found!",
    });
  } else {
    const deleteQuery = "DELETE FROM videos WHERE id = $1";

    db.query(deleteQuery, [id])
      .then((result) => {
        if (!result) {
          res.status(404).json({
            result: "failure",
            message: "Video could not be found!",
          });
        } else {
          res.status(200).json({
            result: "success",
          });
        }
      })
      .catch((err) => res.status(500).json({ error: err }));
  }
};

// -------------------------- UPDATE A VIDEO -------- "/api/:id" --------------------------

const updateAVideo = (req, res) => {
  const id = parseInt(req.params.id);
  const { newRate } = req.body;

  if (isNaN(id)) {
    res.status(404).json({
      result: "failure",
      message: "Rating could not be updated!",
    });
  } else {
    const updateQuery = "UPDATE videos SET rating=$2 WHERE id=$1";

    db.query(updateQuery, [id, newRate])
      .then(() => {
        res.status(200).json({ result: "success" });
      })
      .catch((err) => res.status(500).json({ error: err }));
  }
};

// ------------- Routing-------------

videoRouter
  .route("/")
  .get(getAllVideos) //?order=""
  .post(postAVideo);

videoRouter.route("/:id").delete(deleteAVideo).put(updateAVideo);

videoRouter.route("/search/").get(getAVideo); //?title=""&order=""

module.exports = videoRouter;
