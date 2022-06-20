import React from "react";

import DisplayVideo from "./DisplayVideo.js";

const FetchVideos = (props) => {
  let listOfVideos = props.theVideos;
  let videosIndices = props.theIndices;

  return (
    <ul className="vid-list">
      {videosIndices.map((element, index) => {
        let video = listOfVideos[element];

        return (
          <DisplayVideo
            key={index}
            videoIndex={element}
            videoId={video.id}
            videoUrl={video.url}
            videoRating={video.rating}
            videoInfo={props.videoInfo}
          />
        );
      })}
    </ul>
  );
};

export default FetchVideos;
