import React from "react";
import ReactPlayer from "react-player";

function YoutubeVideo(props){
 
    return (
      <div>
        <ReactPlayer url={props.video.url} />
      </div>
    );
}

export default YoutubeVideo;