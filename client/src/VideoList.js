// VideoList.js

import React from "react";
import Video from "./Video";

function VideoList(props) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      {props.videos.map((video) => (
        <Video key={video.id} id={video.id} title={video.title} url={video.url} rating={video.rating} onVote={props.onVote} onDelete={props.onDelete} />
      ))}
    </div>
  );
}

export default VideoList;
