const express = require("express");
const uuid = require("uuid");
const fs = require("fs");

const data = fs.readFileSync("exampleresponse.json");
const videoData = JSON.parse(data);
console.log(videoData);
//const videoData = require("../exampleresponse.json");

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

  const newVideo = { id: uuid.v4(), title, url, rating };
  const data = JSON.stringify([...videoData, newVideo], null, 2);
  fs.writeFile("exampleresponse.json", data, finished);
  function finished() {
    const reply = { msg: "new video added" };
    res.send(reply);
  }
});

router.delete("/:id", (req, res) => {
  res.send(videoData.filter((video) => video.id !== parseInt(req.params.id)));
});
module.exports = router;
