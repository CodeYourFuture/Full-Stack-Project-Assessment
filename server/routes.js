const { getVideos, addVideo, deleteVideo } = require("./videoService");

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  getVideos().then(videos => {
    res.json(videos);
  })
});

router.get("/:id", (req, res) => {
  getVideos(req.params.id).then((video) => {
    res.json(video);
  });
});

router.post("/", async (req, res) => {

  if (req.body.title && req.body.url) {
    return res.json(await addVideo(req.body));
  } else {
    return res.json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

router.delete("/:id", (req, res) => {
  deleteVideo(req.params.id).then((response) => {
    if (response && response.result) {
      res.status(404);
      res.json(response);
    }else {
      res.status(200);
      res.send( `${req.params.id} successfully deleted`);
    }
  });
});

module.exports = router;
