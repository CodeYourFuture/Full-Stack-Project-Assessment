import express from "express";
import {  getVideos , postVideos } from "../controller/videos.js"
const router = express.Router();


// view all videos
router.get("/", getVideos)


// post videos
router.post("/",postVideos)


export default router;