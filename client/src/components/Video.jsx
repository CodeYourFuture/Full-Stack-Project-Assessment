import React from "react";
import VoteButton from "./VoteButton";

const Video = ({ videos, handleDeleteClick }) => {
  return videos.map((video) => {
    const { id, title, url } = video;
    const base_url = "https://www.youtube.com/embed/";
    return (
      <div className="wrapper" key={id}>
        <h2>{title}</h2>
        <VoteButton />
        <iframe
          width="350"
          height="315"
          src={base_url + url.slice(-11)}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div>
          <button
            className="button"
            type="button"
            onClick={() => handleDeleteClick(video.id)}
          >
            delete
          </button>
        </div>
      </div>
    );
  });
};
//validate youtube url
//https://stackoverflow.com/questions/28735459/how-to-validate-youtube-url-in-client-side-in-text-box

export default Video;
