import express from "express";
import {
  createVideo,
  deleteVideo,
  getAllVideos,
  getVideo,
} from "../controllers/videos";
const router = express.Router();
router.route("/").get(getAllVideos).post(createVideo);
router.route("/:id").get(getVideo).delete(deleteVideo);
export default router;
