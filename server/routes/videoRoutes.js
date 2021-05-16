const express = require('express');

const router = express.Router();

const arrayOfVideosObj = require('../../exampleresponse.json');

// TODO: temporary solution just for now - implement MODEL - CONTROLLER

router
  .route('/')
  .get((req, res) => {
    res.status(200).json({
      status: 'success',
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

    res.status(200).json({
      status: 'success',

      data: newVideo,
    });
  });

module.exports = router;
