import { useState } from "react";
import Video from "./Video";
const VideoLists = ({ allVideos, getAllVideos }) => {
  const [backDeleteMessage, setBackDeleteMessage] = useState("");

  const getDeleteMessage = (deleteMessage) => {
    setBackDeleteMessage(deleteMessage);
  };

  setTimeout(() => {
    setBackDeleteMessage("");
  }, 4000);

  return (
    <>
      {backDeleteMessage && (
        <div className="error-message">
          <h3>{backDeleteMessage}</h3>
        </div>
      )}
      <div className="video-lists">
        {allVideos.map((video) => (
          <Video
            key={video.id}
            id={video.id}
            ratingUp={video.ratingup}
            ratingDown={video.ratingdown}
            title={video.title}
            url={video.url}
            getAllVideos={getAllVideos}
            getDeleteMessage={getDeleteMessage}
          />
        ))}
      </div>
    </>
  );
};

export default VideoLists;
