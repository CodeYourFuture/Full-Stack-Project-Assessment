import React from "react";

const VideoCard = ({ data }) => {
    console.log(data);
  return (
    <div>
      <p>{data.id}</p>
      <p>{data.title}</p>
      <iframe
        width="560"
        height="315"
        src={data.url.replace("watch?v=", "embed/")}
        title="YouTube video player"
        allowFullScreen
      ></iframe>
      <p>{data.rating}</p>
    </div>
  );
};

export default VideoCard;
