import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { v4: uuidv4 } = require("uuid");
const youTubeVideos = require("../data/videos.json");


export const getVideos = (req,res) => {
    res.json(youTubeVideos)
}


export const postVideos = (req,res) => {
    const date = new Date()
    const newVideo = {
            id:uuidv4(),
            title:req.body.title,
            url:req.body.url,
            rating:0,
            date:`${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`
    }
    if(!newVideo.title || !newVideo.url){
        return res.status(400).json({ msg: "please make sure that you have all field" });
    }else if(!newVideo.url.includes("youtube.com")) {
        return res.status(400).json({ msg:"please make sure you have added youtube videos"})
    }
    youTubeVideos.push(newVideo)
    res.status(200).json(newVideo)
}



