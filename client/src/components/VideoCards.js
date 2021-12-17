import React from "react";
import DeleteVideoButton from "./DeleteVideoButton";
import VoteContainer from "./VoteContainer";

const VideoCards = ({ videos, setVideos }) => {
  const deleteVideoHandler = (vidId) => {
    setVideos(
      videos.filter((video) => {
        return video.id !== vidId;
      })
    );
  };
  return videos.map((video) => {
    const slicedVideoSrc = video.url.substring(video.url.length - 11);
    const videoTitle = video.title;
    const videoRating = video.rating;
    const videoId = video.id;

    return (
      <li className="videoCard" key={video.id}>
        <h3>{videoTitle}</h3>
        <VoteContainer videoRating={videoRating} />
        <div>
          <iframe
            width="450"
            height="315"
            src={`https://www.youtube.com/embed/${slicedVideoSrc}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <DeleteVideoButton deleteVideo={deleteVideoHandler} videoId={videoId} />
      </li>
    );
  });
};
export default VideoCards;
