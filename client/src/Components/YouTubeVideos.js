import React from "react";
import DeleteVideo from "./DeleteVideo";
import Votes from "./Votes";

const YouTubeVideos = ({ id, title, url, rating, deleteVideo }) => {
  return (
    <div className='aVideo'>
      <h3>{title}</h3>
      <Votes rating={rating} />
      <iframe
        width="560"
        height="315"
        // original url would not work, need to use "embed/" to display video
        src={url.replace("watch?v=", "embed/")}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <DeleteVideo deleteVideo={deleteVideo} id={id} />
    </div>
  );
};

export default YouTubeVideos;
