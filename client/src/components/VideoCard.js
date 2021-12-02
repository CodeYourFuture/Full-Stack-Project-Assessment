import React from "react";
import VideoVote from "./VideoVote";

const VideoCard = ({ videoData, setVideoData }) => {
  //console.log(videos);
  function handleDelete(id) {
    const deletedItem = videoData.filter((video) => video.id !== id);
    // console.log(deletedItem);
    setVideoData(deletedItem);
  }

  return (
    <div className="flex-container">
      {videoData.map((video) => {
        //console.log(video);
        return (
          <div key={video.id}>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => handleDelete(video.id)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <p className="title">{video.title}</p>
            <iframe
              className="video"
              src={`https://www.youtube.com/embed/${video.url.slice(32)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <VideoVote />
          </div>
        );
      })}
    </div>
  );
};

export default VideoCard;
