import React, { useState } from "react";

const VideoCard = (props) => {
  const [videos, setVideos] = useState(props.videos);

  console.log(videos);
  const youVids = videos.map((video) => {
    console.log(video.url);
    const indexNum = video.url.indexOf("?v=");
    console.log(indexNum);
    const videoId = video.url.slice(indexNum + 3);
    console.log(videoId);
    return (
      <div>
        <h5> {video.title}</h5>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    );
  });
  return youVids;
};

export default VideoCard;
