const express = require("express");
const router = express.Router();

const videosController = require("../controllers/videosController");

router.get("/", videosController.getAllVideos);
router.get("/:id", videosController.getVideoById);
router.post("/", videosController.addVideo);
router.put("/:id", videosController.updateVideo);
router.put("/:id/favourite", videosController.toggleFavourite);
router.delete("/:id", videosController.deleteVideo);

module.exports = router;
