import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import VideoCard from "./VideoCard";

const VideoCards = () => {
  const { videoData } = useContext(UserContext);
  return (
    <article>
      {videoData.map((video) => {
        return <VideoCard key={video.id} video={video} />;
      })}
    </article>
  );
};

export default VideoCards;
