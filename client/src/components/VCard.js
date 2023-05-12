import React from "react";
import "./VCard.css";
const VCard = ({ data }) => {
  return (
    <div>
      {data.map((video, index) => (
        <div key={index} className="video-card">
          <h3>{video.title}</h3>
          <iframe
            src={video.url.replace("watch?v=", "embed/")}
            title={video.title}
          ></iframe>
          <p>Votes: {video.rating}</p>
          <button>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default VCard;
