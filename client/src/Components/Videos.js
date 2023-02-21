import React from "react";
import YoutubeVideos from "./YoutubeVideos";
import allvideos from "./Allvideos";

function showVideos(allvideo) {
    return <YoutubeVideos 
    title = {allvideo.title}
     link = {allvideo.url}   
     rating = {allvideo.rating}
    />
}

function Videos() {
return(
<div className="video-container">
{allvideos.map(showVideos)}
    {/* <YoutubeVideos 
title = {AllVideos[0].title}
link = {AllVideos[0].url}
rating = {AllVideos[0].rating}
    />

<YoutubeVideos 
title = {AllVideos[1].title}
link = {AllVideos[1].url}
rating = {AllVideos[1].rating}
    /> */}
</div>
)
}

export default Videos;