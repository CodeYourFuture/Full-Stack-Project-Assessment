import React from "react";
import VideoVote from "./VideoVote";

export default function VideoCard({ videos, setVideos }) {
  function handleDelete(id) {
    setVideos((previousVideos) =>
      previousVideos.filter((video) => video.id !== id)
    );
  }
  //take youtube id from url
  const videoCards = videos.map((video) => {
    const youtubeID = video.url.slice(
      video.url.indexOf("v=") + 2
    );
    return (
      <li key={video.id} className="videoCard">
        <p>{video.title}</p>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeID}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <VideoVote />
        <button
          className="deleteButton"
          onClick={() => handleDelete(video.id)}
        >
          DELETE
        </button>
      </li>
    );
  });

  return <ul>{videoCards}</ul>;
}
