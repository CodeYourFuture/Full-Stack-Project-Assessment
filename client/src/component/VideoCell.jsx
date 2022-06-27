import React from "react";

import DeleteButton from "./DeleteButton";
import Rating from "./Rating";

const VideoCell = ({ id, title, url, rating, onDelete }) => {
  return (
    <div className="videos-Container">
      <div key={id} className="video">
        <div className="iframe_div">
          <iframe
            width="300"
            height="215"
            src={url.replace("watch?v=", "embed/")}
            title={title}
          ></iframe>
        </div>

        <div>
          <p>Title : {title}</p>
        </div>

        <Rating rating={rating} />
        <DeleteButton handleClick={() => onDelete(id)} />
      </div>
    </div>
  );
};
export default VideoCell;
