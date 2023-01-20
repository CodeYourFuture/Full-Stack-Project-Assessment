import React, { useState } from "react";
import EmbedVideo from "./EmbedVideo";
import LikeButton from "./buttons/LikeButton";
import DislikeButton from "./buttons/DisLikeButton";

function Video({video}) {
    const [count,setCount] = useState(video.rating);
    const increment = () => {
        setCount(count + 1);
    }
    const decrement = () => {
        setCount(count - 1);
    }
    return (
<div className="video-container" id={video.id}>
    <p>{video.title}</p>
    <div className = 'vote-container'>
        <LikeButton increment={increment}/>
        <p>{count}</p>
        <DislikeButton decrement={decrement}/>
    </div>
    <EmbedVideo video={video}/>
</div>
    );
}
export default Video;