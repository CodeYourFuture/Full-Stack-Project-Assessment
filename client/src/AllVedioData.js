// eslint-disable-next-line
import React, { useState } from "react";
import VideoData from "./VideoData";
function AllVideoData(props) {

return (
    <div className="row">
        {props.videoData.map(video => (
            // <p key={vedio.title}>{vedio.title}</p>
            <VideoData oneVideo={video}/>
   ))}
    </div>
    );
   }
export default AllVideoData;