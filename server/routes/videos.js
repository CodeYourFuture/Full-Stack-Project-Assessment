const express = require("express");
const router = express.Router();
let videosData = require("../data/data");

router.get("/", function (request, response) {
  response.json(videosData);
});

router.get("/:id", function (request, response) {
  let id = parseInt(request.params.id);
  let filteredMessage = videosData.find((el) => el.id === id);
  if (!filteredMessage) {
    res.status(400).send("Video not found for given id");
  }
  response.json(filteredMessage);
});

router.post("/", function (request, response) {
  let newVideo = {
    id: videosData[videosData.length - 1].id + 1,
    title: request.body.title,
    video_id: request.body.video_id,
    categories:request.body.categories,
    favorites:request.body.favorites,
    votes:request.body.votes,

  };

  if (!newVideo.title || !newVideo.video_id) {
    return response.status(400).json({
      status_code: 0,
      error_msg: "Require Params Missing",
    });  }
  videosData.push(newVideo);
  response.status(200).json({
    status_code: 1,
    data: newVideo,
  });
});


router.delete("/:id", function (request, response) {
  let id = parseInt(request.params.id);
  let deletedVideo = videosData.find((el) => el.id === id);
  if (deletedVideo) {
    videosData = videosData.filter(
      (video) => video.id !== id
    );

    response.json({
      msg: "Video deleted",

      videosData,
    });
  } else {
    response.status(400).send("Message not existing given id");
  }
});

router.put("/:id", function (request, response) {
  let id = parseInt(request.params.id);
  let foundVideo = videosData.find((el) => el.id === id);
  if (foundVideo) {
    videosData.forEach((video) => {
      if (video.id === parseInt(request.params.id)) {
        foundVideo.title = request.body.title
          ? request.body.title
          : foundVideo.title;
        foundVideo.video_id = request.body.video_id
          ? request.body.video_id
          : foundVideo.video_id;
        foundVideo.categories = request.body.categories
        ? request.body.categories
        : foundVideo.categories;
        foundVideo.favorites = request.body.favorites
          ? request.body.favorites
          : foundVideo.favorites;
        foundVideo.votes = request.body.votes
        ? request.body.votes
        : foundVideo.votes;

        response.json({ msg: "message updated", video });
      }
    });
  } else {
    response.sendStatus(400);
  }
});

module.exports = router;