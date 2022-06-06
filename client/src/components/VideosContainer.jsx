import React from "react";
import "../App.css"
import Video from "./Video";

function VideosContainer({videos, loadVideos}) {

  return (
    <div className="container">
      <ul className="row">
        {videos.map((video) => {
          return (
            <Video loadVideos={loadVideos} key={video.id} video={video}></Video>
          );
        })}
      </ul>
    </div>
  );
}

export default VideosContainer;
