import React from "react";
import ButtonVote from "./ButtonVote";
import ButtonDelete from "./ButtonDelete";
import YouTubeVideo from "./YouTubeVideo";

const YouTubeVideoList = (props) => {
  return props.videos.map((video) => {
    const embedID = video.url.split("v=")[1].substring(0, 11);

    return (
      <div key={video.id} className="row">
        <div className="col-sm">
          <YouTubeVideo videoTitle={video.title} videoUrlId={embedID} />
          <ButtonVote rating={video.rating} />
          <ButtonDelete videoId={video.id} removeVideo={props.handleClick} />
        </div>
      </div>
    );
  });
};

export default YouTubeVideoList;
