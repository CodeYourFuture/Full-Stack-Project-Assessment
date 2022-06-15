const express = require("express");
//const uuid = require("uuid");

const videoData = require("../../client/src/exampleresponse.json");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(videoData);
});

router.get("/:id", (req, res) => {
  res.send(videoData.filter((video) => video.id === parseInt(req.params.id)));
});

router.post("/", (req, res) => {
  const { title, url, rating } = req.body;

  if (!title || !url) {
    res.status(404).json({ error: "please enter all field" });
  }
  const newVideo = { id: uuid, title, url, rating };
  videoData.push(newVideo);
  res.send(videoData);
});

router.delete("/:id", (req, res) => {
  res.send(videoData.filter((video) => video.id !== parseInt(req.params.id)));
});
module.exports = router;
