const express = require("express");
const router = express.Router();
const {
  postVideo,
  getVideo,
  getVideos,
  deleteVideo
} = require('../controllers/videoController.js')
router.get('/', getVideos);
router.get('/:id', getVideo);
router.delete('/:id', deleteVideo);
router.post('/', postVideo);
module.exports = router;