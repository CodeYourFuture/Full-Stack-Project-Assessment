import React from "react";

import Rating from "./Rating";

import Button from "./Button";

const Video = ({ data, handleDelete }) => {
  return (
    <div>
      <h2>{data.title}</h2>
      <iframe
        title={data.title}
        width="420"
        height="315"
        src={data.url}
      ></iframe>
      <Rating rating={data.rating} />
      <Button name="Delete" method={() => handleDelete(data)} />
    </div>
  );
};

export default Video;
