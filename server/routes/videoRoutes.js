const express = require("express");

const router = express.Router();

let arrayOfVideosObj = require("../../exampleresponse.json");

// TODO: temporary solution just for now - implement MODEL - CONTROLLER

router
  .route("/")
  .get((req, res) => {
    res.status(200).json({
      status: "success",
      length: arrayOfVideosObj.length,
      data: arrayOfVideosObj,
    });
  })
  .post((req, res) => {
    const id = arrayOfVideosObj[arrayOfVideosObj.length - 1].id + 2;
    console.log(req.body);
    const { url, title } = req.body;

    const newVideo = {
      id,
      title,
      url,
    };

    //dirty temporary solution - mutating existing array
    arrayOfVideosObj.push(newVideo);

    res.status(201).json({
      status: "success",

      data: newVideo,
    });
  });

router
  .route("/:id")
  .get((req, res) => {
    const query = req.params.id;

    const video = arrayOfVideosObj.find((item) => +item.id === +query);

    if (!video) {
      return res.status(404).json({
        status: "fail",
        msg: "No video with this id",
      });
    }
    res.status(200).json({
      status: "success",

      data: video,
    });
  })
  .delete((req, res) => {
    const query = req.params.id;

    const index = arrayOfVideosObj.findIndex((item) => +item.id === +query);
    if (index === -1) {
      return res.status(404).json({
        status: "fail",
        msg: "No video with this id",
      });
    }

    arrayOfVideosObj = arrayOfVideosObj.slice(index, 1);
    res.status(204).json({
      status: "success",

      data: [],
    });
  })
  .patch((req, res) => {
    // !IMPORTANT: How to do up and down vote within DB
    // TEMPORARY SOLUTION
    const query = req.params.id;
    const { vote } = req.body;
    const index = arrayOfVideosObj.findIndex((item) => +item.id === +query);
    if (index === -1) {
      return res.status(404).json({
        status: "fail",
        msg: "No video with this id",
      });
    }

    const arrayOfVideosObjCopy = [...arrayOfVideosObj];
    arrayOfVideosObjCopy[index].rating = arrayOfVideosObj[index].rating + +vote;
    arrayOfVideosObj = [...arrayOfVideosObjCopy];

    res.status(200).json({
      status: "success",

      data: arrayOfVideosObj[index],
    });
  });

module.exports = router;
