import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import VideoCard from "./VideoCard";
import NewVideo from "./NewVideo";
import "../../styles/videocards.css";

const VideoCards = () => {
  const { videoData, setNewVideo, newVideo } = useContext(UserContext);

  return (
    <article>
      {videoData.map((video) => {
        return <VideoCard key={video.id} video={video} />;
      })}
      <button type="button" onClick={() => setNewVideo(true)}>
        Add new video
      </button>
      {newVideo && <NewVideo />}
    </article>
  );
};

export default VideoCards;
