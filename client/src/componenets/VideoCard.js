import React, { useState } from "react";
import VoteButtons from "./VoteButtons";

const VideoCard = (props) => {
  const [videos, setVideos] = useState(props.videos);
  console.log(videos);

  const deleteHandler = (id) => {
    setVideos(
      videos.filter((video) => {
        return video.id !== id;
      })
    );
  };

  //   const youVids =

  return videos.map((video) => {
    const indexNum = video.url.indexOf("?v=");
    const videoId = video.url.slice(indexNum + 3);
    return (
      <div className="videoCard">
        <h5> {video.title}</h5>
        <iframe
          className="rounded border "
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameborder="1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <VoteButtons videos={videos} />
        <button onClick={() => deleteHandler(video.id)}>Delete</button>
      </div>
    );
  });
};

export default VideoCard;
