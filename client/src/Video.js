import React from "react";

const Video = ({ video }) => {
  let videoID = video.url.split("=")[1];
  const handleUpVote = (video) => {};

  const handleDownVote = (video) => {};

  const handleRemoveVideo = (video) => {};
  return (
    <div className="video">
      <h3>{video.title}</h3>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoID}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <p>Votes: {video.votes}</p>
      <button onClick={handleUpVote}>Up Vote</button>
      <button onClick={handleDownVote}>Down Vote</button>
      <button onClick={handleRemoveVideo}>Remove</button>
    </div>
  );
};

export default Video;
