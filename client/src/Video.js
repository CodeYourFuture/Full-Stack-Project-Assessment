import React from "react";
import EmbedVideo from "./EmbedVideo";

function Video({video}) {
    return (
<div className="video-container" id={video.id}>
    <p>{video.title}</p>
    <EmbedVideo video={video}/>
</div>
    );
}
export default Video;