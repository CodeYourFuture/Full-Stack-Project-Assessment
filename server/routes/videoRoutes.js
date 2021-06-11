const express = require("express");

const router = express.Router();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

//BRUTAL POWER
// let arrayOfVideosObj = require('../../exampleresponse.json');
// arrayOfVideosObj.forEach((item) => {
//   client
//     .query('INSERT INTO videos ( title, url, rating ) VALUES ($1, $2, $3)', [
//       item.title,
//       item.url,
//       item.rating,
//     ])
//     .then((item) => console.log(item))
//     .catch((error) => console.log(error));
// });

// TODO: temporary solution just for now - implement MODEL - CONTROLLER

router
  .route("/")
  .get(async (req, res) => {
    try {
      const AllVideos = await client.query(`SELECT * FROM videos`);

      res.status(200).json({
        status: "success",
        length: AllVideos.rows.length,
        data: AllVideos.rows,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        msg: error.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      // const id = arrayOfVideosObj[arrayOfVideosObj.length - 1].id + 2;
      // console.log(req.body);
      const { url, title } = req.body;

      const video = await client.query(
        `INSERT INTO videos (title, url) VALUES ($1, $2) RETURNING video_id, url, title`,
        [title, url]
      );

      // console.log(video);
      // const newVideo = {
      //   id,
      //   title,
      //   url,
      //   rating: 0,
      // };

      //dirty temporary solution - mutating existing array
      // arrayOfVideosObj.push(newVideo);

      res.status(201).json({
        status: "success",
        data: video.rows[0],
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        msg: error.message,
      });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const query = req.params.id;

      // const video = arrayOfVideosObj.find((item) => +item.id === +query);
      const video = await client.query(
        `SELECT * FROM videos WHERE video_id = $1`,
        [query]
      );

      console.log(video.rowCount);
      if (video.rowCount === 0) {
        return res.status(404).json({
          status: "fail",
          msg: "No video with this id",
        });
      }
      res.status(200).json({
        status: "success",

        data: video.rows[0],
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        msg: error.message,
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const query = req.params.id;

      await client.query(`DELETE FROM videos WHERE video_id = $1`, [query]);

      // const index = arrayOfVideosObj.findIndex((item) => +item.id === +query);
      // if (index === -1) {
      //   return res.status(404).json({
      //     status: 'fail',
      //     msg: 'No video with this id',
      //   });
      // }

      // arrayOfVideosObj = [
      //   ...arrayOfVideosObj.slice(0, index),
      //   ...arrayOfVideosObj.slice(index + 1),
      // ];
      res.status(200).json({
        status: "success",

        data: [],
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        msg: error.message,
      });
    }
  })
  .patch(async (req, res) => {
    try {
      // !IMPORTANT: How to do up and down vote within DB
      // TEMPORARY SOLUTION
      const query = req.params.id;
      const { vote } = req.body;

      const video = await client.query(
        `SELECT * FROM videos WHERE video_id = $1`,
        [query]
      );

      // console.log(video.rows[0]);
      // const video = arrayOfVideosObj.findIndex((item) => +item.id === +query);
      if (video.rowCount === 0) {
        return res.status(404).json({
          status: "fail",
          msg: "No video with this id",
        });
      }

      const videoPatched = video.rows[0];
      const newValue = videoPatched.rating + vote;
      const videoUpdated = await client.query(
        `UPDATE videos SET rating = $1 WHERE video_id = $2 RETURNING video_id, url, title, rating`,
        [newValue, videoPatched.video_id]
      );
      console.log(videoUpdated.rows[0]);
      // console.log(videoPatched);
      // const arrayOfVideosObjCopy = [...arrayOfVideosObj];
      // arrayOfVideosObjCopy[index].rating =
      //   arrayOfVideosObj[index].rating + +vote;
      // arrayOfVideosObj = [...arrayOfVideosObjCopy];

      res.status(200).json({
        status: "success",

        data: videoUpdated.rows[0],
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        msg: error.message,
      });
    }
  });

module.exports = router;
