import React, { useState } from "react";
import Rating from "./Rating";
import "./VCard.css";
const VCard = ({ data }) => {
  const [list, setList] = useState(data);

  const handleDelete = (id) => {
    setList(list.filter((video) => video.id !== id));
  };

  return (
    <div>
      {list.map((video) => (
        <div key={video.id} className="video-card">
          <h3>{video.title}</h3>
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
