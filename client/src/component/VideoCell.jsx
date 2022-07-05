import React from "react";

import DeleteButton from "./DeleteButton";
import Rating from "./Rating";

const VideoCell = ({
  id,
  title,
  url,
  rating,
  onDelete,
  onUpdate,
  dataLoaded,
}) => {
  return (
    <div key={id} className="video">
      <>
        <iframe
          width="100%"
          height="240"
          src={url.replace("watch?v=", "embed/")}
          title={title}
        ></iframe>

        <p>Title : {title}</p>

        <Rating rating={rating} videoId={id} updateRating={onUpdate} />
        <DeleteButton handleClick={() => onDelete(id)} />
      </>
    </div>
  );
};
export default VideoCell;
