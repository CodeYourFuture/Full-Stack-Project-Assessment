import React, { useState } from "react";
import Rating from "./Rating";
import "./VCard.css";
const VCard = ({ videoData }) => {
  const [list, setList] = useState(videoData);

  const handleDelete = (id) => {
    setList(list.filter((video) => video.id !== id));
  };

  return (
    <div>
      {list.map((video) => (
        <div key={video.id} className="video-card">
          <h3>{video.title}bb</h3>
          <iframe
            src={video.url.replace("watch?v=", "embed/")}
            title={video.title}
          ></iframe>

          <Rating rating={video.rating} />
          <button onClick={() => handleDelete(video.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default VCard;
