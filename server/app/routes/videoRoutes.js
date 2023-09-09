const express = require("express");
const videoController = require("../controllers/videoController");

const router = express.Router();


router.get("/", videoController.getVideos);
router.post("/", videoController.createVideo);
router.get("/:id", videoController.getVideoById);
router.delete("/:id", videoController.deleteVideo);

module.exports = router;
