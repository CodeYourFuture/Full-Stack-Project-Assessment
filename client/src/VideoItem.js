import React from "react";

const VideoItem = ({ video, upVote,downVote,removeVideo }) => {

  return (
    <div>
      <h2>{video.title}</h2>
      <iframe
        width="600"
        height="300"
        src={video.url.replace("watch?v=", "embed/")}
        title="YouTube video player"
        allowFullScreen
      ></iframe>
      <h3>Video Rate: {video.rating}</h3>
      <div>
        <button onClick={() => upVote(video.id)} >Like</button>
        <button onClick={() => downVote(video.id)}>Dislike</button>
        <button onClick={() => removeVideo(video.id)}>Delete</button>
      </div>
    </div>
  );
};

export default VideoItem;