import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import VideoCard from "./VideoCard";
import NewVideo from "./NewVideo";
import "../../styles/videocards.css";

const VideoCards = () => {
  const { videoData, setNewVideo, newVideo } = useContext(UserContext);

  return (
    <article className="videoCards_container">
      {videoData.map((video) => {
        return <VideoCard key={video.id} video={video} />;
      })}
      <button
        className="addNewVideo_btn"
        type="button"
        onClick={() => setNewVideo(true)}
      >
        Add new video
      </button>
      {newVideo && <NewVideo />}
    </article>
  );
};

export default VideoCards;
