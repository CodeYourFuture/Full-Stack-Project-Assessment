import express from "express";
import {  getVideos, remove, order, search, postVideos  } from "../controller/sql_videos.js"
const router = express.Router();

// video order
router.get("/", order)

// view all videos
router.get("/", getVideos)

// post videos
router.post("/", postVideos)

// delete video
router.delete("/:id", remove);

// video search
router.get("/search", search)








export default router;